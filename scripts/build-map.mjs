#!/usr/bin/env node
/**
 * CARMAG TRANSPORTS — coverage map geometry.
 *
 * Generates `src/data/mapGeometry.ts` from the public-domain Natural Earth
 * 1:50m country boundaries (packaged as `world-atlas`). Nothing is drawn by
 * eye: the outline and every city dot go through the same projection.
 *
 * Projection: equirectangular with longitude scaled by cos(mid-latitude),
 * fitted into a 1000×620 viewBox, outline reduced with Douglas–Peucker
 * (1.5px). Only the mainland ring is kept (Baja California is part of it);
 * offshore islands are dropped.
 *
 * Usage: npm run map
 */

import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { feature } from 'topojson-client';

const require = createRequire(import.meta.url);
const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'src/data/mapGeometry.ts');

const W = 1000;
const H = 620;
const PAD = 12;
const TOLERANCE = 1.5;

/** [lon, lat]. Destinations are owner-listed (2026-10-19). Waypoints carry no dot. */
const POINTS = {
  guadalajara: [-103.35, 20.67],
  // Pacífico
  colima: [-103.72, 19.24],
  manzanillo: [-104.32, 19.05],
  tepic: [-104.89, 21.5],
  mazatlan: [-106.41, 23.24],
  culiacan: [-107.39, 24.8],
  'los-mochis': [-108.99, 25.79],
  'ciudad-obregon': [-109.93, 27.49],
  hermosillo: [-110.96, 29.07],
  // Norte
  torreon: [-103.41, 25.54],
  chihuahua: [-106.09, 28.63],
  saltillo: [-101.0, 25.42],
  'ramos-arizpe': [-100.95, 25.54],
  monterrey: [-100.31, 25.69],
  // Bajío
  aguascalientes: [-102.29, 21.88],
  leon: [-101.68, 21.12],
  silao: [-101.43, 20.94],
  irapuato: [-101.35, 20.68],
  celaya: [-100.82, 20.52],
  queretaro: [-100.39, 20.59],
  // Road waypoints only — not destinations, never labelled.
  '~zacatecas': [-102.58, 22.77],
  '~jimenez': [-104.92, 27.13],
  '~lagos': [-101.93, 21.36],
};

/**
 * One path per corridor. A corridor that forks keeps one `<path>` with a second
 * subpath, so it still reads as a single dashed corridor.
 */
const CORRIDORS = {
  pacifico: [
    ['manzanillo', 'colima', 'guadalajara', 'tepic', 'mazatlan', 'culiacan', 'los-mochis', 'ciudad-obregon', 'hermosillo'],
  ],
  norte: [
    ['guadalajara', '~zacatecas', 'torreon', '~jimenez', 'chihuahua'],
    ['torreon', 'saltillo', 'ramos-arizpe', 'monterrey'],
  ],
  bajio: [
    ['guadalajara', '~lagos', 'leon', 'silao', 'irapuato', 'celaya', 'queretaro'],
    ['~lagos', 'aguascalientes'],
  ],
};

const topo = JSON.parse(readFileSync(require.resolve('world-atlas/countries-50m.json'), 'utf8'));
const mexico = feature(topo, topo.objects.countries).features.find((f) => f.id === '484');
if (!mexico) throw new Error('Mexico (484) not found in world-atlas');

const polygons = mexico.geometry.type === 'MultiPolygon' ? mexico.geometry.coordinates : [mexico.geometry.coordinates];
const mainland = polygons.map((p) => p[0]).sort((a, b) => b.length - a.length)[0];

const lons = mainland.map((p) => p[0]);
const lats = mainland.map((p) => p[1]);
const [minLon, maxLon, minLat, maxLat] = [Math.min(...lons), Math.max(...lons), Math.min(...lats), Math.max(...lats)];
const k = Math.cos((((minLat + maxLat) / 2) * Math.PI) / 180);
const scale = Math.min((W - 2 * PAD) / ((maxLon - minLon) * k), (H - 2 * PAD) / (maxLat - minLat));
const offX = (W - (maxLon - minLon) * k * scale) / 2;
const offY = (H - (maxLat - minLat) * scale) / 2;

/** Same function for the outline and every city. */
const project = ([lon, lat]) => [offX + (lon - minLon) * k * scale, offY + (maxLat - lat) * scale];

function simplify(points, tol) {
  if (points.length < 3) return points;
  const [a, b] = [points[0], points[points.length - 1]];
  let max = 0;
  let index = 0;
  for (let i = 1; i < points.length - 1; i += 1) {
    const [px, py] = points[i];
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const len = Math.hypot(dx, dy) || 1;
    const d = Math.abs(dy * px - dx * py + b[0] * a[1] - b[1] * a[0]) / len;
    if (d > max) [max, index] = [d, i];
  }
  if (max <= tol) return [a, b];
  return [...simplify(points.slice(0, index + 1), tol).slice(0, -1), ...simplify(points.slice(index), tol)];
}

const r1 = (n) => Math.round(n * 10) / 10;
const full = mainland.map(project);
// A closed ring starts and ends on the same point, which Douglas–Peucker would
// collapse to a single segment; simplify the two halves separately.
const mid = Math.floor(full.length / 2);
const ring = [...simplify(full.slice(0, mid + 1), TOLERANCE).slice(0, -1), ...simplify(full.slice(mid), TOLERANCE)];
const outline = `M ${ring.map(([x, y]) => `${r1(x)} ${r1(y)}`).join(' L ')} Z`;

const projected = Object.fromEntries(
  Object.entries(POINTS).map(([id, ll]) => {
    const [x, y] = project(ll);
    return [id, { x: r1(x), y: r1(y) }];
  }),
);
const destinations = Object.fromEntries(Object.entries(projected).filter(([id]) => !id.startsWith('~')));
const corridorPaths = Object.fromEntries(
  Object.entries(CORRIDORS).map(([id, lines]) => [
    id,
    lines.map((ids) => `M ${ids.map((p) => `${projected[p].x} ${projected[p].y}`).join(' L ')}`).join(' '),
  ]),
);

const source = `/**
 * GENERATED by scripts/build-map.mjs from Natural Earth 1:50m (world-atlas).
 * Do not edit by hand: change the script and run \`npm run map\`.
 */

export const MAP_WIDTH = ${W};
export const MAP_HEIGHT = ${H};

/** Mainland Mexico, ${ring.length} points. */
export const MEXICO_OUTLINE = ${JSON.stringify(outline)};

/** Projected destinations (waypoints excluded). */
export const mapPoints = ${JSON.stringify(destinations, null, 2)} as const;

export type MapPointId = keyof typeof mapPoints;

/** One dashed path per corridor. */
export const corridorPaths = ${JSON.stringify(corridorPaths, null, 2)} as const;
`;

writeFileSync(OUT, source);
console.log(`mapGeometry.ts written — outline ${ring.length} points, ${Object.keys(destinations).length} destinations.`);
