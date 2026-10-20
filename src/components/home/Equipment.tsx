import Link from 'next/link';
import { capacityDisclaimer } from '@/data/content';
import { equipment } from '@/data/equipment';
import { slotImages } from '@/data/imageManifest';
import { hasContactSection } from '@/data/navigation';
import { Icon } from '@/components/ui/Icon';
import { Photo } from '@/components/ui/Photo';
import { quoteHrefFor } from '@/lib/quote';
import { EquipmentDiagram } from './EquipmentDiagram';
import { SectionHeading } from './Sections';

/**
 * @description Short comparison of the two units, equal weight. Details live
 * on each equipment page. "Cotizar esta unidad" opens the form with the unit
 * preselected; it is outlined so it does not compete with the hero CTA.
 */
export function Equipment() {
  return (
    <section id="equipo" className="band-light band-paper section" aria-labelledby="equipo-titulo">
      <div className="shell">
        <SectionHeading id="equipo-titulo" overline="Equipo" title="Caja seca o plana: elige por tu carga" />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {equipment.map((item) => {
            const photo = slotImages[item.imageSlot];
            return (
              <article key={item.slug} id={`equipo-${item.slug}`} className="flex flex-col border border-paper-line bg-white">
                {photo ? (
                  <Photo asset={photo} sizes="(min-width: 1024px) 38rem, 100vw" className="aspect-[3/2] w-full object-cover" />
                ) : (
                  <div className="border-b border-paper-line bg-paper px-8 py-8">
                    <EquipmentDiagram item={item} className="mx-auto w-full max-w-md" />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <p className="eyebrow">{item.kicker}</p>
                  <h3 className="display-3 mt-2">{item.name}</h3>
                  <p className="mt-3 text-gray-dark">{item.summary}</p>

                  <h4 className="label-tech mt-6">Ideal para</h4>
                  <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
                    {item.idealFor.map((use) => (
                      <li key={use} className="flex gap-2 text-[0.9375rem]">
                        <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-copper" />
                        {use}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-5 space-y-1 text-sm text-gray-dark">
                    {item.conditions.map((c) => (
                      <li key={c} className="border-l-2 border-copper pl-3">
                        {c}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row sm:items-center sm:justify-between">
                    {hasContactSection ? (
                      <a id={`equipo-cotizar-${item.slug}`} href={quoteHrefFor(item.unit)} data-cta="cotizar" data-cta-place={`equipo-${item.slug}`} className="btn btn-outline btn-sm">
                        Cotizar esta unidad
                      </a>
                    ) : null}
                    <Link id={`equipo-link-${item.slug}`} href={`/${item.slug}/`} className="text-link inline-flex min-h-11 items-center gap-2 text-sm">
                      {item.linkLabel}
                      <Icon name="arrow" className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-6 border-l-2 border-gray pl-4 text-sm text-gray-dark">{capacityDisclaimer} Disponibilidad sujeta a confirmación.</p>
      </div>
    </section>
  );
}
