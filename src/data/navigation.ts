import { contact } from './company';

/** True when at least one contact channel is published. */
export const hasContactSection = Boolean(contact.phone || contact.whatsapp || contact.email);

/**
 * Shared by header, mobile drawer and footer. Root-relative hashes so the links
 * work from subpages. "Contacto" exists only while a channel is published.
 */
export const navItems = [
  { href: '/#inicio', label: 'Inicio' },
  { href: '/#equipo', label: 'Equipo' },
  { href: '/#servicios', label: 'Servicios' },
  { href: '/#cobertura', label: 'Cobertura' },
  { href: '/#nosotros', label: 'Nosotros' },
  ...(hasContactSection ? [{ href: '/#cotizar', label: 'Contacto' }] : []),
] as const;
