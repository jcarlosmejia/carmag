/**
 * @description Single source of truth for CARMAG TRANSPORTS business facts.
 *
 * FACTUAL INTEGRITY CONTRACT
 * --------------------------
 * Every fact the site states lives here. A fact the owner has not confirmed is
 * either `null` or wrapped in `pending(value, false)`; `publish()` returns
 * `null` for it and every consumer hides the related UI. Nothing is ever
 * rendered as a placeholder, a guess or "próximamente".
 *
 * Source of every value: owner Phase 0 answers, 2026-10-19.
 *
 * REVIEW BUILDS
 * -------------
 * `NEXT_PUBLIC_CARMAG_REVIEW=1 npm run build` publishes the *candidate* values below so the
 * owner can review the complete layout (contact buttons, form). A review build
 * carries `noindex` on every page and a visible banner, and must never be the
 * production deploy. Production builds (Workers Builds) never set it.
 */

export const isReviewBuild = process.env.NEXT_PUBLIC_CARMAG_REVIEW === '1';

type Pending<T> = { readonly value: T; readonly confirmed: boolean };

/** Wraps a candidate value with its confirmation state. */
function pending<T>(value: T, confirmed: boolean): Pending<T> {
  return { value, confirmed };
}

/**
 * @description Returns a candidate value only when it may be shown.
 * @param field The candidate and its confirmation flag.
 * @returns The value when confirmed (or in a review build), otherwise `null`.
 */
function publish<T>(field: Pending<T>): T | null {
  return field.confirmed || isReviewBuild ? field.value : null;
}

export type VerificationItem = {
  /** Stable id, cross-referenced in docs/content-verification.md. */
  id: string;
  /** What has to be confirmed, in the owner's language. */
  question: string;
  /** Why the site cannot state it today. */
  reason: string;
  /** What the site shows in the meantime. */
  currentBehaviour: string;
  impact: 'blocks-launch' | 'limits-messaging' | 'nice-to-have';
};

export const company = {
  /** Confirmed public brand, exact uppercase casing. */
  name: 'CARMAG TRANSPORTS',
  /** Search variants for schema `alternateName` only — never shown as copy. */
  alternateNames: ['CARMAG', 'Carmag Transports', 'Carmag Transportes'],
  domain: 'carmag.com.mx',
  baseCity: 'Guadalajara',
  baseState: 'Jalisco',
  baseArea: 'Zona Metropolitana de Guadalajara',
  /** Not confirmed. Never use the brand as a stand-in for the razón social. */
  legalName: null as string | null,
  /** Not confirmed. City-level location is used instead. */
  streetAddress: null as string | null,
  /** Not confirmed. No hours and no 24/7 promise are published. */
  hours: null as string | null,
  /** Not confirmed for this identity (2010 belongs to earlier materials). */
  foundedYear: null as number | null,
  /** Owner: describe generically, no count until the fleet is validated. */
  fleetSize: null as number | null,
  tagline: 'Transporte de carga y fletes desde Guadalajara',
  valueProposition:
    'Transporte de carga y fletes desde Guadalajara para empresas: caja seca de 53 pies y plataforma de 40 pies, servicio spot, recurrente y dedicado.',
} as const;

/**
 * Contact candidates from the CARMAG business card. All unconfirmed for public
 * use (owner, 2026-10-19), so all hidden in production. Flip `confirmed` to
 * `true` per channel once the owner authorizes it; nothing else changes.
 */
const contactCandidates = {
  /** `tel:` form and display form. */
  phone: pending({ tel: '+523343995054', display: '+52 33 4399 5054' }, false),
  phoneSecondary: pending({ tel: '+523310131863', display: '+52 33 1013 1863' }, false),
  /** E.164 digits, no `+`. */
  whatsapp: pending({ digits: '523310131863', display: '+52 33 1013 1863' }, false),
  /** Temporary until contacto@carmag.com.mx exists. */
  email: pending('contacto.carmag@gmail.com', false),
};

export const contact = {
  phone: publish(contactCandidates.phone),
  phoneSecondary: publish(contactCandidates.phoneSecondary),
  whatsapp: publish(contactCandidates.whatsapp),
  email: publish(contactCandidates.email),
} as const;

/**
 * Privacy notice responsible party (LFPDPPP). The page is generated only when
 * every field is confirmed; a partial legal disclosure is never published.
 */
export const privacyResponsible = {
  legalName: company.legalName,
  /** Domicilio for notices under the LFPDPPP. */
  address: null as string | null,
  /** Mailbox for ARCO requests. */
  email: contact.email,
};

export const privacyNoticeReady = Boolean(
  privacyResponsible.legalName && privacyResponsible.address && privacyResponsible.email,
);

/**
 * The quote form collects personal data, so in production it needs both a
 * destination mailbox and a published privacy notice. Review builds show it
 * with the mailbox alone so the layout can be checked.
 */
export const quoteFormEnabled = Boolean(contact.email) && (privacyNoticeReady || isReviewBuild);

/** Social profiles: none verified, none shown. */
export const socialProfiles: readonly { name: string; url: string }[] = [];

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://carmag.com.mx').replace(/\/$/, '');

/**
 * @description Builds a `wa.me` deep link with a prefilled message.
 * @param message Plain-text message; encoded here.
 * @returns The link, or `null` while no WhatsApp number is published.
 */
export function whatsappLink(message: string): string | null {
  if (!contact.whatsapp) return null;
  return `https://wa.me/${contact.whatsapp.digits}?text=${encodeURIComponent(message)}`;
}

/**
 * Facts still awaiting owner confirmation, ordered by impact.
 * `npm run docs` generates docs/content-verification.md from this list.
 */
export const pendingVerification: readonly VerificationItem[] = [
  {
    id: 'contact-authorization',
    question:
      '¿Qué teléfono es el principal, cuál el secundario y cuál tiene WhatsApp, y está autorizado publicar cada uno en el sitio?',
    reason:
      'Los números de la tarjeta de presentación no están confirmados para uso público. Además, son los mismos que publica el sitio de Romo\'s Transportes: hay que confirmar que deben aparecer también en CARMAG TRANSPORTS.',
    currentBehaviour:
      'No se muestra ningún teléfono ni botón de WhatsApp. Al confirmar, se activan en encabezado, menú móvil, contacto, pie de página, botón flotante y datos estructurados, siempre en el mismo orden.',
    impact: 'blocks-launch',
  },
  {
    id: 'email-mailbox',
    question:
      '¿El buzón contacto.carmag@gmail.com es de la empresa, quién lo atiende y con qué frecuencia? ¿Cuándo estará contacto@carmag.com.mx?',
    reason:
      'El correo es el destino del formulario de cotización. Publicar un buzón que nadie revisa pierde solicitudes.',
    currentBehaviour:
      'No se muestra correo y el formulario de cotización está oculto. El cambio a contacto@carmag.com.mx es un solo valor en src/data/company.ts.',
    impact: 'blocks-launch',
  },
  {
    id: 'legal-identity',
    question:
      '¿Cuál es la razón social registrada y el domicilio del responsable del tratamiento de datos personales?',
    reason:
      'El aviso de privacidad (LFPDPPP) debe identificar al responsable con su nombre legal y domicilio. La marca comercial no sustituye la razón social.',
    currentBehaviour:
      'No se genera la página de aviso de privacidad ni su enlace, y el formulario permanece oculto en producción.',
    impact: 'blocks-launch',
  },
  {
    id: 'logo-palette',
    question:
      'La tarjeta usa el logotipo en verde petróleo (#123C3D) y cobre (#C8794B), pero la paleta indicada es azul marino (#071B2E), rojo (#D71920) y gris (#697580). ¿Cuál es la oficial?',
    reason:
      'No se debe recolorear ni rediseñar el logotipo sin aprobación, y las dos referencias no coinciden.',
    currentBehaviour:
      'El sitio usa la paleta azul marino / rojo / gris. El logotipo conserva la geometría exacta de la tarjeta, en un solo color (blanco sobre fondo oscuro, azul marino sobre fondo claro). El texto del logotipo se trazó en Montserrat. Cambiar la paleta es editar los tokens en src/app/globals.css.',
    impact: 'limits-messaging',
  },
  {
    id: 'logo-master',
    question: '¿Existe el archivo maestro del logotipo (SVG con texto convertido a trazos)?',
    reason:
      'La tarjeta usa texto en vivo con la fuente Avenir Next; el sitio no puede depender de una fuente con licencia instalada en otra computadora.',
    currentBehaviour:
      'Se generan versiones trazadas del logotipo con Montserrat (npm run brand). Al recibir el maestro, se sustituyen en scripts/build-brand.mjs.',
    impact: 'limits-messaging',
  },
  {
    id: 'photos',
    question:
      '¿Puede enviar de 8 a 15 fotografías reales de unidades CARMAG (Freightliner Cascadia, caja seca 53\', plataforma 40\', maniobras de carga)?',
    reason:
      'Solo se publican fotos reales de la empresa. No se usan fotos de stock, imágenes generadas ni fotos de Romo\'s Transportes.',
    currentBehaviour:
      'Las secciones muestran fichas técnicas y diagramas de medidas en lugar de fotos; la galería no se muestra. Al agregar fotos en photos/ y correr npm run images, aparecen sin cambiar el diseño.',
    impact: 'limits-messaging',
  },
  {
    id: 'equipment-48',
    question: '¿Hay cajas secas de 48 pies disponibles actualmente?',
    reason: 'Aparecieron en descripciones anteriores, pero no se confirmó disponibilidad ni propiedad.',
    currentBehaviour: 'Solo se publica la caja seca de 53 pies.',
    impact: 'nice-to-have',
  },
  {
    id: 'equipment-config',
    question:
      '¿Qué configuración vehicular y número de ejes tiene cada unidad, y qué capacidad de carga autorizada conforme a la NOM-012-SCT-2?',
    reason:
      'El máximo legal depende de la configuración y del tipo de camino. La capacidad nominal de 40,000 kg de la plataforma Ferbus no es una carga útil autorizada.',
    currentBehaviour:
      'No se publica ninguna cifra de peso. Se indica que la capacidad depende de la unidad, configuración, dimensiones, peso y ruta, y se confirma al cotizar.',
    impact: 'limits-messaging',
  },
  {
    id: 'cargo-security',
    question:
      '¿Cuándo estarán operando el GPS y el seguimiento para clientes? ¿Hay póliza de seguro de carga, capacitación de operadores o certificaciones documentadas?',
    reason: 'Ninguna de estas prácticas está verificada todavía.',
    currentBehaviour:
      'No existe sección de seguridad de la carga ni se menciona GPS, seguro o certificaciones. El seguimiento de embarques queda como integración futura, desactivada.',
    impact: 'limits-messaging',
  },
  {
    id: 'experience-history',
    question:
      '¿Se puede documentar la continuidad entre la operación previa (desde 2010) y CARMAG TRANSPORTS?',
    reason:
      'El año 2010 aparece en materiales anteriores con otra identidad comercial; no es el año de fundación de CARMAG.',
    currentBehaviour: 'No se publica año de fundación ni años de experiencia.',
    impact: 'nice-to-have',
  },
  {
    id: 'routes-frequency',
    question:
      '¿Cuáles de los destinos por corredor son frecuentes, con qué tiempos de tránsito típicos y qué carga suele moverse?',
    reason:
      'Los destinos son cobertura sujeta a disponibilidad, no salidas programadas. Las páginas por ruta necesitan datos reales para no ser contenido vacío.',
    currentBehaviour:
      'Mapa y lista presentan "corredores de servicio" sujetos a disponibilidad. No hay páginas por ruta.',
    impact: 'nice-to-have',
  },
  {
    id: 'address-hours',
    question: '¿Desea publicar un domicilio de operaciones y un horario de atención?',
    reason: 'Sin domicilio no se usa LocalBusiness y el perfil de Google sería de área de servicio.',
    currentBehaviour: 'Solo se publica Guadalajara, Jalisco, como ubicación. Sin horario.',
    impact: 'nice-to-have',
  },
  {
    id: 'social-profiles',
    question: '¿Ya existen Perfil de Empresa en Google, página de Facebook o LinkedIn oficiales?',
    reason: 'No se enlazan perfiles que no existen.',
    currentBehaviour: 'No hay enlaces a redes ni `sameAs` en los datos estructurados.',
    impact: 'nice-to-have',
  },
  {
    id: 'analytics',
    question: '¿Confirma Cloudflare Web Analytics (sin cookies) como única medición?',
    reason: 'Es la propuesta; el aviso de privacidad debe describir exactamente lo que se mide.',
    currentBehaviour:
      'El sitio no carga ningún script de terceros. Los botones emiten el evento `carmag:cta` y `cta_click` a Cloudflare Zaraz solo si se activa.',
    impact: 'nice-to-have',
  },
];
