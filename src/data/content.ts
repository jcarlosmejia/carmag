/**
 * @description Site copy. Every statement here must trace to `company.ts` or
 * to the owner's Phase 0 answers (2026-10-19). Reader is addressed as "tú".
 */

import type { MapPointId } from './mapGeometry';

export const hero = {
  overline: 'Base en Guadalajara, Jalisco',
  title: 'Transporte de carga y fletes desde Guadalajara a todo México',
  lede: 'Caja seca de 53 pies y plataforma de 40 pies para carga comercial e industrial. Servicio spot, recurrente o dedicado, con salida desde la Zona Metropolitana de Guadalajara.',
  chips: ["Caja seca 53'", "Plataforma 40'", 'Carga completa (FTL)', 'Spot, recurrente y dedicado', 'Pacífico · Norte · Bajío'],
} as const;

/** Confirmed figures only. No counters, no fleet size, no founding year. */
export const figures = [
  { value: "53'", label: 'Caja seca' },
  { value: "40'", label: 'Plataforma' },
  { value: '3', label: 'Corredores de servicio' },
  { value: 'GDL', label: 'Base operativa' },
] as const;

/** Owner wording, 2026-10-19. Shown wherever capacity comes up. */
export const capacityDisclaimer =
  'Capacidad de carga sujeta al tipo de unidad, configuración, dimensiones, peso y condiciones de la ruta. Te confirmamos los límites específicos al cotizar.';

export type Service = { id: string; title: string; body: string };

export const services: readonly Service[] = [
  {
    id: 'carga-completa',
    title: 'Carga completa (FTL)',
    body: 'Una unidad para tu embarque, de origen a destino, sin consolidar con mercancía de terceros. Es la base de cada servicio que cotizamos.',
  },
  {
    id: 'spot',
    title: 'Servicio spot',
    body: 'Un viaje único cuando lo necesitas: nos das origen, destino y fecha de carga, y te cotizamos ese movimiento.',
  },
  {
    id: 'recurrente',
    title: 'Servicio recurrente',
    body: 'Viajes repetidos con la frecuencia de tu operación, para que tu abastecimiento o tus entregas no dependan de buscar transporte cada semana.',
  },
  {
    id: 'dedicado',
    title: 'Transporte dedicado',
    body: 'Capacidad de transporte asignada a los requerimientos de tu operación mediante un acuerdo comercial. La disponibilidad, la frecuencia y la asignación de unidades se definen en el contrato.',
  },
  {
    id: 'retorno',
    title: 'Cargas de retorno',
    body: 'Aprovechamos unidades con ruta de regreso disponible para ofrecer tarifas competitivas, principalmente en los corredores Pacífico, Norte y Bajío. Sujetas a disponibilidad.',
  },
  {
    id: 'alcance',
    title: 'Local, regional y nacional',
    body: 'Fletes dentro de la Zona Metropolitana de Guadalajara, hacia el occidente y el Bajío, y a otros destinos de la República bajo cotización.',
  },
];

export const sectors = [
  { name: 'Acero y productos metálicos', fit: "Plataforma 40'" },
  { name: 'Manufactura y producción industrial', fit: "Caja seca 53' · Plataforma 40'" },
  { name: 'Materiales de construcción', fit: "Plataforma 40'" },
  { name: 'Maquinaria y equipo industrial', fit: "Plataforma 40'" },
  { name: 'Bienes de consumo y mercancía empacada', fit: "Caja seca 53'" },
  { name: 'Alimentos que no requieren refrigeración', fit: "Caja seca 53'" },
  { name: 'Almacenaje, logística y distribución', fit: "Caja seca 53'" },
] as const;

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
    summary: 'Los polos industriales de Aguascalientes, Guanajuato y Querétaro, a pocas horas de Guadalajara.',
  },
];

export const coverage = {
  title: 'Fletes desde Guadalajara hacia el Pacífico, el Norte y el Bajío',
  body: 'Estos son nuestros corredores de servicio y los destinos que cotizamos con más frecuencia. También atendemos otros destinos dentro de México: dinos tu ruta y te confirmamos disponibilidad.',
  note: 'Los destinos son cobertura sujeta a disponibilidad de unidad, no salidas programadas. El servicio es dentro de la República Mexicana.',
} as const;

export const reasons = [
  {
    title: 'Base en Guadalajara',
    body: 'Salimos desde la Zona Metropolitana de Guadalajara, punto de partida natural hacia el Pacífico, el Norte y el Bajío.',
  },
  {
    title: 'La unidad correcta para tu carga',
    body: "Caja seca de 53' para mercancía que debe viajar protegida y plataforma de 40' para carga industrial que se maniobra por los costados o desde arriba.",
  },
  {
    title: 'Trato directo con el transportista',
    body: 'Cotizas y programas con CARMAG TRANSPORTS, la empresa que mueve tu carga.',
  },
  {
    title: 'Spot, recurrente o dedicado',
    body: 'Un viaje cuando lo necesitas, viajes con frecuencia fija o capacidad asignada por contrato: el esquema se ajusta a tu operación.',
  },
  {
    title: 'Corredores definidos',
    body: 'Pacífico, Norte y Bajío son nuestros corredores de servicio, y en ellos buscamos cargas de retorno que ayudan a mejorar tu tarifa.',
  },
  {
    title: 'Condiciones claras antes de cargar',
    body: 'Confirmamos unidad, capacidad, maniobra y fecha antes del servicio, para que la cotización refleje lo que realmente se va a mover.',
  },
] as const;

export const steps = [
  { title: 'Cuéntanos tu ruta', body: 'Origen, destino y tipo de carga.' },
  { title: 'Detalla la carga', body: 'Peso aproximado, dimensiones y fecha de carga.' },
  { title: 'Definimos la unidad', body: "Caja seca 53' o plataforma 40', y la maniobra de carga y descarga." },
  { title: 'Recibe tu tarifa', body: 'Te enviamos precio y condiciones del servicio.' },
  { title: 'Programamos la carga', body: 'Confirmas y agendamos la ventana de carga.' },
] as const;

export const faqs = [
  {
    q: '¿Son empresa transportista o intermediario?',
    a: 'CARMAG TRANSPORTS es una empresa transportista con base en Guadalajara, Jalisco. Si tu área de compras busca un carrier y no un intermediario, cotizas y programas tu flete directamente con nosotros.',
  },
  {
    q: '¿Qué tipo de unidades tienen?',
    a: 'Caja seca de 53 pies para carga general no refrigerada y plataforma de 40 pies para carga industrial, materiales y maquinaria.',
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
    q: '¿Puedo contratar un solo viaje?',
    a: 'Sí. El servicio spot es un viaje único: nos das origen, destino, tipo de carga y fecha, y te cotizamos ese movimiento.',
  },
  {
    q: '¿Qué es el transporte dedicado?',
    a: 'Es capacidad de transporte asignada a los requerimientos de tu operación mediante un acuerdo comercial. La disponibilidad, la frecuencia y la asignación de unidades se definen en el contrato.',
  },
  {
    q: '¿Qué son las cargas de retorno?',
    a: 'Son fletes que aprovechan una unidad con ruta de regreso disponible, lo que permite ofrecer una tarifa más competitiva. Se dan principalmente en los corredores Pacífico, Norte y Bajío, y siempre están sujetas a disponibilidad.',
  },
  {
    q: '¿Qué datos necesitan para cotizar?',
    a: 'Origen, destino y tipo de carga. Con el peso aproximado, las dimensiones, la fecha de carga y el tipo de unidad que necesitas, la tarifa sale más rápido y más precisa.',
  },
  {
    q: '¿Atienden fletes locales en Guadalajara?',
    a: 'Sí. Movemos carga dentro de la Zona Metropolitana de Guadalajara, además de servicios regionales y nacionales.',
  },
] as const;
