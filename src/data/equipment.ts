/**
 * @description Equipment data: drives the home equipment cards and the two
 * service pages (`/[servicio]/`). Only confirmed configurations: 53' dry van
 * and 40' flatbed. No weights, axles or 48' units until confirmed.
 */

import type { ImageSlot } from './imageManifest';

export type Equipment = {
  slug: 'caja-seca-53-pies' | 'plataforma-40-pies';
  imageSlot: ImageSlot;
  short: string;
  name: string;
  kicker: string;
  /** Length in feet and its metric conversion. */
  length: { ft: number; m: string };
  summary: string;
  idealFor: readonly string[];
  handling: readonly string[];
  whatsappMessage: string;
  linkLabel: string;
  page: {
    metaTitle: string;
    description: string;
    breadcrumb: string;
    h1: string;
    lede: string;
    whatWeMove: readonly string[];
    howWeOperate: readonly { title: string; body: string }[];
    faqs: readonly { q: string; a: string }[];
  };
};

export const equipment: readonly Equipment[] = [
  {
    slug: 'caja-seca-53-pies',
    imageSlot: 'caja-seca',
    short: "Caja seca 53'",
    name: 'Caja seca de 53 pies',
    kicker: 'Carga general protegida',
    length: { ft: 53, m: '16.15' },
    summary:
      'Caja cerrada para carga general no refrigerada: tu mercancía viaja protegida de la lluvia, el polvo y el sol.',
    idealFor: [
      'Producto terminado y mercancía empacada',
      'Carga paletizada',
      'Bienes de consumo',
      'Alimentos que no requieren refrigeración',
      'Abastecimiento a almacenes y centros de distribución',
    ],
    handling: [
      'Carga y descarga por la puerta trasera, en andén o con montacargas.',
      'Carga completa: la unidad viaja solo con tu embarque.',
      'Para carga seca; no ofrecemos servicio refrigerado.',
    ],
    whatsappMessage:
      'Hola, quiero cotizar un flete en caja seca de 53 pies.\nOrigen: \nDestino: \nTipo de carga: \nFecha de carga: ',
    linkLabel: "Ver fletes en caja seca 53'",
    page: {
      metaTitle: 'Caja Seca de 53 Pies en Guadalajara',
      description:
        'Fletes en caja seca de 53 pies desde Guadalajara para carga general no refrigerada: producto empacado, paletizado y bienes de consumo. Servicio spot, recurrente o dedicado.',
      breadcrumb: "Caja seca 53'",
      h1: 'Fletes en caja seca de 53 pies desde Guadalajara',
      lede: 'Transporte de carga general no refrigerada en caja cerrada de 53 pies, con salida desde la Zona Metropolitana de Guadalajara hacia el Pacífico, el Norte, el Bajío y otros destinos de México.',
      whatWeMove: [
        'Producto terminado y mercancía empacada',
        'Carga paletizada para almacenes y CEDIS',
        'Bienes de consumo',
        'Insumos y materiales que deben viajar protegidos del clima',
        'Alimentos no perecederos que no requieren refrigeración',
      ],
      howWeOperate: [
        {
          title: 'Revisamos tu carga',
          body: 'Con el tipo de mercancía, el peso aproximado, las dimensiones y la cantidad de tarimas confirmamos que la caja de 53 pies es la unidad adecuada.',
        },
        {
          title: 'Acordamos la ventana de carga',
          body: 'Definimos fecha y horario de carga en tu planta, almacén o CEDIS, y la forma de carga: andén, montacargas o maniobra manual.',
        },
        {
          title: 'Carga completa a destino',
          body: 'La unidad viaja solo con tu embarque, de origen a destino, sin consolidar con mercancía de terceros.',
        },
        {
          title: 'Spot, recurrente o dedicado',
          body: 'Un viaje único, viajes con frecuencia fija o capacidad asignada por contrato, según lo que pida tu operación.',
        },
      ],
      faqs: [
        {
          q: '¿Qué carga cabe en una caja seca de 53 pies?',
          a: 'Es la caja cerrada más larga de uso común en México, de 53 pies (unos 16 metros). El volumen y el peso que puedes cargar dependen de la configuración de la unidad y de la ruta; te los confirmamos al cotizar.',
        },
        {
          q: '¿Pueden mover alimentos en caja seca?',
          a: 'Sí, siempre que no requieran refrigeración, como producto empacado o no perecedero. No ofrecemos servicio refrigerado.',
        },
        {
          q: '¿Cómo cotizo un flete en caja seca?',
          a: 'Envíanos origen, destino y tipo de carga. Con peso, dimensiones y fecha de carga la tarifa sale más precisa.',
        },
      ],
    },
  },
  {
    slug: 'plataforma-40-pies',
    imageSlot: 'plataforma',
    short: "Plataforma 40'",
    name: 'Plataforma de 40 pies',
    kicker: 'Carga industrial',
    length: { ft: 40, m: '12.2' },
    summary:
      'Plataforma abierta para carga industrial, materiales y maquinaria que se cargan por los costados o desde arriba.',
    idealFor: [
      'Acero y productos metálicos',
      'Materiales de construcción',
      'Maquinaria y equipo industrial',
      'Estructuras y piezas de gran formato dentro de medidas permitidas',
    ],
    handling: [
      'Carga y descarga lateral o desde arriba, con montacargas o grúa.',
      'Planeamos contigo la maniobra antes del día de carga.',
      'Sin servicios de sobredimensión ni sobrepeso.',
    ],
    whatsappMessage:
      'Hola, quiero cotizar un flete en plataforma de 40 pies.\nOrigen: \nDestino: \nTipo de carga: \nPeso y dimensiones: ',
    linkLabel: "Ver fletes en plataforma 40'",
    page: {
      metaTitle: 'Transporte en Plataforma de 40 Pies en Guadalajara',
      description:
        'Transporte en plataforma de 40 pies desde Guadalajara para acero, materiales de construcción, maquinaria y carga industrial. Servicio spot, recurrente o dedicado.',
      breadcrumb: "Plataforma 40'",
      h1: 'Transporte en plataforma de 40 pies desde Guadalajara',
      lede: 'Fletes de carga industrial en plataforma abierta de 40 pies, con salida desde la Zona Metropolitana de Guadalajara hacia el Pacífico, el Norte, el Bajío y otros destinos de México.',
      whatWeMove: [
        'Acero, perfiles, lámina y productos metálicos',
        'Materiales de construcción',
        'Maquinaria y equipo industrial',
        'Estructuras y piezas de gran formato dentro de medidas permitidas',
        'Insumos industriales que se maniobran con grúa o montacargas',
      ],
      howWeOperate: [
        {
          title: 'Revisamos peso y dimensiones',
          body: 'Con el peso, las medidas y la forma de la carga confirmamos que viaje en plataforma de 40 pies dentro de lo permitido.',
        },
        {
          title: 'Planeamos la maniobra',
          body: 'Acordamos cómo se carga y se descarga: por los costados o desde arriba, con montacargas o grúa, en origen y en destino.',
        },
        {
          title: 'Carga completa a destino',
          body: 'La plataforma viaja solo con tu embarque, de origen a destino.',
        },
        {
          title: 'Spot, recurrente o dedicado',
          body: 'Un viaje único, viajes con frecuencia fija o capacidad asignada por contrato, según tu operación.',
        },
      ],
      faqs: [
        {
          q: '¿Cuánto peso lleva una plataforma de 40 pies?',
          a: 'Depende de la configuración de la unidad, de las dimensiones y el peso de la carga, y de las condiciones de la ruta. No publicamos una cifra única: te confirmamos el límite específico al cotizar.',
        },
        {
          q: '¿Mueven carga sobredimensionada?',
          a: 'No ofrecemos servicios de sobredimensión ni sobrepeso. La carga debe viajar dentro de las medidas y el peso permitidos.',
        },
        {
          q: '¿Quién hace la maniobra de carga?',
          a: 'La definimos contigo al cotizar: qué equipo se usa en origen y en destino, y cómo se coloca la carga sobre la plataforma.',
        },
      ],
    },
  },
];

export const equipmentBySlug = (slug: string) => equipment.find((e) => e.slug === slug);
