'use client';

import { useId, useRef, useState } from 'react';
import { contact, whatsappLink } from '@/data/company';
import {
  emptyQuote,
  operacionOptions,
  quoteMailto,
  quoteTemplateMailto,
  requiredFields,
  unidadOptions,
  validateQuote,
  whatsappQuoteMessage,
  type QuoteErrors,
  type QuoteFields,
} from '@/lib/quote';
import { Icon } from '@/components/ui/Icon';

type FieldKey = keyof QuoteFields;
const REQUIRED = new Set<FieldKey>(requiredFields);

const INPUTS: readonly { name: FieldKey; label: string; type?: 'tel' | 'email' | 'date'; placeholder?: string; autoComplete?: string; wide?: boolean }[] = [
  { name: 'nombre', label: 'Nombre', autoComplete: 'name', placeholder: 'Nombre y apellido' },
  { name: 'telefono', label: 'Teléfono', type: 'tel', autoComplete: 'tel', placeholder: '10 dígitos' },
  { name: 'empresa', label: 'Empresa', autoComplete: 'organization' },
  { name: 'email', label: 'Correo', type: 'email', autoComplete: 'email' },
  { name: 'origen', label: 'Origen', placeholder: 'Ciudad y estado' },
  { name: 'destino', label: 'Destino', placeholder: 'Ciudad y estado' },
  { name: 'carga', label: 'Tipo de carga', placeholder: 'Ej. lámina de acero, producto paletizado', wide: true },
  { name: 'peso', label: 'Peso aproximado', placeholder: 'Ej. 20 toneladas' },
  { name: 'dimensiones', label: 'Dimensiones', placeholder: 'Largo × ancho × alto' },
  { name: 'fecha', label: 'Fecha de carga', type: 'date' },
];

const SELECTS = [
  { name: 'unidad', label: 'Tipo de unidad', options: unidadOptions },
  { name: 'operacion', label: 'Operación', options: operacionOptions },
] as const;

/**
 * @description Quote request form. Validates in the browser, then opens the
 * visitor's mail client with the request addressed to the published mailbox.
 * Nothing is stored; the page never claims the message was sent. To move to a
 * Cloudflare Function later, replace only `onSubmit`.
 *
 * Accessibility: native labels, `aria-required`/`aria-invalid`/
 * `aria-describedby` per field, and an error summary that receives focus and
 * links to each field.
 */
export function QuoteForm() {
  const [fields, setFields] = useState<QuoteFields>(emptyQuote);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [opened, setOpened] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const uid = useId();
  const id = (name: string) => `cotizar-${name}-${uid.replace(/:/g, '')}`;

  const email = contact.email;
  const whatsapp = whatsappLink(whatsappQuoteMessage);
  if (!email) return null;

  function update(name: FieldKey, value: string) {
    const next = { ...fields, [name]: value };
    setFields(next);
    setOpened(false);
    if (submitted) setErrors(validateQuote(next));
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validateQuote(fields);
    setErrors(found);
    setSubmitted(true);
    if (Object.keys(found).length > 0) {
      // After React commits the summary; rAF would stall in background tabs.
      setTimeout(() => summaryRef.current?.focus(), 0);
      return;
    }
    window.location.href = quoteMailto(email!, fields);
    setOpened(true);
  }

  const errorKeys = Object.keys(errors) as FieldKey[];

  return (
    <form id="formulario-cotizacion" onSubmit={onSubmit} noValidate aria-describedby="cotizar-nota">
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
        {INPUTS.map((f) => {
          const error = errors[f.name];
          const required = REQUIRED.has(f.name);
          return (
            <div key={f.name} className={f.wide ? 'sm:col-span-2' : undefined}>
              <label htmlFor={id(f.name)} className="field-label">
                {f.label}
                {required ? <span className="text-copper-deep"> *</span> : <span className="font-normal text-gray-dark"> (opcional)</span>}
              </label>
              <input
                id={id(f.name)}
                name={f.name}
                type={f.type ?? 'text'}
                value={fields[f.name]}
                onChange={(e) => update(f.name, e.target.value)}
                placeholder={f.placeholder}
                autoComplete={f.autoComplete}
                required={required}
                aria-required={required || undefined}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${id(f.name)}-error` : undefined}
                className="field-input"
              />
              {error ? (
                <p id={`${id(f.name)}-error`} className="field-error">
                  {error}
                </p>
              ) : null}
            </div>
          );
        })}

        {SELECTS.map((s) => (
          <div key={s.name}>
            <label htmlFor={id(s.name)} className="field-label">
              {s.label} <span className="font-normal text-gray-dark">(opcional)</span>
            </label>
            <select id={id(s.name)} name={s.name} value={fields[s.name]} onChange={(e) => update(s.name, e.target.value)} className="field-input">
              {s.options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        ))}

        <div className="sm:col-span-2">
          <label htmlFor={id('detalles')} className="field-label">
            Detalles <span className="font-normal text-gray-dark">(opcional)</span>
          </label>
          <textarea
            id={id('detalles')}
            name="detalles"
            rows={4}
            value={fields.detalles}
            onChange={(e) => update('detalles', e.target.value)}
            placeholder="Maniobra de carga, horarios, frecuencia o cualquier dato que debamos considerar."
            className="field-input"
          />
        </div>
      </div>

      <p id="cotizar-nota" className="mt-5 text-xs text-gray-dark">
        <span className="text-copper-deep">*</span> Datos necesarios para cotizar. Al enviar, se abre tu programa de correo con la solicitud lista.
      </p>

      <button id="enviar-cotizacion" type="submit" data-cta="formulario" data-cta-place="contacto" className="btn btn-primary mt-6 w-full">
        <Icon name="mail" className="h-[1.125rem] w-[1.125rem]" />
        Solicitar cotización
      </button>

      <div className="mt-5 space-y-2 text-sm text-gray-dark">
        {whatsapp ? (
          <p>
            ¿Prefieres respuesta inmediata?{' '}
            <a id="formulario-whatsapp" href={whatsapp} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-cta-place="formulario" className="text-link">
              Escríbenos por WhatsApp
            </a>
          </p>
        ) : null}
        <p>
          ¿Quieres enviar especificaciones?{' '}
          <a id="formulario-correo" href={quoteTemplateMailto(email)} data-cta="correo" data-cta-place="formulario" className="text-link">
            Envíalas por correo
          </a>
        </p>
      </div>

      <div aria-live="polite" className="mt-4">
        {opened ? (
          <p className="flex gap-2.5 border-l-4 border-teal bg-paper p-4 text-sm">
            <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0" />
            <span>
              Abrimos tu programa de correo con la solicitud. Envíala desde ahí para que la recibamos. Si no se abrió, escríbenos a{' '}
              <a href={`mailto:${email}`} className="text-link">
                {email}
              </a>
              .
            </span>
          </p>
        ) : null}
      </div>
    </form>
  );
}
