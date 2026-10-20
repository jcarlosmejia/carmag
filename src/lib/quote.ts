/**
 * @description Quote request shape, validation and message formatting.
 *
 * No backend: the form validates in the browser and hands a formatted message
 * to the visitor's mail client via `mailto:`. Nothing is stored and no
 * third-party form service is used.
 */

export type QuoteFields = {
  nombre: string;
  empresa: string;
  telefono: string;
  email: string;
  origen: string;
  destino: string;
  carga: string;
  peso: string;
  dimensiones: string;
  fecha: string;
  unidad: string;
  operacion: string;
  detalles: string;
};

export const emptyQuote: QuoteFields = {
  nombre: '',
  empresa: '',
  telefono: '',
  email: '',
  origen: '',
  destino: '',
  carga: '',
  peso: '',
  dimensiones: '',
  fecha: '',
  unidad: '',
  operacion: '',
  detalles: '',
};

export const requiredFields = ['nombre', 'telefono', 'origen', 'destino', 'carga'] as const;

export type QuoteErrors = Partial<Record<keyof QuoteFields, string>>;

export const unidadOptions = [
  { value: '', label: 'Selecciona una opción' },
  { value: "Caja seca 53'", label: "Caja seca 53'" },
  { value: "Plataforma 40'", label: "Plataforma 40'" },
  { value: 'No estoy seguro', label: 'No estoy seguro' },
] as const;

export const operacionOptions = [
  { value: '', label: 'Selecciona una opción' },
  { value: 'Spot', label: 'Spot (viaje único)' },
  { value: 'Recurrente', label: 'Recurrente' },
  { value: 'Dedicado', label: 'Dedicado' },
] as const;

/** Catches typos, not an RFC 5322 parser. */
const EMAIL_RE = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

/**
 * @description Validates a quote request.
 * @param fields Current form values.
 * @returns Field name → Spanish error message; empty when valid.
 */
export function validateQuote(fields: QuoteFields): QuoteErrors {
  const errors: QuoteErrors = {};
  const digits = fields.telefono.replace(/\D/g, '').length;

  if (!fields.nombre.trim()) errors.nombre = 'Escribe tu nombre.';
  if (!fields.telefono.trim()) errors.telefono = 'Escribe un teléfono para darte respuesta.';
  else if (digits < 10 || digits > 15) errors.telefono = 'Escribe el teléfono a 10 dígitos (o con clave de país).';
  if (fields.email.trim() && !EMAIL_RE.test(fields.email.trim())) errors.email = 'Revisa el correo: parece incompleto.';
  if (!fields.origen.trim()) errors.origen = 'Escribe la ciudad de origen.';
  if (!fields.destino.trim()) errors.destino = 'Escribe la ciudad de destino.';
  if (!fields.carga.trim()) errors.carga = 'Describe el tipo de carga.';

  return errors;
}

const MESSAGE_ROWS: readonly [keyof QuoteFields, string][] = [
  ['nombre', 'Nombre'],
  ['empresa', 'Empresa'],
  ['telefono', 'Teléfono'],
  ['email', 'Correo'],
  ['origen', 'Origen'],
  ['destino', 'Destino'],
  ['carga', 'Tipo de carga'],
  ['peso', 'Peso aproximado'],
  ['dimensiones', 'Dimensiones'],
  ['fecha', 'Fecha de carga'],
  ['unidad', 'Tipo de unidad'],
  ['operacion', 'Operación'],
  ['detalles', 'Detalles'],
];

/**
 * @description Formats a quote request as plain text; empty fields are omitted.
 * @param fields Validated form values.
 * @returns The message body.
 */
export function buildQuoteMessage(fields: QuoteFields): string {
  const rows = MESSAGE_ROWS.flatMap(([key, label]) => {
    const value = fields[key].trim();
    return value ? [`${label}: ${value}`] : [];
  });
  return ['Hola, quiero solicitar una cotización de transporte con CARMAG TRANSPORTS.', '', ...rows].join('\n');
}

/** Prefilled text for every generic WhatsApp CTA. */
export const whatsappQuoteMessage = 'Hola, quiero solicitar una cotización de transporte.\nOrigen: \nDestino: \nTipo de carga: ';

export const quoteEmailSubject = 'Solicitud de tarifa de transporte';

const EMAIL_TEMPLATE = [
  'Hola, quiero solicitar una tarifa de transporte con CARMAG TRANSPORTS.',
  '',
  'Origen:',
  'Destino:',
  'Mercancía:',
  'Peso aproximado:',
  'Dimensiones:',
  'Fecha de carga:',
  "Tipo de unidad (caja seca 53' / plataforma 40'):",
].join('\n');

/** `URLSearchParams` encodes spaces as "+", which mail clients show literally. */
function mailto(email: string, body: string): string {
  const params = new URLSearchParams({ subject: quoteEmailSubject, body });
  return `mailto:${email}?${params.toString().replace(/\+/g, '%20')}`;
}

/**
 * @description `mailto:` with the blank tariff template.
 * @param email Destination mailbox.
 * @returns The `mailto:` URL.
 */
export const quoteTemplateMailto = (email: string) => mailto(email, EMAIL_TEMPLATE);

/**
 * @description `mailto:` carrying a completed quote request.
 * @param email Destination mailbox.
 * @param fields Validated form values.
 * @returns The `mailto:` URL.
 */
export const quoteMailto = (email: string, fields: QuoteFields) => mailto(email, buildQuoteMessage(fields));
