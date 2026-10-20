#!/usr/bin/env node
/**
 * Generates `docs/content-verification.md` from `src/data/company.ts`.
 *
 * The verification checklist is generated rather than hand-written so that it
 * can never drift from the `pendingVerification` list the application actually
 * reads. Add or resolve an item in `src/data/company.ts` and re-run this.
 *
 * Usage: npm run docs
 */

import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { readFileSync } from 'node:fs';

const ROOT = path.resolve(import.meta.dirname, '..');

/**
 * Pull `pendingVerification` out of the TypeScript source by evaluating just
 * that array literal. Avoids adding a TS build step for a docs script.
 */
function readPendingVerification() {
  const src = readFileSync(path.join(ROOT, 'src/data/company.ts'), 'utf8');
  const start = src.indexOf('export const pendingVerification');
  if (start === -1) throw new Error('pendingVerification not found in company.ts');
  // Anchor on the assignment, not the first `[` — the type annotation
  // `readonly VerificationItem[]` also contains brackets and would otherwise
  // be parsed as an empty array.
  const assign = src.indexOf('= [', start);
  if (assign === -1) throw new Error('pendingVerification assignment not found');
  const open = assign + 2;
  let depth = 0;
  let end = -1;
  for (let i = open; i < src.length; i += 1) {
    if (src[i] === '[') depth += 1;
    else if (src[i] === ']') {
      depth -= 1;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  const literal = src.slice(open, end + 1);
  // The literal is plain data (strings and object literals) with no identifiers.
  return Function(`"use strict"; return (${literal});`)();
}

const IMPACT = {
  'blocks-launch': {
    label: 'Bloquea la publicación',
    note: 'El sitio no debe publicarse sin esto.',
  },
  'limits-messaging': {
    label: 'Limita el mensaje',
    note: 'El sitio funciona, pero no puede afirmarlo hasta que se confirme.',
  },
  'nice-to-have': {
    label: 'Mejora opcional',
    note: 'No bloquea nada; mejora el resultado si se resuelve.',
  },
};

const items = readPendingVerification();
const groups = ['blocks-launch', 'limits-messaging', 'nice-to-have'];

const lines = [
  '# Verificación de contenido — CARMAG TRANSPORTS',
  '',
  '> **Generado automáticamente** por `npm run docs` a partir de',
  '> `src/data/company.ts` (`pendingVerification`). No editar a mano: resuelva o',
  '> agregue el punto en ese archivo y vuelva a generar.',
  '',
  'Este documento lista **todo dato de negocio que el sitio NO afirma** porque no',
  'ha sido confirmado por el propietario. La regla aplicada en todo el proyecto es:',
  'un dato sin confirmar no se publica, no se sustituye por una suposición y no se',
  'toma de la competencia. Los campos correspondientes en `src/data/company.ts`',
  'están en `null` y la interfaz oculta lo que no puede sostener.',
  '',
  `**Total de puntos pendientes: ${items.length}**`,
  '',
];

for (const g of groups) {
  const bucket = items.filter((i) => i.impact === g);
  if (bucket.length === 0) continue;
  lines.push(`## ${IMPACT[g].label} (${bucket.length})`, '', `_${IMPACT[g].note}_`, '');
  for (const item of bucket) {
    lines.push(
      `### ${item.question}`,
      '',
      `- **Por qué no se publica:** ${item.reason}`,
      `- **Qué hace el sitio hoy:** ${item.currentBehaviour}`,
      `- **Identificador interno:** \`${item.id}\``,
      '',
    );
  }
}

lines.push(
  '## Cómo se activa un dato confirmado',
  '',
  'Cada dato pendiente vive en `src/data/company.ts`. Los canales de contacto',
  'tienen un indicador `confirmed`: al cambiarlo a `true` y reconstruir, el sitio',
  'muestra ese canal en todas sus ubicaciones. Los datos en `null` (razón social,',
  'domicilio, horario, año, flotilla) se llenan con el valor confirmado.',
  '',
  'Para revisar el diseño completo con los datos candidatos, sin publicarlos:',
  '',
  '```',
  'NEXT_PUBLIC_CARMAG_REVIEW=1 npm run build',
  '```',
  '',
  'Esa compilación lleva `noindex` en todas las páginas y un aviso visible. Nunca',
  'debe ser la que se despliega en producción.',
  '',
);

await writeFile(path.join(ROOT, 'docs/content-verification.md'), lines.join('\n'));
console.log(
  `docs/content-verification.md written — ${items.length} pending items ` +
    `(${items.filter((i) => i.impact === 'blocks-launch').length} blocking).`,
);
