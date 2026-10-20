import { company, contact, whatsappLink } from '@/data/company';
import { figures, hero } from '@/data/content';
import { equipment } from '@/data/equipment';
import { slotImages } from '@/data/imageManifest';
import { hasContactSection } from '@/data/navigation';
import { PhoneLink, QuoteButton } from '@/components/ui/Cta';
import { Icon } from '@/components/ui/Icon';
import { ArtDirectedPhoto } from '@/components/ui/Photo';
import { whatsappQuoteMessage } from '@/lib/quote';
import { EquipmentDiagram } from './EquipmentDiagram';

const heroDesktop = slotImages.hero;
const heroMobile = slotImages['hero-mobile'];
export const heroPhotos = heroDesktop && heroMobile ? { desktop: heroDesktop, mobile: heroMobile } : null;

/**
 * @description Dark teal hero: what CARMAG moves, with what, from where, and
 * how to ask for a rate. Primary CTA "Solicitar cotización", secondary
 * "Conocer servicios", then WhatsApp and phone as a quieter line. The photo
 * column falls back to the equipment diagrams when no hero photo exists.
 */
export function Hero() {
  const wa = whatsappLink(whatsappQuoteMessage);
  return (
    <section id="inicio" className="section pb-0" aria-labelledby="inicio-titulo">
      <div className="shell grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14">
        <div>
          <p className="eyebrow">{hero.overline}</p>
          <h1 id="inicio-titulo" className="display-hero mt-4">
            {hero.title}
          </h1>
          <p className="lede mt-6">{hero.lede}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {hasContactSection ? <QuoteButton place="hero" /> : null}
            <a id="hero-servicios" href="#servicios" className="btn btn-outline">
              Conocer servicios
            </a>
          </div>

          {wa || contact.phone ? (
            <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-gray-light">
              {wa ? (
                <a id="hero-whatsapp" href={wa} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-cta-place="hero" className="inline-flex min-h-11 items-center gap-2 font-semibold text-white">
                  <Icon name="whatsapp" className="h-[1.125rem] w-[1.125rem] text-whatsapp" />
                  Hablar por WhatsApp
                  <span className="sr-only"> (se abre en una ventana nueva)</span>
                </a>
              ) : null}
              <PhoneLink place="hero" prefix="o llama al" className="text-white" />
            </p>
          ) : null}

          <ul aria-label="Capacidades" className="mt-7 flex flex-wrap gap-2">
            {hero.chips.map((chip) => (
              <li key={chip} className="border border-teal-border bg-teal-surface px-3 py-1.5 text-[0.8125rem] font-semibold text-white">
                {chip}
              </li>
            ))}
          </ul>
        </div>

        {heroPhotos ? (
          <figure className="relative border-l-[6px] border-copper">
            <ArtDirectedPhoto desktop={heroPhotos.desktop} mobile={heroPhotos.mobile} />
            <figcaption className="absolute bottom-0 left-0 bg-teal/90 px-4 py-2.5 text-[0.8125rem] font-semibold text-white">
              Caja seca 53&prime; · Plataforma 40&prime; · Base en {company.baseCity}
            </figcaption>
          </figure>
        ) : (
          <div className="border-l-[6px] border-copper bg-teal-surface p-5 sm:p-7">
            <div className="spec-grid [--bg:var(--color-teal-surface)] sm:grid-cols-2">
              {equipment.map((item) => (
                <a key={item.slug} id={`hero-equipo-${item.slug}`} href={`/${item.slug}/`} className="group block p-4">
                  <EquipmentDiagram item={item} tone="dark" className="w-full" />
                  <p className="mt-3 text-lg font-extrabold text-white group-hover:text-copper-light">{item.name}</p>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="shell mt-14 pb-14 lg:mt-20 lg:pb-20">
        <dl aria-label="CARMAG en cifras" className="spec-grid grid-cols-2 lg:grid-cols-4">
          {figures.map((f) => (
            <div key={f.label} className="flex flex-col-reverse gap-1 px-5 py-6 lg:py-8">
              <dt className="label-tech">{f.label}</dt>
              <dd className="text-4xl font-black text-white lg:text-5xl">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
