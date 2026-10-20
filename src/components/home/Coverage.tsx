import { coverage, corridors } from '@/data/content';
import { WhatsAppCta } from '@/components/ui/Cta';
import { MexicoMap } from './MexicoMap';
import { SectionHeading } from './Sections';

/**
 * @description Coverage: map in the wide column, each corridor as an `h3` with
 * its states and destinations in real HTML (the crawlable, screen-reader and
 * phone equivalent of the map). Framed as service corridors subject to
 * availability, never as the only places CARMAG goes.
 */
export function Coverage() {
  return (
    <section id="cobertura" className="section" aria-labelledby="cobertura-titulo">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-[1fr_minmax(0,28rem)] lg:items-end lg:gap-16">
          <SectionHeading id="cobertura-titulo" overline="Corredores de servicio y cobertura nacional" title={coverage.title} />
          <p className="text-mist">{coverage.body}</p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-14">
          <div>
            <MexicoMap className="w-full" />
            <ul aria-label="Leyenda del mapa" className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[0.8125rem] font-semibold text-mist">
              <li className="flex items-center gap-2">
                <span aria-hidden="true" className="h-3.5 w-3.5 rounded-full border-2 border-white bg-red" />
                Base operativa · Guadalajara
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true" className="w-7 border-t-[3px] border-dashed border-red-soft" />
                Corredores de servicio
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true" className="h-3.5 w-5 border border-steel-light bg-navy-raised" />
                Cobertura nacional bajo cotización
              </li>
            </ul>
          </div>

          <div>
            <ul className="divide-y divide-navy-border border-y border-navy-border">
              {corridors.map((c) => (
                <li key={c.id} id={`corredor-${c.id}`} className="py-5">
                  <h3 className="text-base font-extrabold uppercase tracking-[0.06em] text-white">{c.name}</h3>
                  <p className="mt-0.5 text-xs font-semibold text-red-soft">{c.states}</p>
                  <p className="mt-2 text-[0.9375rem] text-mist">Guadalajara → {c.stops.map((s) => s.name).join(' · ')}</p>
                  <p className="mt-1.5 text-sm text-steel-light">{c.summary}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 border-l-2 border-red-soft pl-4 text-sm text-steel-light">{coverage.note}</p>
            <WhatsAppCta place="cobertura" label="Cotizar mi ruta por WhatsApp" small className="mt-6" />
          </div>
        </div>
      </div>
    </section>
  );
}
