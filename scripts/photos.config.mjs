/**
 * CARMAG TRANSPORTS — photo specification for `npm run images`.
 *
 * ONLY REAL CARMAG PHOTOGRAPHS. No stock, no AI-generated equipment, no photos
 * from Romo's Transportes or any other company. Each entry needs owner
 * approval for publication (people, plates and third-party signage included).
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
const photos = [];

export default photos;
