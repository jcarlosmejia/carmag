import { company } from '@/data/company';
import { hero } from '@/data/content';
import { equipment } from '@/data/equipment';
import { slotImages } from '@/data/imageManifest';
import { hasContactSection } from '@/data/navigation';
import { PhoneLink, QuoteButton, WhatsAppCta } from '@/components/ui/Cta';
import { ArtDirectedPhoto } from '@/components/ui/Photo';
import { EquipmentDiagram } from './EquipmentDiagram';

const heroDesktop = slotImages.hero;
const heroMobile = slotImages['hero-mobile'];
export const heroPhotos = heroDesktop && heroMobile ? { desktop: heroDesktop, mobile: heroMobile } : null;

/**
 * @description Dark teal hero: what CARMAG moves, with what, from where, and
 * how to ask for a rate. "Solicitar cotización" first, WhatsApp directo as
 * the outlined alternative, the calls line as a plain link. The photo
 * column falls back to the equipment diagrams when no hero photo exists.
 */
export function Hero() {
  return (
    <section id="inicio" className="section" aria-labelledby="inicio-titulo">
      <div className="shell grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14">
        <div>
          <p className="eyebrow">{hero.overline}</p>
          <h1 id="inicio-titulo" className="display-hero mt-4">
            {hero.title}
          </h1>
          <p className="lede mt-6">{hero.lede}</p>

          {hasContactSection ? (
            <>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <QuoteButton place="hero" />
                <WhatsAppCta place="hero" />
              </div>
              <PhoneLink place="hero" prefix="Llamadas:" className="mt-3 text-white" />
            </>
          ) : null}
        </div>

        {heroPhotos ? (
          <figure className="relative border-l-[6px] border-copper">
            <ArtDirectedPhoto desktop={heroPhotos.desktop} mobile={heroPhotos.mobile} />
            <figcaption className="absolute bottom-0 left-0 bg-teal/90 px-4 py-2.5 text-[0.8125rem] font-semibold text-white">
              Caja seca 53&prime; · Planas de 40&prime; en adelante · Base en {company.baseCity}
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
    </section>
  );
}
