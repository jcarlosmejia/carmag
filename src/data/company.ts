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
    'Transporte de carga y fletes desde Guadalajara para empresas: caja seca de 53 pies y planas de 40 pies en adelante, servicio spot, recurrente y dedicado.',
} as const;

/**
 * Contact channels from the CARMAG business card. Owner authorized public use
 * on 2026-10-20: the calls line, the WhatsApp line and the card's Gmail
 * mailbox. Calls and WhatsApp are different numbers on purpose; the UI labels
 * each by its function. The WhatsApp line is not repeated as a second calls
 * number, so visitors never have to guess which one to use. Set `confirmed`
 * to `false` to withdraw a channel; every placement and the JSON-LD follow.
 */
const contactCandidates = {
  /** `tel:` form and display form. */
  phone: pending({ tel: '+523343995054', display: '+52 33 4399 5054' }, true),
  /** E.164 digits, no `+`. */
  whatsapp: pending({ digits: '523310131863', display: '+52 33 1013 1863' }, true),
  /** Temporary until contacto@carmag.com.mx exists. */
  email: pending('contacto.carmag@gmail.com', true),
};

export const contact = {
  phone: publish(contactCandidates.phone),
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
    id: 'email-domain',
    question: '¿Cuándo estará disponible contacto@carmag.com.mx?',
    reason: 'Un buzón con el dominio propio da más confianza a compradores B2B que una cuenta de Gmail.',
    currentBehaviour:
      'Se publica contacto.carmag@gmail.com (autorizado). El cambio es un solo valor en src/data/company.ts; los registros MX deben conservarse al migrar el DNS.',
    impact: 'nice-to-have',
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
      '¿Puede enviar fotografías originales en alta resolución, idealmente con unidades rotuladas CARMAG (Freightliner Cascadia, caja seca 53\', planas de 40\' en adelante, maniobras de carga)?',
    reason:
      'Las fotos actuales son de la empresa (autorizadas el 2026-10-20), pero vienen de capturas de WhatsApp de unos 1,000 px y no muestran unidades rotuladas CARMAG. Fotos originales en alta resolución mejoran el hero en pantallas grandes.',
    currentBehaviour:
      'Se publican 7 fotos; toda marca, emblema, rótulo de identificación y placa de la identidad anterior está fuera de cuadro o difuminada (scripts/photos.config.mjs). Al agregar fotos en photos/ y correr npm run images, se sustituyen sin cambiar el diseño.',
    impact: 'limits-messaging',
  },
  {
    id: 'photo-two-tractors',
    question:
      'La foto de los dos tractocamiones (WhatsApp 2026-10-17 15.39.11) muestra en la puerta del tractocamión morado el emblema de la identidad anterior y el número de unidad «003». ¿Puede enviar una versión sin ese emblema u otra toma de los dos tractocamiones?',
    reason:
      'Recortar el emblema deja un solo tractocamión y se pierde el sujeto de la foto. No se publica una imagen con referencias a la identidad anterior ni se cubre con logotipos.',
    currentBehaviour: 'La foto está copiada en photos/ sin publicar. La sección de operación usa las demás fotos.',
    impact: 'nice-to-have',
  },
  {
    id: 'trust-evidence',
    question:
      '¿Qué evidencia comercial verificable puede publicarse: testimonios autorizados por escrito (nombre, empresa y permiso), años de operación documentados, número de unidades activas, horario de atención y fotos de unidades rotuladas CARMAG?',
    reason:
      'La sección de diferenciadores solo muestra hechos que el sitio ya respalda. No se inventan clientes, certificaciones, seguros, rastreo, tiempos de respuesta ni garantías.',
    currentBehaviour: 'Se muestran fotos de operación y cuatro diferenciadores verificables; sin testimonios ni cifras de desempeño.',
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
