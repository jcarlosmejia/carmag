#!/usr/bin/env node
/**
 * CARMAG TRANSPORTS — post-build QA over `out/`.
 *
 * Asserts on every built HTML page: exactly one <h1>; unique title and
 * description; its own canonical (indexable pages) and no accidental noindex;
 * JSON-LD that parses; every local href/src resolves to a built file and every
 * hash to an element id; sitemap URLs exist; 404 is noindex. Also guards the
 * brand contract: no previous-brand word in any page, image filename or alt
 * text.
 *
 * Usage: npm run check (after npm run build)
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

const OUT = path.resolve(import.meta.dirname, '..', 'out');
const SITE = 'https://carmag.com.mx';
const review = process.env.NEXT_PUBLIC_CARMAG_REVIEW === '1';

const FORBIDDEN = ['Lorem', 'undefined', 'NaN'];
/** Previous brand. `\b` keeps Spanish words such as "promover" out of it. */
const LEGACY_BRAND = /\bromo/i;

const errors = [];
const fail = (page, msg) => errors.push(`${page}: ${msg}`);

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) return name.startsWith('_') ? [] : htmlFiles(full);
    return name.endsWith('.html') ? [full] : [];
  });
}

const pages = htmlFiles(OUT).map((file) => {
  const rel = path.relative(OUT, file);
  const route = rel === '404.html' ? '/404' : `/${rel.replace(/index\.html$/, '')}`;
  return { file, route, html: readFileSync(file, 'utf8') };
});
const byRoute = new Map(pages.map((p) => [p.route, p]));
const idsOf = (html) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const attr = (html, re) => html.match(re)?.[1] ?? null;

const titles = new Map();
const descriptions = new Map();

for (const { route, html } of pages) {
  const is404 = route === '/404' || route === '/404/';
  const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1s !== 1) fail(route, `${h1s} <h1> elements`);

  const robots = attr(html, /<meta name="robots" content="([^"]+)"/);
  const noindex = robots?.includes('noindex') ?? false;
  if (is404 && !noindex) fail(route, '404 page is not noindex');
  if (!is404 && noindex !== review) fail(route, `robots="${robots}"`);

  if (!is404) {
    const canonical = attr(html, /<link rel="canonical" href="([^"]+)"/);
    if (canonical !== `${SITE}${route}`) fail(route, `canonical ${canonical} ≠ ${SITE}${route}`);
    const title = attr(html, /<title>([^<]+)<\/title>/);
    const desc = attr(html, /<meta name="description" content="([^"]+)"/);
    if (!title) fail(route, 'missing <title>');
    if (!desc) fail(route, 'missing description');
    if (titles.has(title)) fail(route, `duplicate title with ${titles.get(title)}`);
    if (descriptions.has(desc)) fail(route, `duplicate description with ${descriptions.get(desc)}`);
    titles.set(title, route);
    descriptions.set(desc, route);
    const prefix = title?.split(' | ')[0] ?? '';
    if (prefix.length > 60) fail(route, `title prefix ${prefix.length} chars > 60`);
  }
  if (!/<html lang="es-MX"/.test(html)) fail(route, 'missing lang="es-MX"');

  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(json);
      const types = JSON.stringify(data);
      if (/"FAQPage"|"AggregateRating"|"Review"|"LocalBusiness"/.test(types)) fail(route, 'forbidden JSON-LD type');
    } catch (e) {
      fail(route, `JSON-LD does not parse: ${e.message}`);
    }
  }

  // Visible text plus attribute values, without the RSC payload scripts.
  const markup = html.replace(/<script[\s\S]*?<\/script>/g, '');
  for (const word of FORBIDDEN) if (markup.includes(word)) fail(route, `contains "${word}"`);
  if (LEGACY_BRAND.test(html)) fail(route, `contains previous brand: "${html.match(/.{0,30}\bromo.{0,30}/i)?.[0]}"`);

  for (const [, raw] of markup.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const url = raw.replace(/&amp;/g, '&');
    if (/^(https?:|mailto:|tel:|data:)/.test(url) || url.startsWith('//')) continue;
    const [target, hash] = url.split('#');
    const pathname = (target || route).split('?')[0];
    if (pathname.startsWith('/')) {
      const fileExists = pathname.endsWith('/') ? byRoute.has(pathname) : existsSync(path.join(OUT, pathname));
      if (!fileExists) {
        fail(route, `broken link ${url}`);
        continue;
      }
    }
    if (hash) {
      const host = byRoute.get(pathname.endsWith('/') ? pathname : route);
      if (host && !idsOf(host.html).has(hash)) fail(route, `missing #${hash} on ${pathname}`);
    }
  }
}

for (const file of readdirSync(path.join(OUT, 'images'))) if (LEGACY_BRAND.test(file)) fail('images', `filename ${file}`);

const sitemap = readFileSync(path.join(OUT, 'sitemap.xml'), 'utf8');
for (const [, loc] of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const route = loc.replace(SITE, '');
  if (!byRoute.has(route)) fail('sitemap.xml', `${loc} has no page`);
  if (!loc.startsWith('https://') || !route.endsWith('/')) fail('sitemap.xml', `${loc} not canonical https with trailing slash`);
}
const robotsTxt = readFileSync(path.join(OUT, 'robots.txt'), 'utf8');
if (!robotsTxt.includes(`Sitemap: ${SITE}/sitemap.xml`)) fail('robots.txt', 'missing Sitemap line');
if (!review && !/Allow: \//.test(robotsTxt)) fail('robots.txt', 'missing Allow: /');
if (/^Host:/im.test(robotsTxt)) fail('robots.txt', 'has Host line');

console.log(`Checked ${pages.length} pages (${review ? 'review' : 'production'} build).`);
if (errors.length) {
  console.error(errors.map((e) => `  ✗ ${e}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log('  ✓ all checks passed');
}
