import { contact, whatsappLink } from '@/data/company';
import { hasContactSection } from '@/data/navigation';
import { quoteHrefFor, quoteTemplate, quoteTemplateMailto, type UnitKey } from '@/lib/quote';
import { Icon } from './Icon';

/**
 * Contact CTAs, one hierarchy everywhere:
 *   1. "Solicitar cotización" — copper button to the form (#cotizar).
 *   2. WhatsApp directo — outlined button, the alternative.
 *   3. Llamadas — plain link, the additional option.
 * Each returns `null` while its channel is unpublished. Every control carries
 * `data-cta`/`data-cta-place` for `CtaTracker` (names only, never data).
 */

type Base = { place: string; className?: string; small?: boolean };

/**
 * @description Main CTA: the quote form, with the unit preselected when known.
 * @param unit Unit to preselect (equipment pages).
 * @param variant `primary` (copper) or `dark` (teal).
 */
export function QuoteButton({
  place,
  unit,
  label = 'Solicitar cotización',
  variant = 'primary',
  className = '',
  small = false,
}: Base & { unit?: UnitKey; label?: string; variant?: 'primary' | 'dark' }) {
  if (!hasContactSection) return null;
  return (
    <a
      id={`cta-cotizar-${place}`}
      href={quoteHrefFor(unit)}
      data-cta="cotizar"
      data-cta-place={place}
      className={`btn btn-${variant} ${small ? 'btn-sm' : ''} ${className}`}
    >
      <Icon name="quote" className="h-[1.125rem] w-[1.125rem]" />
      {label}
    </a>
  );
}

/**
 * @description Direct WhatsApp with the shared quote template.
 * @param unit Unit to keep in the template.
 * @param solid Filled green (mobile menu); default is outlined, so it never
 *   outweighs "Solicitar cotización".
 */
export function WhatsAppCta({
  place,
  unit,
  label = 'Hablar por WhatsApp',
  solid = false,
  className = '',
  small = false,
}: Base & { unit?: UnitKey; label?: string; solid?: boolean }) {
  const href = whatsappLink(quoteTemplate(unit));
  if (!href) return null;
  return (
    <a
      id={`cta-whatsapp-${place}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cta="whatsapp"
      data-cta-place={place}
      className={`btn ${solid ? 'btn-whatsapp' : 'btn-outline'} ${small ? 'btn-sm' : ''} ${className}`}
    >
      <Icon name="whatsapp" className={`h-[1.125rem] w-[1.125rem] ${solid ? '' : 'text-whatsapp'}`} />
      {label}
      <span className="sr-only"> (se abre en una ventana nueva)</span>
    </a>
  );
}

/**
 * @description Additional option: plain link to the calls line.
 * @param prefix Visible text before the number, e.g. "o llama al".
 */
export function PhoneLink({ place, prefix, className = '' }: Base & { prefix?: string }) {
  if (!contact.phone) return null;
  return (
    <a
      id={`cta-telefono-${place}`}
      href={`tel:${contact.phone.tel}`}
      data-cta="telefono"
      data-cta-place={place}
      className={`inline-flex min-h-11 items-center gap-2 whitespace-nowrap font-semibold ${className}`}
    >
      <Icon name="phone" className="h-[1.125rem] w-[1.125rem] text-[var(--accent)]" />
      {prefix ? `${prefix} ` : ''}
      {contact.phone.display}
    </a>
  );
}

/**
 * @description The three options in order of weight, stacked on phones.
 * @param unit Unit for the quote link and the WhatsApp template.
 */
export function CtaGroup({ place, unit, className = '' }: Base & { unit?: UnitKey }) {
  if (!hasContactSection) return null;
  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center ${className}`}>
      <QuoteButton place={place} unit={unit} />
      <WhatsAppCta place={place} unit={unit} />
      <PhoneLink place={place} prefix="o llama al" className="justify-center text-[var(--fg-strong)] sm:justify-start" />
    </div>
  );
}

/**
 * @description Contact list, each line labelled with its function:
 * Llamadas, WhatsApp, Correo.
 */
export function ContactList({ place, className = '' }: Base) {
  const wa = whatsappLink(quoteTemplate());
  const rows = [
    contact.phone && { key: 'telefono', title: 'Llamadas', href: `tel:${contact.phone.tel}`, text: contact.phone.display, icon: 'phone' as const },
    wa && contact.whatsapp && { key: 'whatsapp', title: 'WhatsApp', href: wa, text: contact.whatsapp.display, icon: 'whatsapp' as const, external: true },
    contact.email && { key: 'correo', title: 'Correo', href: quoteTemplateMailto(contact.email), text: contact.email, icon: 'mail' as const },
  ].filter((row) => !!row);

  if (rows.length === 0) return null;
  return (
    <dl className={`space-y-4 ${className}`}>
      {rows.map((row) => (
        <div key={row.key}>
          <dt className="label-tech">{row.title}</dt>
          <dd>
            <a
              id={`contacto-${row.key}-${place}`}
              href={row.href}
              data-cta={row.key}
              data-cta-place={place}
              {...('external' in row ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="inline-flex min-h-8 items-center gap-2 font-semibold break-words text-[var(--fg-strong)]"
            >
              <Icon name={row.icon} className="h-4 w-4 shrink-0 text-[var(--accent)]" />
              {row.text}
            </a>
          </dd>
        </div>
      ))}
    </dl>
  );
}
