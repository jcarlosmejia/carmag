/**
 * CARMAG TRANSPORTS — photo specification for `npm run images`.
 *
 * ONLY COMPANY-OWNED PHOTOGRAPHS. No stock, no AI-generated equipment, no
 * other company's photos. Each entry needs owner approval for publication.
 * Any previous-brand mark, door emblem, identifier block, plate or third-party
 * signage must be cropped out (`region`) or blurred (`redact`); never paint a
 * CARMAG logo onto a unit.
 *
 * Drop the originals in `photos/` (not committed) and add one entry per crop:
 *
 *   {
 *     slug: 'carmag-caja-seca-53-cascadia-guadalajara',  // descriptive Spanish slug
 *     file: 'IMG_0001.jpg',                                 // file inside photos/
 *     slot: 'caja-seca',     // hero | hero-mobile | caja-seca | plataforma | operacion | gallery
 *     ratio: 3 / 2,          // crop aspect ratio (w/h)
 *     region: { left: 0, top: 0.05, width: 1, height: 0.9 }, // optional fractional crop
 *     alt: 'Tractocamión Freightliner Cascadia de CARMAG TRANSPORTS con caja seca de 53 pies…',
 *     caption: 'Caja seca de 53 pies',                       // optional
 *   }
 *
 * `hero` and `hero-mobile` must both be present for the hero to show a photo
 * (desktop crop ~16:10, mobile crop 4:3).
 */
// PENDING EDIT, not published: 'WhatsApp Image 2026-10-17 at 15.39.11.jpeg'
// (two tractors). The purple unit's door carries the previous-brand emblem
// and any crop that excludes it loses one of the two tractors.
const photos = [
  // Owner confirmed (2026-10-20) these photos are company-owned. Every
  // previous-brand mark is cropped out; small non-brand identifiers (door
  // lettering, plates) are blurred. Captions never name a unit.
  {
    slug: 'carmag-tractocamion-plataforma-carga-atardecer',
    file: 'Screenshot_20260916_200126_WhatsApp.jpg',
    slot: 'hero',
    ratio: 16 / 10,
    region: { left: 0, top: 0.03, width: 1, height: 0.92 },
    // Door lettering and front plate.
    redact: [
      { left: 0.552, top: 0.45, width: 0.055, height: 0.058 },
      { left: 0.762, top: 0.62, width: 0.03, height: 0.032 },
    ],
    alt: 'Tractocamión con plataforma cargada de material enfardado, listo para salir a carretera al atardecer.',
  },
  {
    slug: 'carmag-tractocamion-plataforma-carga-atardecer-movil',
    file: 'Screenshot_20260916_200126_WhatsApp.jpg',
    slot: 'hero-mobile',
    ratio: 4 / 3,
    region: { left: 0.18, top: 0, width: 0.82, height: 1 },
    redact: [
      { left: 0.552, top: 0.45, width: 0.055, height: 0.058 },
      { left: 0.762, top: 0.62, width: 0.03, height: 0.032 },
    ],
    alt: 'Tractocamión con plataforma cargada de material enfardado, listo para salir a carretera al atardecer.',
  },
  {
    // Owner photo 2026-10-17 15.09.25. No previous-brand mark in frame; the
    // sleeper lettering is illegible in the source. Alt text does not state a
    // trailer length: the photo alone cannot prove it.
    slug: 'carmag-tractocamion-caja-cerrada-patio',
    file: 'WhatsApp Image 2026-10-17 at 15.09.25.jpeg',
    slot: 'caja-seca',
    ratio: 3 / 2,
    region: { left: 0.15, top: 0, width: 0.85, height: 1 },
    alt: 'Tractocamión negro enganchado a una caja cerrada blanca, estacionado en un patio de tierra.',
  },
  {
    slug: 'carmag-plataforma-estructuras-acero',
    file: 'Screenshot_20260916_200220_WhatsApp.jpg',
    slot: 'plataforma',
    ratio: 3 / 2,
    // Excludes the phone-camera watermark in the lower-left corner.
    region: { left: 0.06, top: 0, width: 0.94, height: 0.8 },
    alt: 'Plataforma cargada con estructuras de acero de gran formato, aseguradas con bandas y cadenas.',
  },
  {
    slug: 'carmag-plataformas-carretera',
    file: 'Screenshot_20260916_200204_WhatsApp.jpg',
    slot: 'gallery',
    ratio: 3 / 2,
    region: { left: 0, top: 0, width: 1, height: 0.8 },
    alt: 'Dos tractocamiones con plataformas cargadas y cubiertas circulando por una carretera.',
    caption: 'Planas cargadas en carretera',
  },
  {
    slug: 'carmag-plataforma-material-reciclable',
    file: 'Screenshot_20260916_200308_WhatsApp.jpg',
    slot: 'gallery',
    ratio: 3 / 2,
    region: { left: 0, top: 0, width: 1, height: 0.86 },
    alt: 'Plataforma con carga de material metálico reciclable contenida con redilas y lonas.',
    caption: 'Material metálico contenido con redilas',
  },
  {
    slug: 'carmag-plataforma-varilla-nave-industrial',
    file: 'Screenshot_20260916_200146_WhatsApp.jpg',
    slot: 'gallery',
    ratio: 3 / 2,
    // Right side only: the cab with its emblem and identifiers stays out.
    region: { left: 0.57, top: 0.25, width: 0.43, height: 0.51 },
    alt: 'Plataforma cargada con varilla de acero dentro de una nave industrial.',
    caption: 'Varilla de acero en nave industrial',
  },
];

export default photos;
