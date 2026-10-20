import { faqs, reasons, sectors, services, steps } from '@/data/content';
import { galleryImages, slotImages } from '@/data/imageManifest';
import { hasContactSection } from '@/data/navigation';
import { CtaGroup } from '@/components/ui/Cta';
import { Photo } from '@/components/ui/Photo';

/**
 * @description Overline + H2 with the short red rule.
 * @param id Id of the `h2`, referenced by the section's `aria-labelledby`.
 */
export function SectionHeading({ id, overline, title, className = '' }: { id: string; overline: string; title: string; className?: string }) {
  return (
    <div className={className}>
      <p className="overline">{overline}</p>
      <h2 id={id} className="display-2 rule-red mt-3 max-w-3xl">
        {title}
      </h2>
    </div>
  );
}

/** @description Services: one lead row, the rest as ruled columns (no cards). */
export function Services() {
  const [lead, ...rest] = services;
  const photo = slotImages.operacion;
  return (
    <section id="servicios" className="section" aria-labelledby="servicios-titulo">
      <div className="shell">
        <SectionHeading id="servicios-titulo" overline="Servicios" title="Fletes a la medida de tu operación" />

        {lead ? (
          <div className={`mt-12 grid gap-8 border-y border-navy-border py-8 ${photo ? 'lg:grid-cols-2 lg:items-center' : 'lg:grid-cols-[1fr_1.4fr]'}`}>
            <h3 className="display-3 text-white">{lead.title}</h3>
            <p className="text-lg text-mist">{lead.body}</p>
            {photo ? <Photo asset={photo} sizes="(min-width: 1024px) 36rem, 100vw" className="aspect-[3/2] w-full object-cover lg:col-start-2 lg:row-span-2 lg:row-start-1" /> : null}
          </div>
        ) : null}

        <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {rest.map((s) => (
            <div key={s.id} id={`servicio-${s.id}`} className="top-rule">
              <h3 className="text-base font-extrabold text-white">{s.title}</h3>
              <p className="mt-2 text-sm text-steel-light">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** @description Sectors in a ruled grid with the unit that usually fits. No client logos. */
export function Sectors() {
  return (
    <section id="sectores" className="band-light section" aria-labelledby="sectores-titulo">
      <div className="shell">
        <SectionHeading id="sectores-titulo" overline="Sectores" title="Sectores que atendemos" />
        <ul className="spec-grid mt-12 grid-cols-2 lg:grid-cols-4">
          {sectors.map((s) => (
            <li key={s.name} className="flex min-h-36 flex-col justify-between gap-4 p-4 sm:p-6">
              <span className="font-bold leading-snug">{s.name}</span>
              <span className="label-tech text-red">{s.fit}</span>
            </li>
          ))}
          <li className="flex min-h-36 flex-col justify-end bg-navy p-4 text-white sm:p-6">
            <span className="text-sm text-mist">¿Tu industria no aparece? Cuéntanos qué mueves y te decimos qué unidad conviene.</span>
          </li>
        </ul>
      </div>
    </section>
  );
}

/** @description Real CARMAG photos only; renders nothing until they exist. */
export function Gallery() {
  if (galleryImages.length === 0) return null;
  return (
    <section id="galeria" className="section border-t border-navy-border" aria-labelledby="galeria-titulo">
      <div className="shell">
        <SectionHeading id="galeria-titulo" overline="Operación" title="Unidades y maniobras CARMAG" />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((img) => (
            <li key={img.slug}>
              <figure>
                <Photo asset={img} sizes="(min-width: 1024px) 25rem, (min-width: 640px) 50vw, 100vw" className="aspect-[3/2] w-full object-cover" />
                {img.caption ? <figcaption className="mt-2 text-sm text-steel-light">{img.caption}</figcaption> : null}
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** @description "Por qué elegir CARMAG": six fact-backed operating advantages. */
export function Reasons() {
  return (
    <section id="nosotros" className="band-light section" aria-labelledby="nosotros-titulo">
      <div className="shell">
        <SectionHeading id="nosotros-titulo" overline="Nosotros" title="Por qué elegir CARMAG TRANSPORTS" />
        <ol className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <li key={r.title} className="top-rule">
              <span className="label-tech text-red">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-2 text-lg font-extrabold">{r.title}</h3>
              <p className="mt-2 text-steel-dark">{r.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** @description How quoting works, five short steps. */
export function Process() {
  return (
    <section id="como-cotizar" className="section" aria-labelledby="como-cotizar-titulo">
      <div className="shell">
        <SectionHeading id="como-cotizar-titulo" overline="Cotización" title="Cómo cotizar tu flete" />
        <ol className="spec-grid mt-12 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <li key={s.title} className="p-6">
              <span className="text-3xl font-black text-red-soft">{i + 1}</span>
              <h3 className="mt-3 text-base font-extrabold text-white">{s.title}</h3>
              <p className="mt-1.5 text-sm text-steel-light">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** @description FAQ as native `<details>`; no FAQPage schema (see StructuredData). */
export function Faq() {
  return (
    <section id="preguntas" className="section border-t border-navy-border" aria-labelledby="preguntas-titulo">
      <div className="shell grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <SectionHeading id="preguntas-titulo" overline="Preguntas frecuentes" title="Lo que preguntan quienes cotizan" />
        <div className="border-t border-navy-border">
          {faqs.map((f, i) => (
            <details key={f.q} id={`pregunta-${i + 1}`} className="group border-b border-navy-border">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 font-bold text-white [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden="true" className="text-xl text-red-soft transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="pb-5 text-mist">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/** @description Closing CTA; only when a contact channel is published. */
export function FinalCta() {
  if (!hasContactSection) return null;
  return (
    <section id="cta-final" className="band-light section" aria-labelledby="cta-final-titulo">
      <div className="shell flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 id="cta-final-titulo" className="display-2">
            ¿Tienes una carga por mover?
          </h2>
          <p className="mt-3 text-lg text-steel-dark">Envíanos origen, destino y tipo de carga, y te respondemos con tu tarifa.</p>
        </div>
        <CtaGroup place="cta-final" className="shrink-0" />
      </div>
    </section>
  );
}
