import assert from 'node:assert/strict';
import { test } from 'node:test';
import { whatsappLink } from '../data/company.ts';
import {
  UNIT_OPTIONS,
  buildQuoteMessage,
  copyText,
  emptyQuote,
  quoteHrefFor,
  quoteTemplate,
  quoteTemplateMailto,
  unitFromSearch,
  validateQuote,
} from './quote.ts';

const valid = { ...emptyQuote, origen: 'Guadalajara, Jal.', destino: 'Querétaro', mercancia: 'Lámina de acero' };

test('requires origen, destino and mercancía only', () => {
  assert.deepEqual(Object.keys(validateQuote(emptyQuote)).sort(), ['destino', 'mercancia', 'origen']);
  assert.deepEqual(validateQuote(valid), {});
  assert.ok(validateQuote({ ...valid, origen: '   ' }).origen, 'whitespace is not a value');
});

test('optional numbers must be positive; kg allows thousands commas, metres a decimal comma', () => {
  assert.equal(validateQuote({ ...valid, peso: '18,000' }).peso, undefined);
  assert.equal(validateQuote({ ...valid, largo: '2,4' }).largo, undefined);
  assert.ok(validateQuote({ ...valid, peso: 'veinte' }).peso);
  assert.ok(validateQuote({ ...valid, alto: '0' }).alto);
  assert.ok(validateQuote({ ...valid, ancho: '-2' }).ancho);
});

test('message keeps accents and line breaks and omits empty optional fields', () => {
  const msg = buildQuoteMessage({ ...valid, unidad: 'planas-40', fecha: '2026-11-03', peso: '18,000', largo: '12', alto: '1,8', observaciones: 'Maniobra con grúa' });
  assert.equal(
    msg,
    [
      'Hola, quiero cotizar un transporte con CARMAG TRANSPORTS.',
      '',
      'Origen: Guadalajara, Jal.',
      'Destino: Querétaro',
      'Mercancía: Lámina de acero',
      'Unidad: Planas de 40 pies en adelante',
      'Fecha estimada: 03/11/2026',
      'Peso aproximado: 18000 kg',
      'Dimensiones: largo 12 m × alto 1.8 m',
      'Observaciones: Maniobra con grúa',
    ].join('\n'),
  );
  assert.doesNotMatch(buildQuoteMessage(valid), /Unidad|Fecha|Peso|Dimensiones|Observaciones/);
});

test('WhatsApp link targets the published number and encodes the message losslessly', () => {
  const msg = buildQuoteMessage({ ...valid, observaciones: 'Cajas & tarimas #3 ¿urgente?' });
  const link = whatsappLink(msg);
  assert.ok(link?.startsWith('https://wa.me/523310131863?text='));
  const text = new URL(link!).searchParams.get('text');
  assert.equal(text, msg);
  assert.match(link!, /%0A/);
  assert.match(link!, /Quer%C3%A9taro/);
});

test('direct links share one template that keeps the unit', () => {
  assert.match(quoteTemplate('caja-seca-53'), /Unidad: Caja seca de 53 pies/);
  assert.match(quoteTemplate(), /Unidad: \n/);
  const body = new URL(quoteTemplateMailto('ventas@example.com', 'planas-40')).searchParams.get('body');
  assert.equal(body, quoteTemplate('planas-40'));
});

test('each unit survives the trip from its page to the form; nothing else does', () => {
  for (const { value } of UNIT_OPTIONS) {
    const url = new URL(quoteHrefFor(value), 'https://carmag.com.mx');
    assert.equal(unitFromSearch(url.search), value);
    assert.deepEqual([...url.searchParams.keys()], ['unidad']);
    assert.equal(url.hash, '#cotizar');
  }
  assert.equal(quoteHrefFor(), '/#cotizar');
  assert.equal(unitFromSearch('?unidad=refrigerado'), '');
  assert.equal(unitFromSearch(''), '');
});

test('copy fallback reports success and refusal', async () => {
  let copied = '';
  assert.equal(await copyText('hola', { writeText: async (t) => void (copied = t) }), true);
  assert.equal(copied, 'hola');
  assert.equal(await copyText('hola', { writeText: async () => Promise.reject(new Error('denied')) }), false);
  assert.equal(await copyText('hola', undefined), false);
});
