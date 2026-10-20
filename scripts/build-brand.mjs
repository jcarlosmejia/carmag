#!/usr/bin/env node
/**
 * CARMAG TRANSPORTS — brand assets + WCAG contrast audit.
 *
 * 1. LOGO. The mark geometry is copied verbatim from the CARMAG business card
 *    (~/Downloads/carmag_frente.svg): two interlocking chevrons with rounded
 *    joins. The card sets the wordmark as live text in Avenir Next; here it is
 *    traced to paths in Montserrat (the site typeface, owner decision
 *    2026-10-19) using the card's own sizes, positions and `textLength`, so the
 *    lockup keeps the card's proportions without depending on an installed
 *    font. Colours are the card's: front (light background) and back (dark
 *    background). Replace with the master SVG once the owner supplies it.
 * 2. Icons and the OpenGraph image, rendered with sharp.
 * 3. Contrast audit of every colour pairing the UI uses. Exits non-zero on any
 *    pairing below its WCAG threshold.
 *
 * Usage: npm run brand            (assets + audit)
 *        npm run brand -- --audit-only
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import opentype from 'opentype.js';
import sharp from 'sharp';

const require = createRequire(import.meta.url);
const ROOT = path.resolve(import.meta.dirname, '..');
const BRAND = path.join(ROOT, 'public', 'brand');

const TEAL = '#123C3D';
const COPPER = '#C8794B';
const GRAY_LIGHT = '#B9C4C4';

/** Card inks: `dark` = back of the card, `light` = front. */
const INKS = {
  dark: { markA: '#FFFFFF', markB: COPPER, word: '#FFFFFF', descriptor: GRAY_LIGHT },
  light: { markA: TEAL, markB: COPPER, word: TEAL, descriptor: '#6B7779' },
};

/* --------------------------------------------------------------------------
   Contrast audit
   -------------------------------------------------------------------------- */
const channel = (c) => {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};
const luminance = (hex) => {
  const v = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(v.slice(i, i + 2), 16));
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
};
const contrast = (a, b) => {
  const [la, lb] = [luminance(a), luminance(b)];
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
};

/** [label, foreground, background, minimum]. Mirrors src/app/globals.css. */
const PAIRS = [
  // Dark teal bands
  ['white on teal', '#FFFFFF', '#123C3D', 4.5],
  ['mist body on teal', '#E6EDED', '#123C3D', 4.5],
  ['gray-light muted on teal', '#B9C4C4', '#123C3D', 4.5],
  ['gray-light muted on teal surface', '#B9C4C4', '#1A4748', 4.5],
  ['copper-light accent text on teal', '#E3A781', '#123C3D', 4.5],
  ['copper-light accent text on teal surface', '#E3A781', '#1A4748', 4.5],
  ['white focus ring on teal', '#FFFFFF', '#123C3D', 3],
  ['copper graphic on teal', '#C8794B', '#123C3D', 3],
  // Light bands (white and paper)
  ['teal on white', '#123C3D', '#FFFFFF', 4.5],
  ['teal on paper', '#123C3D', '#F3F6F6', 4.5],
  ['gray-dark muted on white', '#5B6769', '#FFFFFF', 4.5],
  ['gray-dark muted on paper', '#5B6769', '#F3F6F6', 4.5],
  ['card gray descriptor on white', '#6B7779', '#FFFFFF', 4.5],
  ['copper-deep accent text on white', '#9C5830', '#FFFFFF', 4.5],
  ['copper-deep accent text on paper', '#9C5830', '#F3F6F6', 4.5],
  ['copper icon on white', '#C8794B', '#FFFFFF', 3],
  ['copper icon on paper', '#C8794B', '#F3F6F6', 3],
  ['teal focus ring on white', '#123C3D', '#FFFFFF', 3],
  ['field border on white', '#6B7779', '#FFFFFF', 3],
  ['placeholder on white', '#6B7779', '#FFFFFF', 4.5],
  ['error text on white', '#B42318', '#FFFFFF', 4.5],
  ['error text on paper', '#B42318', '#F3F6F6', 4.5],
  // Map
  ['map label on teal halo', '#E6EDED', '#123C3D', 4.5],
  ['map outline on teal', '#B9C4C4', '#123C3D', 3],
  ['map route (copper-light) on landmass', '#E3A781', '#1A4748', 3],
  // Buttons and bands
  ['teal-ink on copper (primary button)', '#0B2526', '#C8794B', 4.5],
  ['teal-ink on copper hover', '#0B2526', '#D68D61', 4.5],
  ['white on teal (dark button)', '#FFFFFF', '#123C3D', 4.5],
  ['teal-ink on copper band', '#0B2526', '#C8794B', 4.5],
  ['whatsapp button label', '#FFFFFF', '#178644', 4.5],
  ['whatsapp button label hover', '#FFFFFF', '#11683A', 4.5],
  ['whatsapp float glyph', '#FFFFFF', '#1FA855', 3],
  ['whatsapp float ring on white', '#123C3D', '#FFFFFF', 3],
  ['whatsapp float fill on teal', '#1FA855', '#123C3D', 3],
];

function audit() {
  console.log('\nWCAG contrast audit');
  console.log('-------------------');
  let failures = 0;
  for (const [label, fg, bg, min] of PAIRS) {
    const ratio = contrast(fg, bg);
    const ok = ratio >= min;
    if (!ok) failures += 1;
    console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${ratio.toFixed(2).padStart(5)}:1  (min ${min})  ${label}`);
  }
  console.log(failures ? `\n${failures} pairing(s) below threshold.\n` : '\nAll pairings meet WCAG AA.\n');
  return failures;
}

/* --------------------------------------------------------------------------
   Logo
   -------------------------------------------------------------------------- */

/** Verbatim from the business card, in the mark's local units. */
const MARK_A = '0,102 100,2 218,2 285,68 271,82 170,82 112,140 175,203 100,203';
const MARK_B = '430,103 330,203 212,203 145,137 159,123 260,123 318,65 255,2 330,2';
/** Card placement: translate(50,50) scale(0.537); text positions in card units. */
const MARK_TRANSFORM = 'translate(50 50) scale(0.537)';

const font = (weight) =>
  opentype.loadSync(require.resolve(`@fontsource/montserrat/files/montserrat-latin-${weight}-normal.woff`));

/**
 * Traces text to a path, spreading glyphs so the run spans `length` units —
 * the equivalent of SVG `textLength` + `lengthAdjust="spacing"`.
 */
function tracedText(f, text, x, y, size, length) {
  const glyphs = f.stringToGlyphs(text);
  const scale = size / f.unitsPerEm;
  const natural = glyphs.reduce((sum, g) => sum + g.advanceWidth * scale, 0);
  // The run ends at the last glyph's advance, as in SVG.
  const gap = length ? (length - natural) / (glyphs.length - 1) : 0;
  let cursor = x;
  const parts = [];
  for (const g of glyphs) {
    parts.push(g.getPath(cursor, y, size).toPathData(1));
    cursor += g.advanceWidth * scale + gap;
  }
  return parts.join(' ');
}

const wordmark = tracedText(font(800), 'CARMAG', 302, 118, 84, 362);
const descriptor = tracedText(font(700), 'TRANSPORTS', 304, 158, 22, 358);
const VIEWBOX = '44 44 626 122';

/**
 * @param ink Card inks (`INKS.dark` or `INKS.light`).
 * @param withText Include the wordmark (false = mark only).
 */
function logoSvg(ink, { withText = true, background = null, viewBox = VIEWBOX } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">${
    background ? `<rect x="-2000" y="-2000" width="5000" height="5000" fill="${background}"/>` : ''
  }<g stroke-width="12" stroke-linejoin="round" transform="${MARK_TRANSFORM}"><polygon points="${MARK_A}" fill="${ink.markA}" stroke="${ink.markA}"/><polygon points="${MARK_B}" fill="${ink.markB}" stroke="${ink.markB}"/></g>${
    withText ? `<path fill="${ink.word}" d="${wordmark}"/><path fill="${ink.descriptor}" d="${descriptor}"/>` : ''
  }</svg>`;
}

/** Square viewBox centred on the mark, for icons. */
const MARK_BOX = { x: 47, y: 48, w: 237, h: 115 };
function iconSvg(size) {
  const pad = MARK_BOX.w * 0.16;
  const side = MARK_BOX.w + 2 * pad;
  const x = MARK_BOX.x - pad;
  const y = MARK_BOX.y + MARK_BOX.h / 2 - side / 2;
  return Buffer.from(
    logoSvg(INKS.dark, { withText: false, background: TEAL, viewBox: `${x} ${y} ${side} ${side}` }).replace(
      '<svg ',
      `<svg width="${size}" height="${size}" `,
    ),
  );
}

async function buildAssets() {
  await mkdir(BRAND, { recursive: true });

  await writeFile(
    path.join(ROOT, 'src/data/logoPaths.ts'),
    `/**
 * GENERATED by scripts/build-brand.mjs. Mark geometry from the CARMAG business
 * card; wordmark traced in Montserrat. Do not edit by hand.
 */

export const LOGO_VIEWBOX = '${VIEWBOX}';
export const MARK_TRANSFORM = '${MARK_TRANSFORM}';
export const MARK_A = '${MARK_A}';
export const MARK_B = '${MARK_B}';
export const WORDMARK_PATH = '${wordmark}';
export const DESCRIPTOR_PATH = '${descriptor}';
`,
  );

  await writeFile(path.join(BRAND, 'carmag-transports-logo-fondo-oscuro.svg'), logoSvg(INKS.dark));
  await writeFile(path.join(BRAND, 'carmag-transports-logo-fondo-claro.svg'), logoSvg(INKS.light));
  await sharp(Buffer.from(logoSvg(INKS.light).replace('<svg ', '<svg width="512" ')))
    .png()
    .toFile(path.join(BRAND, 'carmag-transports-logo-512.png'));

  for (const [name, size] of [
    ['favicon-32.png', 32],
    ['favicon-48.png', 48],
    ['apple-touch-icon.png', 180],
    ['icon-192.png', 192],
    ['icon-512.png', 512],
  ]) {
    await sharp(iconSvg(size)).png().toFile(path.join(BRAND, name));
  }

  // OpenGraph 1200×630: lockup, red rule, outlined tagline.
  const tagline = tracedText(font(600), 'Transporte de carga y fletes desde Guadalajara', 96, 446, 40);
  const equipmentLine = tracedText(font(600), "Caja seca 53'  ·  Planas 40' en adelante  ·  Pacífico, Norte y Bajío", 96, 506, 28);
  const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="${TEAL}"/>
<rect x="40" y="0" width="6" height="630" fill="${COPPER}"/>
<svg x="84" y="120" width="820" height="${(820 * 122) / 626}" viewBox="${VIEWBOX}">${logoSvg(INKS.dark).replace(/^<svg[^>]*>|<\/svg>$/g, '')}</svg>
<rect x="96" y="372" width="72" height="5" fill="${COPPER}"/>
<path fill="#FFFFFF" d="${tagline}"/>
<path fill="${GRAY_LIGHT}" d="${equipmentLine}"/>
</svg>`;
  await sharp(Buffer.from(og)).jpeg({ quality: 86, mozjpeg: true }).toFile(path.join(BRAND, 'og-image.jpg'));

  console.log('Brand assets written to public/brand and src/data/logoPaths.ts.');
}

if (!process.argv.includes('--audit-only')) await buildAssets();
if (audit() > 0) process.exitCode = 1;
