import { contact, quoteFormEnabled } from './company';

/** True when at least one contact channel is published. */
export const hasContactSection = Boolean(contact.phone || contact.whatsapp || contact.email);

/**
 * Shared by header, mobile drawer and footer. Root-relative hashes so the links
 * work from subpages. "Contacto" exists only while a channel is published.
 */
export const navItems = [
  { href: '/#inicio', label: 'Inicio' },
  { href: '/#servicios', label: 'Servicios' },
  { href: '/#equipo', label: 'Equipo' },
  { href: '/#cobertura', label: 'Cobertura' },
  { href: '/#nosotros', label: 'Nosotros' },
  ...(hasContactSection ? [{ href: '/#contacto', label: 'Contacto' }] : []),
] as const;

/** Target of every "Cotizar" button: the form when it exists, else the contact list. */
export const quoteHref = quoteFormEnabled ? '/#cotizar' : hasContactSection ? '/#contacto' : null;
