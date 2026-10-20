import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildQuoteMessage, emptyQuote, quoteMailto, validateQuote } from './quote.ts';

const valid = { ...emptyQuote, nombre: 'Prueba', telefono: '33 0000 0000', origen: 'Guadalajara', destino: 'Monterrey', carga: 'Tarimas' };

test('requires the five quote fields', () => {
  assert.deepEqual(Object.keys(validateQuote(emptyQuote)).sort(), ['carga', 'destino', 'nombre', 'origen', 'telefono']);
  assert.deepEqual(validateQuote(valid), {});
});

test('rejects short phones and malformed optional e-mail', () => {
  assert.ok(validateQuote({ ...valid, telefono: '12345' }).telefono);
  assert.ok(validateQuote({ ...valid, email: 'nombre@' }).email);
  assert.equal(validateQuote({ ...valid, email: 'nombre@empresa.mx' }).email, undefined);
});

test('message omits empty optional fields; mailto encodes spaces as %20', () => {
  const msg = buildQuoteMessage(valid);
  assert.match(msg, /Origen: Guadalajara/);
  assert.doesNotMatch(msg, /Empresa:/);
  const link = quoteMailto('ventas@example.com', valid);
  assert.ok(link.startsWith('mailto:ventas@example.com?subject=Solicitud%20de%20tarifa'));
  assert.ok(!link.includes('+'));
});
