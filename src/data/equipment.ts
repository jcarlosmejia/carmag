/**
 * @description Equipment data: drives the home comparison and the two
 * service pages (`/[servicio]/`). Owner-confirmed offer: caja seca de 53 pies
 * and planas de 40 pies en adelante (correction 2026-10-20). No weights, axles
 * or other lengths are published; configuration is confirmed when quoting.
 *
 * The flatbed URL stays `/plataforma-40-pies/` so existing links keep working.
 */

import type { ImageSlot } from './imageManifest';
import type { UnitKey } from '@/lib/quote';

export type Equipment = {
  slug: 'caja-seca-53-pies' | 'plataforma-40-pies';
  /** Preselected in the quote form when coming from this page. */
  unit: UnitKey;
  imageSlot: ImageSlot;
  short: string;
  name: string;
  kicker: string;
  /** Length as published, used by the fallback diagram. */
  lengthLabel: string;
  summary: string;
  idealFor: readonly string[];
  /** Conditions and restrictions shown next to the unit. */
  conditions: readonly string[];
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
    unit: 'caja-seca-53',
    imageSlot: 'caja-seca',
    short: "Caja seca 53'",
    name: 'Caja seca de 53 pies',
    kicker: 'Carga general protegida',
    lengthLabel: '53 pies · 16.15 m',
    summary: 'Caja cerrada para carga general no refrigerada: la mercancía viaja protegida de la lluvia, el polvo y el sol.',
    idealFor: ['Producto terminado y mercancía empacada', 'Carga en tarimas', 'Bienes de consumo y alimentos no perecederos', 'Abastecimiento a almacenes y CEDIS'],
    conditions: ['Carga seca: sin servicio refrigerado.', 'Carga y descarga por la puerta trasera, en andén o con montacargas.'],
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
          a: 'Usa el formulario de cotización: la caja seca queda seleccionada y solo necesitas origen, destino y mercancía. Con peso, medidas y fecha la tarifa sale más precisa.',
        },
      ],
    },
  },
  {
    slug: 'plataforma-40-pies',
    unit: 'planas-40',
    imageSlot: 'plataforma',
    short: "Planas 40' en adelante",
    name: 'Planas de 40 pies en adelante',
    kicker: 'Carga industrial',
    lengthLabel: '40 pies en adelante',
    summary:
      'Plataformas abiertas de 40 pies en adelante para carga industrial, materiales y maquinaria que se cargan por los costados o desde arriba. La longitud y configuración se confirman al cotizar.',
    idealFor: ['Acero y productos metálicos', 'Materiales de construcción', 'Maquinaria y equipo industrial', 'Estructuras dentro de medidas permitidas'],
    conditions: ['Sin sobredimensión ni sobrepeso.', 'Carga lateral o desde arriba, con montacargas o grúa.'],
    linkLabel: "Ver fletes en planas de 40' en adelante",
    page: {
      metaTitle: 'Planas de 40 Pies en Adelante en Guadalajara',
      description:
        'Transporte en planas de 40 pies en adelante desde Guadalajara para acero, materiales de construcción, maquinaria y carga industrial. Servicio spot, recurrente o dedicado.',
      breadcrumb: "Planas 40' en adelante",
      h1: 'Transporte en planas de 40 pies en adelante desde Guadalajara',
      lede: 'Fletes de carga industrial en plataformas abiertas de 40 pies en adelante, con salida desde la Zona Metropolitana de Guadalajara hacia el Pacífico, el Norte, el Bajío y otros destinos de México.',
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
          body: 'Con el peso, las medidas y la forma de la carga definimos la plana adecuada y confirmamos que viaje dentro de lo permitido.',
        },
        {
          title: 'Planeamos la maniobra',
          body: 'Acordamos cómo se carga y se descarga: por los costados o desde arriba, con montacargas o grúa, en origen y en destino.',
        },
        {
          title: 'Carga completa a destino',
          body: 'La plana viaja solo con tu embarque, de origen a destino.',
        },
        {
          title: 'Spot, recurrente o dedicado',
          body: 'Un viaje único, viajes con frecuencia fija o capacidad asignada por contrato, según tu operación.',
        },
      ],
      faqs: [
        {
          q: '¿De qué longitud son las planas?',
          a: 'Trabajamos con planas de 40 pies en adelante. La longitud y la configuración de la unidad se confirman al cotizar, según las medidas y el peso de tu carga.',
        },
        {
          q: '¿Cuánto peso lleva una plana?',
          a: 'Depende de la configuración de la unidad, de las dimensiones y el peso de la carga, y de las condiciones de la ruta. No publicamos una cifra única: te confirmamos el límite específico al cotizar.',
        },
        {
          q: '¿Mueven carga sobredimensionada?',
          a: 'No ofrecemos servicios de sobredimensión ni sobrepeso. La carga debe viajar dentro de las medidas y el peso permitidos.',
        },
      ],
    },
  },
];

export const equipmentBySlug = (slug: string) => equipment.find((e) => e.slug === slug);
