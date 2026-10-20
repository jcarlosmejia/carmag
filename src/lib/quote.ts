/**
 * @description Quote request: fields, validation and message formatting.
 *
 * No backend. The form builds a WhatsApp message and opens WhatsApp; the
 * visitor sends it. Nothing is stored, put in the URL or sent to analytics.
 * The only value allowed in a URL is the unit preselection (`?unidad=`).
 *
 * Pure module with no imports, so `node --test` can load it directly.
 */

export const UNIT_OPTIONS = [
  { value: 'caja-seca-53', label: 'Caja seca de 53 pies' },
  { value: 'planas-40', label: 'Planas de 40 pies en adelante' },
  { value: 'orientacion', label: 'Necesito orientación' },
] as const;

export type UnitKey = (typeof UNIT_OPTIONS)[number]['value'];

const unitLabel = (unit: UnitKey | '') => UNIT_OPTIONS.find((o) => o.value === unit)?.label ?? '';

export type QuoteFields = {
  origen: string;
  destino: string;
  mercancia: string;
  unidad: UnitKey | '';
  fecha: string;
  peso: string;
  largo: string;
  ancho: string;
  alto: string;
  observaciones: string;
};

export const emptyQuote: QuoteFields = {
  origen: '',
  destino: '',
  mercancia: '',
  unidad: '',
  fecha: '',
  peso: '',
  largo: '',
  ancho: '',
  alto: '',
  observaciones: '',
};

export const requiredFields = ['origen', 'destino', 'mercancia'] as const;

export type QuoteErrors = Partial<Record<keyof QuoteFields, string>>;

/**
 * Kilograms: "18,000" and "18 000" are thousands separators (Mexican usage).
 * Metres: "2,4" is a decimal comma.
 */
const normalize = (key: keyof QuoteFields, value: string) =>
  key === 'peso' ? value.trim().replace(/[,\s]/g, '') : value.trim().replace(',', '.');

/** Returns NaN for anything that is not a plain positive decimal. */
function toNumber(value: string): number {
  return /^\d+(\.\d+)?$/.test(value) ? Number(value) : Number.NaN;
}

const NUMERIC: readonly [keyof QuoteFields, string][] = [
  ['peso', 'Escribe el peso en kilogramos, solo con números. Ej. 18000.'],
  ['largo', 'Escribe el largo en metros. Ej. 12.5'],
  ['ancho', 'Escribe el ancho en metros. Ej. 2.4'],
  ['alto', 'Escribe el alto en metros. Ej. 1.8'],
];

/**
 * @description Validates a quote request.
 * @param fields Current form values.
 * @returns Field name → Spanish error message; empty when valid.
 */
export function validateQuote(fields: QuoteFields): QuoteErrors {
  const errors: QuoteErrors = {};
  if (!fields.origen.trim()) errors.origen = 'Escribe la ciudad de origen.';
  if (!fields.destino.trim()) errors.destino = 'Escribe la ciudad de destino.';
  if (!fields.mercancia.trim()) errors.mercancia = 'Describe el tipo de mercancía.';
  for (const [key, message] of NUMERIC) {
    const value = fields[key].trim();
    if (value && !(toNumber(normalize(key, value)) > 0)) errors[key] = message;
  }
  return errors;
}

const INTRO = 'Hola, quiero cotizar un transporte con CARMAG TRANSPORTS.';

/** "2026-10-25" → "25/10/2026". */
const formatDate = (iso: string) => {
  const [y, m, d] = iso.split('-');
  return y && m && d ? `${d}/${m}/${y}` : iso;
};

/**
 * @description Formats a completed request; empty optional fields are left out.
 * @param fields Validated form values.
 * @returns Plain-text message (newlines kept; encode with `encodeURIComponent`).
 */
export function buildQuoteMessage(fields: QuoteFields): string {
  const dims = (['largo', 'ancho', 'alto'] as const)
    .filter((k) => fields[k].trim())
    .map((k) => `${k} ${normalize(k, fields[k])} m`);
  const rows: [string, string][] = [
    ['Origen', fields.origen.trim()],
    ['Destino', fields.destino.trim()],
    ['Mercancía', fields.mercancia.trim()],
    ['Unidad', unitLabel(fields.unidad)],
    ['Fecha estimada', fields.fecha ? formatDate(fields.fecha) : ''],
    ['Peso aproximado', fields.peso.trim() ? `${normalize('peso', fields.peso)} kg` : ''],
    ['Dimensiones', dims.join(' × ')],
    ['Observaciones', fields.observaciones.trim()],
  ];
  return [INTRO, '', ...rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`)].join('\n');
}

/**
 * @description Blank template used by every direct WhatsApp and e-mail link,
 * so all of them ask for the same data. Keeps the unit when one is known.
 * @param unit Unit to prefill.
 * @returns Plain-text template.
 */
export function quoteTemplate(unit?: UnitKey): string {
  return [
    INTRO,
    '',
    'Origen: ',
    'Destino: ',
    'Mercancía: ',
    `Unidad: ${unit ? unitLabel(unit) : ''}`,
    'Fecha estimada: ',
    'Peso aproximado (kg): ',
    'Dimensiones (largo × ancho × alto, en metros): ',
  ].join('\n');
}

/** Generic WhatsApp template (no unit). */
export const whatsappQuoteMessage = quoteTemplate();

export const quoteEmailSubject = 'Solicitud de cotización de transporte';

/**
 * @description `mailto:` with the shared template. `URLSearchParams` writes
 * spaces as "+", which mail clients show literally, so they become %20.
 * @param email Destination mailbox.
 * @param unit Unit to prefill.
 */
export function quoteTemplateMailto(email: string, unit?: UnitKey): string {
  const params = new URLSearchParams({ subject: quoteEmailSubject, body: quoteTemplate(unit) });
  return `mailto:${email}?${params.toString().replace(/\+/g, '%20')}`;
}

/**
 * @description Reads the unit preselection from a query string.
 * @param search `location.search`, e.g. "?unidad=planas-40".
 * @returns A known unit key, or '' for anything else.
 */
export function unitFromSearch(search: string): UnitKey | '' {
  const value = new URLSearchParams(search).get('unidad');
  return UNIT_OPTIONS.some((o) => o.value === value) ? (value as UnitKey) : '';
}

/**
 * @description Link to the quote form, optionally with the unit preselected.
 * Only the unit travels in the URL, never the captured data.
 */
export const quoteHrefFor = (unit?: UnitKey) => (unit ? `/?unidad=${unit}#cotizar` : '/#cotizar');

/**
 * @description Copies text for the "WhatsApp no abrió" fallback.
 * @param text Message to copy.
 * @param clipboard Clipboard API (injected so it can be tested).
 * @returns `true` when copied; `false` when the browser refused.
 */
export async function copyText(text: string, clipboard: Pick<Clipboard, 'writeText'> | undefined): Promise<boolean> {
  try {
    if (!clipboard) return false;
    await clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
