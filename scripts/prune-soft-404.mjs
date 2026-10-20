#!/usr/bin/env node
/**
 * Removes soft-404 pages from `out/`.
 *
 * A static page that calls `notFound()` (the privacy notice before its legal
 * data is confirmed) is still emitted as `<route>/index.html` containing the
 * 404 markup, and Cloudflare would serve it with status 200. Deleting it lets
 * `not_found_handling: "404-page"` answer with a real 404.
 *
 * Runs automatically after `next build` (see package.json).
 */
import { readdir, readFile, rm } from 'node:fs/promises';
import path from 'node:path';

const OUT = path.resolve(import.meta.dirname, '..', 'out');
const MARKER = '<title>Página no encontrada';

for (const entry of await readdir(OUT, { withFileTypes: true })) {
  if (!entry.isDirectory() || entry.name.startsWith('_') || entry.name === '404') continue;
  const dir = path.join(OUT, entry.name);
  const html = await readFile(path.join(dir, 'index.html'), 'utf8').catch(() => null);
  if (html?.includes(MARKER)) {
    await rm(dir, { recursive: true });
    console.log(`Removed soft-404 route: /${entry.name}/`);
  }
}
