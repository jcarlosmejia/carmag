/**
 * @description Site copy. Every statement here must trace to `company.ts` or
 * to the owner's Phase 0 answers (2026-10-19). Reader is addressed as "tú".
 */

import type { MapPointId } from './mapGeometry';

export const hero = {
  overline: 'Base en Guadalajara, Jalisco',
  title: 'Transporte de carga y fletes desde Guadalajara a todo México',
  lede: 'Caja seca de 53 pies y planas de 40 pies en adelante para carga comercial e industrial. Servicio spot, recurrente o dedicado, con salida desde la Zona Metropolitana de Guadalajara.',
} as const;

/** Owner wording, 2026-10-19. Shown wherever capacity comes up. */
export const capacityDisclaimer =
  'Capacidad de carga sujeta al tipo de unidad, configuración, dimensiones, peso y condiciones de la ruta. Te confirmamos los límites específicos al cotizar.';

export type Service = { id: string; title: string; body: string };

/** The three operating models: what a buyer chooses between. */
export const modalities: readonly Service[] = [
  {
    id: 'spot',
    title: 'Spot',
    body: 'Un viaje único cuando lo necesitas: nos das origen, destino y fecha de carga, y te cotizamos ese movimiento.',
  },
  {
    id: 'recurrente',
    title: 'Recurrente',
    body: 'Viajes repetidos con la frecuencia de tu operación, para que tu abastecimiento o tus entregas no dependan de buscar transporte cada semana.',
  },
  {
    id: 'dedicado',
    title: 'Dedicado',
    body: 'Capacidad de transporte asignada a los requerimientos de tu operación mediante un acuerdo comercial. Disponibilidad, frecuencia y asignación de unidades se definen en el contrato.',
  },
];

/** Conditions that apply to every model. */
export const serviceNotes: readonly Service[] = [
  {
    id: 'carga-completa',
    title: 'Carga completa (FTL)',
    body: 'La unidad viaja solo con tu embarque, de origen a destino, sin consolidar con mercancía de terceros.',
  },
  {
    id: 'retorno',
    title: 'Cargas de retorno',
    body: 'Aprovechamos unidades con ruta de regreso disponible para ofrecer tarifas competitivas, principalmente en los corredores Pacífico, Norte y Bajío. Sujetas a disponibilidad.',
  },
  {
    id: 'alcance',
    title: 'Local, regional y nacional',
    body: 'Dentro de la Zona Metropolitana de Guadalajara, hacia el occidente y el Bajío, y a otros destinos de la República bajo cotización.',
  },
];

/** Every Service node in the JSON-LD; mirrors the visible text. */
export const services: readonly Service[] = [...modalities, ...serviceNotes];

export type Corridor = {
  id: 'pacifico' | 'norte' | 'bajio';
  name: string;
  states: string;
  stops: readonly { id: MapPointId; name: string }[];
  summary: string;
};

export const corridors: readonly Corridor[] = [
  {
    id: 'pacifico',
    name: 'Corredor Pacífico',
    states: 'Colima · Nayarit · Sinaloa · Sonora',
    stops: [
      { id: 'colima', name: 'Colima' },
      { id: 'manzanillo', name: 'Manzanillo' },
      { id: 'tepic', name: 'Tepic' },
      { id: 'mazatlan', name: 'Mazatlán' },
      { id: 'culiacan', name: 'Culiacán' },
      { id: 'los-mochis', name: 'Los Mochis' },
      { id: 'ciudad-obregon', name: 'Ciudad Obregón' },
      { id: 'hermosillo', name: 'Hermosillo' },
    ],
    summary: 'Del puerto de Manzanillo y Colima hacia Tepic y la costa de Sinaloa, hasta Ciudad Obregón y Hermosillo.',
  },
  {
    id: 'norte',
    name: 'Corredor Norte',
    states: 'Coahuila · Nuevo León · Chihuahua',
    stops: [
      { id: 'torreon', name: 'Torreón' },
      { id: 'saltillo', name: 'Saltillo' },
      { id: 'ramos-arizpe', name: 'Ramos Arizpe' },
      { id: 'monterrey', name: 'Monterrey' },
      { id: 'chihuahua', name: 'Chihuahua' },
    ],
    summary: 'Hacia La Laguna, la zona industrial de Saltillo y Ramos Arizpe, Monterrey y Chihuahua.',
  },
  {
    id: 'bajio',
    name: 'Corredor Bajío',
    states: 'Aguascalientes · Guanajuato · Querétaro',
    stops: [
      { id: 'aguascalientes', name: 'Aguascalientes' },
      { id: 'leon', name: 'León' },
      { id: 'silao', name: 'Silao' },
      { id: 'irapuato', name: 'Irapuato' },
      { id: 'celaya', name: 'Celaya' },
      { id: 'queretaro', name: 'Querétaro' },
    ],
    summary: 'Los polos industriales de Aguascalientes, Guanajuato y Querétaro.',
  },
];

export const coverage = {
  title: 'Fletes desde Guadalajara hacia el Pacífico, el Norte y el Bajío',
  body: 'Estos son nuestros corredores de servicio y los destinos que cotizamos con más frecuencia. También atendemos otros destinos dentro de México: dinos tu ruta y te confirmamos disponibilidad.',
  note: 'Los destinos son cobertura sujeta a disponibilidad de unidad, no salidas programadas. El servicio es dentro de la República Mexicana.',
} as const;

/**
 * Differentiators the visitor can check: each is a fact stated elsewhere on
 * the site or in the quote itself. No clients, certifications, insurance,
 * tracking, response times or guarantees until the owner documents them.
 */
export const reasons = [
  {
    title: 'Base en Guadalajara',
    body: 'Salimos desde la Zona Metropolitana de Guadalajara hacia el Pacífico, el Norte y el Bajío.',
  },
  {
    title: 'Trato directo con el transportista',
    body: 'Cotizas y programas con CARMAG TRANSPORTS, la empresa que mueve tu carga, por WhatsApp, teléfono o correo.',
  },
  {
    title: 'Condiciones claras antes de cargar',
    body: 'Confirmamos unidad, configuración, capacidad, maniobra y fecha antes del servicio, para que la tarifa refleje lo que se va a mover.',
  },
  {
    title: 'Restricciones a la vista',
    body: 'Sin refrigeración, sin sobredimensión ni sobrepeso, y disponibilidad sujeta a confirmación: lo sabes antes de cotizar.',
  },
] as const;

export const faqs = [
  {
    q: '¿Son empresa transportista o intermediario?',
    a: 'CARMAG TRANSPORTS es una empresa transportista con base en Guadalajara, Jalisco. Si tu área de compras busca un carrier y no un intermediario, cotizas y programas tu flete directamente con nosotros.',
  },
  {
    q: '¿Qué tipo de unidades tienen?',
    a: 'Caja seca de 53 pies para carga general no refrigerada y planas de 40 pies en adelante para carga industrial, materiales y maquinaria. La longitud y configuración de la plana se confirman al cotizar.',
  },
  {
    q: '¿Cuánto peso pueden mover?',
    a: 'Depende del tipo de unidad, su configuración, las dimensiones y el peso de tu carga, y las condiciones de la ruta. Por eso no publicamos una cifra única: te confirmamos los límites específicos al cotizar.',
  },
  {
    q: '¿A qué ciudades llegan?',
    a: 'Nuestros corredores de servicio son Pacífico (de Manzanillo a Hermosillo), Norte (Torreón, Saltillo, Ramos Arizpe, Monterrey y Chihuahua) y Bajío (Aguascalientes, León, Silao, Irapuato, Celaya y Querétaro). También cotizamos otros destinos dentro de México, sujetos a disponibilidad.',
  },
  {
    q: '¿Hacen viajes a Estados Unidos?',
    a: 'Nuestro servicio es de transporte nacional, dentro de la República Mexicana.',
  },
  {
    q: '¿Mueven carga refrigerada?',
    a: 'No. Nuestras cajas secas son para carga general que no requiere refrigeración, como producto empacado, mercancía paletizada o alimentos no perecederos.',
  },
  {
    q: '¿Qué datos necesitan para cotizar?',
    a: 'Origen, destino y tipo de mercancía. Con la unidad, la fecha estimada, el peso y las medidas de la carga, la tarifa sale más rápido y más precisa.',
  },
  {
    q: '¿Llamo o escribo por WhatsApp?',
    a: 'Como prefieras: son líneas distintas. Las llamadas van al número de Llamadas y los mensajes al de WhatsApp; ambos aparecen en la sección de cotización y al pie de cada página.',
  },
] as const;
