import { contact, whatsappLink } from '@/data/company';
import { quoteHref } from '@/data/navigation';
import { quoteTemplateMailto, whatsappQuoteMessage } from '@/lib/quote';
import { Icon } from './Icon';

/**
 * Contact CTAs, one order everywhere: WhatsApp (primary), e-mail (secondary),
 * phone (tertiary, primary number first). Each returns `null` while its channel
 * is unpublished, so no broken or placeholder action ever renders. Every
 * control carries `data-cta`/`data-cta-place` for `CtaTracker`.
 */

type Base = { place: string; className?: string; small?: boolean };

/**
 * @description Primary CTA: WhatsApp with a prefilled quote template.
 * @param label Button text.
 * @param message Prefilled message.
 */
export function WhatsAppCta({
  place,
  label = 'Solicitar tarifa por WhatsApp',
  message = whatsappQuoteMessage,
  className = '',
  small = false,
}: Base & { label?: string; message?: string }) {
  const href = whatsappLink(message);
  if (!href) return null;
  return (
    <a
      id={`cta-whatsapp-${place}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cta="whatsapp"
      data-cta-place={place}
      className={`btn btn-whatsapp ${small ? 'btn-sm' : ''} ${className}`}
    >
      <Icon name="whatsapp" className="h-[1.125rem] w-[1.125rem]" />
      {label}
      <span className="sr-only"> (se abre en una ventana nueva)</span>
    </a>
  );
}

/**
 * @description Secondary CTA: mail client with the tariff template.
 * @param label Button text.
 */
export function EmailCta({ place, label = 'Solicitar tarifa por correo', className = '', small = false }: Base & { label?: string }) {
  if (!contact.email) return null;
  return (
    <a
      id={`cta-correo-${place}`}
      href={quoteTemplateMailto(contact.email)}
      data-cta="correo"
      data-cta-place={place}
      className={`btn btn-outline ${small ? 'btn-sm' : ''} ${className}`}
    >
      <Icon name="mail" className="h-[1.125rem] w-[1.125rem]" />
      {label}
    </a>
  );
}

/**
 * @description Tertiary CTA: plain link to the primary phone.
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
 * @description Jumps to the quote form (or the contact list without a form).
 * @param label Button text.
 */
export function QuoteButton({ place, label = 'Cotizar mi flete', className = '', small = false }: Base & { label?: string }) {
  if (!quoteHref) return null;
  return (
    <a
      id={`cta-cotizar-${place}`}
      href={quoteHref}
      data-cta="cotizar"
      data-cta-place={place}
      className={`btn btn-primary ${small ? 'btn-sm' : ''} ${className}`}
    >
      {label}
    </a>
  );
}

/**
 * @description WhatsApp, e-mail, then phone, stacked on phones.
 * @param whatsappMessage Equipment-specific WhatsApp template.
 */
export function CtaGroup({ place, whatsappMessage, className = '' }: Base & { whatsappMessage?: string }) {
  if (!contact.whatsapp && !contact.email && !contact.phone) return null;
  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center ${className}`}>
      <WhatsAppCta place={place} message={whatsappMessage} />
      <EmailCta place={place} />
      <PhoneLink place={place} prefix="o llama al" className="justify-center text-[var(--fg-strong)] sm:justify-start" />
    </div>
  );
}

/**
 * @description Full contact list in fixed order: primary phone, secondary
 * phone, WhatsApp, e-mail.
 */
export function ContactList({ place, className = '' }: Base) {
  const wa = whatsappLink(whatsappQuoteMessage);
  const rows = [
    contact.phone && { key: 'telefono', title: 'Teléfono', href: `tel:${contact.phone.tel}`, text: contact.phone.display, icon: 'phone' as const },
    contact.phoneSecondary && {
      key: 'telefono-alterno',
      title: 'Teléfono alterno',
      href: `tel:${contact.phoneSecondary.tel}`,
      text: contact.phoneSecondary.display,
      icon: 'phone' as const,
    },
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
              className="inline-flex min-h-8 items-center gap-2 font-semibold break-all text-[var(--fg-strong)]"
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
