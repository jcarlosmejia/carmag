import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { capacityDisclaimer, corridors } from '@/data/content';
import { equipment, equipmentBySlug } from '@/data/equipment';
import { slotImages } from '@/data/imageManifest';
import { hasContactSection } from '@/data/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { ServiceStructuredData } from '@/components/layout/StructuredData';
import { EquipmentDiagram } from '@/components/home/EquipmentDiagram';
import { CtaGroup } from '@/components/ui/Cta';
import { Icon } from '@/components/ui/Icon';
import { Photo } from '@/components/ui/Photo';

type Props = { params: Promise<{ servicio: string }> };

export const dynamicParams = false;

/** One static page per equipment entry. */
export function generateStaticParams() {
  return equipment.map((e) => ({ servicio: e.slug }));
}

/** Per-page title, description and its own canonical. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = equipmentBySlug((await params).servicio);
  if (!item) return {};
  const path = `/${item.slug}/`;
  return {
    title: item.page.metaTitle,
    description: item.page.description,
    alternates: { canonical: path },
    openGraph: { title: item.page.metaTitle, description: item.page.description, url: path },
    twitter: { title: item.page.metaTitle, description: item.page.description },
  };
}

/**
 * @description Equipment service page (`/caja-seca-53-pies/`, `/plataforma-40-pies/`).
 */
export default async function ServicePage({ params }: Props) {
  const item = equipmentBySlug((await params).servicio);
  if (!item) notFound();
  const other = equipment.find((e) => e.slug !== item.slug)!;
  const photo = slotImages[item.imageSlot];

  return (
    <>
      <ServiceStructuredData item={item} />
      <Header />
      <main id="contenido">
        <section className="section" aria-labelledby="servicio-titulo">
          <div className="shell">
            <nav aria-label="Ruta de navegación">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-light">
                <li>
                  <Link id="migas-inicio" href="/" className="hover:text-white">
                    Inicio
                  </Link>
                </li>
                <li aria-hidden="true">›</li>
                <li>
                  <Link id="migas-equipo" href="/#equipo" className="hover:text-white">
                    Equipo
                  </Link>
                </li>
                <li aria-hidden="true">›</li>
                <li aria-current="page" className="font-semibold text-white">
                  {item.page.breadcrumb}
                </li>
              </ol>
            </nav>

            <div className="mt-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <div>
                <p className="eyebrow">{item.kicker}</p>
                <h1 id="servicio-titulo" className="display-hero mt-4">
                  {item.page.h1}
                </h1>
                <p className="lede mt-6">{item.page.lede}</p>
                <CtaGroup place={`pagina-${item.slug}`} whatsappMessage={item.whatsappMessage} className="mt-8" />
              </div>
              {photo ? (
                <figure className="border-l-[6px] border-copper">
                  <Photo asset={photo} sizes="(min-width: 1024px) 38rem, 100vw" priority className="aspect-[3/2] w-full object-cover" />
                </figure>
              ) : (
                <div className="border-l-[6px] border-copper bg-teal-surface p-8 sm:p-12">
                  <EquipmentDiagram item={item} tone="dark" className="w-full" />
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="band-light section" aria-labelledby="que-movemos">
          <div className="shell grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <h2 id="que-movemos" className="display-2 rule-copper">
                Qué movemos
              </h2>
              <ul className="mt-8 space-y-3">
                {item.page.whatWeMove.map((x) => (
                  <li key={x} className="flex gap-2.5">
                    <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-copper" />
                    {x}
                  </li>
                ))}
              </ul>
              <p className="mt-8 border-l-2 border-gray pl-4 text-sm text-gray-dark">{capacityDisclaimer}</p>
            </div>
            <div>
              <h2 className="display-2 rule-copper">Cómo operamos</h2>
              <div className="spec-grid mt-8 sm:grid-cols-2">
                {item.page.howWeOperate.map((b) => (
                  <div key={b.title} className="p-6">
                    <h3 className="text-base font-extrabold">{b.title}</h3>
                    <p className="mt-2 text-sm text-gray-dark">{b.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="corredores">
          <div className="shell">
            <h2 id="corredores" className="display-2 rule-copper">
              Corredores desde Guadalajara
            </h2>
            <ul className="mt-10 grid gap-8 lg:grid-cols-3">
              {corridors.map((c) => (
                <li key={c.id} className="top-rule">
                  <h3 className="text-base font-extrabold text-white">{c.name}</h3>
                  <p className="mt-0.5 text-xs font-semibold text-copper-light">{c.states}</p>
                  <p className="mt-2 text-sm text-mist">{c.stops.map((s) => s.name).join(' · ')}</p>
                </li>
              ))}
            </ul>
            <Link id={`servicio-mapa-${item.slug}`} href="/#cobertura" className="text-link mt-10 inline-flex min-h-11 items-center gap-2">
              Ver el mapa de cobertura de fletes desde Guadalajara
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="band-light section" aria-labelledby="preguntas-servicio">
          <div className="shell grid gap-10 lg:grid-cols-[1fr_1.6fr]">
            <h2 id="preguntas-servicio" className="display-2 rule-copper">
              Preguntas sobre {item.short.toLowerCase()}
            </h2>
            <dl className="border-t border-paper-line">
              {item.page.faqs.map((f) => (
                <div key={f.q} className="border-b border-paper-line py-5">
                  <dt className="font-bold">{f.q}</dt>
                  <dd className="mt-2 text-gray-dark">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="cta-final" className="section" aria-labelledby="otra-unidad">
          <div className="shell grid gap-10 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="eyebrow">También ofrecemos</p>
              <h2 id="otra-unidad" className="display-2 mt-3">
                {other.name}
              </h2>
              <p className="mt-3 text-mist">{other.summary}</p>
              <Link id={`cruce-${other.slug}`} href={`/${other.slug}/`} className="text-link mt-6 inline-flex min-h-11 items-center gap-2">
                {other.linkLabel}
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
            {hasContactSection ? (
              <div className="lg:justify-self-end">
                <p className="display-3 text-white">¿Tienes una carga por mover?</p>
                <CtaGroup place={`cierre-${item.slug}`} whatsappMessage={item.whatsappMessage} className="mt-5" />
              </div>
            ) : null}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat message={item.whatsappMessage} />
    </>
  );
}
