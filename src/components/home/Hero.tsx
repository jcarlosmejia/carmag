import { company } from '@/data/company';
import { figures, hero } from '@/data/content';
import { equipment } from '@/data/equipment';
import { slotImages } from '@/data/imageManifest';
import { hasContactSection } from '@/data/navigation';
import { CtaGroup } from '@/components/ui/Cta';
import { ArtDirectedPhoto } from '@/components/ui/Photo';
import { EquipmentDiagram } from './EquipmentDiagram';

const heroDesktop = slotImages.hero;
const heroMobile = slotImages['hero-mobile'];
export const heroPhotos = heroDesktop && heroMobile ? { desktop: heroDesktop, mobile: heroMobile } : null;

/**
 * @description Dark hero: what CARMAG moves, with what, from where, and how to
 * ask for a rate. Right column is a framed photo once one exists; until then a
 * ruled spec sheet gives both units equal weight. Figures strip closes it.
 */
export function Hero() {
  return (
    <section id="inicio" className="section pb-0" aria-labelledby="inicio-titulo">
      <div className="shell grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
        <div>
          <p className="overline">{hero.overline}</p>
          <h1 id="inicio-titulo" className="display-hero mt-4">
            {hero.title}
          </h1>
          <p className="lede mt-6">{hero.lede}</p>

          {hasContactSection ? (
            <CtaGroup place="hero" className="mt-8" />
          ) : (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a id="hero-ver-equipo" href="#equipo" className="btn btn-primary">
                Conocer el equipo
              </a>
              <a id="hero-ver-cobertura" href="#cobertura" className="btn btn-outline">
                Ver cobertura
              </a>
            </div>
          )}

          <ul aria-label="Capacidades" className="mt-8 flex flex-wrap gap-2">
            {hero.chips.map((chip) => (
              <li key={chip} className="border border-navy-border bg-navy-surface px-3 py-1.5 text-[0.8125rem] font-semibold text-white">
                {chip}
              </li>
            ))}
          </ul>
        </div>

        {heroPhotos ? (
          <figure className="cut-frame overflow-hidden">
            <ArtDirectedPhoto desktop={heroPhotos.desktop} mobile={heroPhotos.mobile} />
          </figure>
        ) : (
          <div className="cut-frame bg-navy-surface p-5 sm:p-7">
            <p className="label-tech">Equipo disponible</p>
            <div className="spec-grid mt-4 [--bg:var(--color-navy-surface)] sm:grid-cols-2">
              {equipment.map((item) => (
                <a key={item.slug} id={`hero-equipo-${item.slug}`} href={`/${item.slug}/`} className="group block p-4">
                  <EquipmentDiagram item={item} tone="dark" className="w-full" />
                  <p className="mt-3 text-lg font-extrabold text-white group-hover:text-red-soft">{item.name}</p>
                  <p className="mt-1 text-sm text-steel-light">{item.kicker}</p>
                </a>
              ))}
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="label-tech">Base</dt>
                <dd className="mt-1 font-semibold text-white">
                  {company.baseCity}, {company.baseState}
                </dd>
              </div>
              <div>
                <dt className="label-tech">Corredores</dt>
                <dd className="mt-1 font-semibold text-white">Pacífico · Norte · Bajío</dd>
              </div>
            </dl>
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
