'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { contact, whatsappLink } from '@/data/company';
import {
  UNIT_OPTIONS,
  buildQuoteMessage,
  copyText,
  emptyQuote,
  requiredFields,
  unitFromSearch,
  validateQuote,
  type QuoteErrors,
  type QuoteFields,
} from '@/lib/quote';
import { Icon } from '@/components/ui/Icon';
import { trackCta } from '@/components/ui/CtaTracker';

type Key = keyof QuoteFields;
const REQUIRED = new Set<Key>(requiredFields);

type Field = { name: Key; label: string; placeholder?: string; type?: 'text' | 'date'; numeric?: boolean; hint?: string; suffix?: string };

const MAIN: readonly Field[] = [
  { name: 'origen', label: 'Origen', placeholder: 'Ciudad y estado' },
  { name: 'destino', label: 'Destino', placeholder: 'Ciudad y estado' },
  { name: 'mercancia', label: 'Tipo de mercancía', placeholder: 'Ej. lámina de acero, producto en tarimas' },
];
const DIMENSIONS: readonly Field[] = [
  { name: 'largo', label: 'Largo', numeric: true, suffix: 'm' },
  { name: 'ancho', label: 'Ancho', numeric: true, suffix: 'm' },
  { name: 'alto', label: 'Alto', numeric: true, suffix: 'm' },
];

/**
 * @description Quote form that prepares a WhatsApp message. No backend: it
 * validates, builds the text and opens WhatsApp; the visitor sends it. The
 * captured data is never stored, put in the URL or sent to analytics. Only the
 * unit can arrive preselected, from `?unidad=` (equipment pages).
 *
 * It never says "enviada": opening WhatsApp does not prove a message was sent.
 * After opening, the number and a copy button stay visible in case WhatsApp
 * did not open.
 */
export function QuoteForm() {
  const [fields, setFields] = useState<QuoteFields>(emptyQuote);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [prepared, setPrepared] = useState<string | null>(null);
  const [copy, setCopy] = useState<'idle' | 'ok' | 'fail'>('idle');
  const summaryRef = useRef<HTMLDivElement>(null);
  const preparedRef = useRef<HTMLTextAreaElement>(null);
  const uid = useId().replace(/:/g, '');
  const id = (name: string) => `cotizar-${name}-${uid}`;

  // Unit preselection from the equipment pages. Read once after hydration so
  // the server HTML and the first client render match.
  useEffect(() => {
    const unidad = unitFromSearch(window.location.search);
    if (unidad) setFields((f) => ({ ...f, unidad }));
  }, []);

  if (!contact.whatsapp) return null;
  const whatsapp = contact.whatsapp;

  function update(name: Key, value: string) {
    const next = { ...fields, [name]: value };
    setFields(next);
    setPrepared(null);
    if (submitted) setErrors(validateQuote(next));
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validateQuote(fields);
    setErrors(found);
    setSubmitted(true);
    if (Object.keys(found).length > 0) {
      // After React commits the summary.
      setTimeout(() => summaryRef.current?.focus(), 0);
      return;
    }
    const message = buildQuoteMessage(fields);
    const href = whatsappLink(message);
    if (href) window.open(href, '_blank', 'noopener,noreferrer');
    trackCta('whatsapp-formulario', 'cotizar');
    setPrepared(message);
    setCopy('idle');
  }

  async function onCopy() {
    if (!prepared) return;
    const ok = await copyText(prepared, navigator.clipboard);
    setCopy(ok ? 'ok' : 'fail');
    if (!ok) preparedRef.current?.select();
  }

  const errorKeys = Object.keys(errors) as Key[];

  const input = (f: Field) => {
    const error = errors[f.name];
    const required = REQUIRED.has(f.name);
    const describedBy = [error ? `${id(f.name)}-error` : null, f.hint ? `${id(f.name)}-hint` : null].filter(Boolean).join(' ') || undefined;
    return (
      <div key={f.name}>
        <label htmlFor={id(f.name)} className="field-label">
          {f.label}
          {f.suffix ? <span className="font-normal text-gray-dark"> ({f.suffix})</span> : null}
          {required ? <span className="text-copper-deep"> *</span> : null}
        </label>
        <input
          id={id(f.name)}
          name={f.name}
          type={f.type ?? 'text'}
          inputMode={f.numeric ? 'decimal' : undefined}
          value={fields[f.name]}
          onChange={(e) => update(f.name, e.target.value)}
          placeholder={f.placeholder}
          required={required}
          aria-required={required || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          autoComplete="off"
          className="field-input"
        />
        {f.hint ? (
          <p id={`${id(f.name)}-hint`} className="mt-1 text-xs text-gray-dark">
            {f.hint}
          </p>
        ) : null}
        {error ? (
          <p id={`${id(f.name)}-error`} className="field-error">
            {error}
          </p>
        ) : null}
      </div>
    );
  };

  return (
    <form id="formulario-cotizacion" onSubmit={onSubmit} noValidate aria-describedby="cotizar-explicacion">
      <div ref={summaryRef} tabIndex={-1} className={errorKeys.length ? 'mb-6 border-l-4 border-[var(--error)] bg-paper p-4' : 'sr-only'}>
        {errorKeys.length ? (
          <>
            <p role="alert" className="font-bold text-[var(--error)]">
              Revisa {errorKeys.length === 1 ? 'este dato' : `estos ${errorKeys.length} datos`}:
            </p>
            <ul className="mt-2 space-y-1 text-sm">
              {errorKeys.map((key) => (
                <li key={key}>
                  <a href={`#${id(key)}`} className="underline">
                    {errors[key]}
                  </a>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {input(MAIN[0]!)}
        {input(MAIN[1]!)}
        <div className="sm:col-span-2">{input(MAIN[2]!)}</div>

        <div>
          <label htmlFor={id('unidad')} className="field-label">
            Unidad
          </label>
          <select id={id('unidad')} name="unidad" value={fields.unidad} onChange={(e) => update('unidad', e.target.value)} className="field-input">
            <option value="">Sin elegir</option>
            {UNIT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        {input({ name: 'fecha', label: 'Fecha estimada', type: 'date' })}
        {input({ name: 'peso', label: 'Peso aproximado', suffix: 'kg', numeric: true, placeholder: 'Ej. 18000' })}
      </div>

      <fieldset className="mt-5" aria-describedby="cotizar-dimensiones-ayuda">
        <legend className="field-label">Dimensiones de la carga</legend>
        <p id="cotizar-dimensiones-ayuda" className="-mt-1 mb-2 text-xs text-gray-dark">
          En metros. Mide la carga, no la unidad: largo (frente a fondo), ancho (lado a lado) y alto (del piso a la parte más alta).
        </p>
        <div className="grid grid-cols-3 gap-3">{DIMENSIONS.map(input)}</div>
      </fieldset>

      <div className="mt-5">
        <label htmlFor={id('observaciones')} className="field-label">
          Observaciones
        </label>
        <textarea
          id={id('observaciones')}
          name="observaciones"
          rows={3}
          value={fields.observaciones}
          onChange={(e) => update('observaciones', e.target.value)}
          placeholder="Maniobra de carga, horarios, frecuencia o cualquier detalle que debamos considerar."
          className="field-input"
        />
      </div>

      <p className="mt-4 text-xs text-gray-dark">
        <span className="text-copper-deep">*</span> Obligatorio. Lo demás es opcional y ayuda a cotizar más rápido.
      </p>

      <button id="preparar-cotizacion" type="submit" className="btn btn-whatsapp mt-5 w-full">
        <Icon name="whatsapp" className="h-[1.125rem] w-[1.125rem]" />
        Preparar cotización por WhatsApp
      </button>
      <p id="cotizar-explicacion" className="mt-2 text-sm text-gray-dark">
        Abriremos WhatsApp con los datos que captures. Tú envías el mensaje.
      </p>

      <div aria-live="polite">
        {prepared ? (
          <div className="mt-5 border-l-4 border-teal bg-paper p-4 text-sm">
            <p className="font-bold">Preparamos tu mensaje en WhatsApp.</p>
            <p className="mt-1 text-gray-dark">
              Si WhatsApp no se abrió, escríbenos al{' '}
              <a href={whatsappLink(prepared) ?? undefined} target="_blank" rel="noopener noreferrer" className="text-link">
                WhatsApp {whatsapp.display}
              </a>{' '}
              y pega este mensaje:
            </p>
            <label htmlFor={id('mensaje')} className="sr-only">
              Mensaje preparado
            </label>
            <textarea ref={preparedRef} id={id('mensaje')} readOnly rows={7} value={prepared} className="field-input mt-3 text-sm" />
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <button id="copiar-mensaje" type="button" onClick={onCopy} className="btn btn-outline btn-sm">
                Copiar mensaje
              </button>
              <span role="status" className="text-sm text-gray-dark">
                {copy === 'ok' ? 'Mensaje copiado.' : copy === 'fail' ? 'No se pudo copiar automáticamente: el texto quedó seleccionado para copiarlo.' : ''}
              </span>
            </div>
          </div>
        ) : null}
      </div>
    </form>
  );
}
