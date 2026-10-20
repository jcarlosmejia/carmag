import { faqs, modalities, reasons, serviceNotes } from '@/data/content';
import { galleryImages } from '@/data/imageManifest';
import { hasContactSection } from '@/data/navigation';
import { ContactList } from '@/components/ui/Cta';
import { Photo } from '@/components/ui/Photo';

/**
 * @description Eyebrow + H2 with the short copper rule.
 * @param id Id of the `h2`, referenced by the section's `aria-labelledby`.
 */
export function SectionHeading({ id, overline, title, className = '' }: { id: string; overline: string; title: string; className?: string }) {
  return (
    <div className={className}>
      <p className="eyebrow">{overline}</p>
      <h2 id={id} className="display-2 rule-copper mt-3 max-w-3xl">
        {title}
      </h2>
    </div>
  );
}

/**
 * @description Modalidades: the three operating models as columns, then the
 * conditions that apply to all of them (FTL, return loads, reach).
 */
export function Services() {
  return (
    <section id="servicios" className="section" aria-labelledby="servicios-titulo">
      <div className="shell">
        <SectionHeading id="servicios-titulo" overline="Modalidades" title="Spot, recurrente o dedicado" />
        <div className="mt-12 grid gap-x-8 gap-y-10 md:grid-cols-3">
          {modalities.map((m) => (
            <div key={m.id} id={`servicio-${m.id}`} className="top-rule">
              <h3 className="display-3 text-white">{m.title}</h3>
              <p className="mt-3 text-mist">{m.body}</p>
            </div>
          ))}
        </div>
        <dl className="spec-grid mt-12 md:grid-cols-3">
          {serviceNotes.map((n) => (
            <div key={n.id} id={`servicio-${n.id}`} className="p-5">
              <dt className="font-extrabold text-white">{n.title}</dt>
              <dd className="mt-1.5 text-sm text-gray-light">{n.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/**
 * @description Operación y diferenciadores: company-owned photos as visual
 * evidence of operation, beside differentiators the visitor can check. No
 * captions claim ownership of a unit, capacities or features.
 */
export function Evidence() {
  return (
    <section id="nosotros" className="band-light section" aria-labelledby="nosotros-titulo">
      <div className="shell">
        <SectionHeading id="nosotros-titulo" overline="Nosotros" title="Operación y lo que puedes verificar" />
        {galleryImages.length ? (
          <ul className="mt-12 grid gap-4 sm:grid-cols-3">
            {galleryImages.map((img) => (
              <li key={img.slug}>
                <figure>
                  <Photo asset={img} sizes="(min-width: 1024px) 25rem, (min-width: 640px) 33vw, 100vw" className="aspect-[3/2] w-full object-cover" />
                  {img.caption ? <figcaption className="mt-2 text-sm text-gray-dark">{img.caption}</figcaption> : null}
                </figure>
              </li>
            ))}
          </ul>
        ) : null}
        <ul className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r) => (
            <li key={r.title} className="top-rule">
              <h3 className="text-lg font-extrabold">{r.title}</h3>
              <p className="mt-2 text-gray-dark">{r.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * @description FAQ (open by default: no essential information hidden behind a
 * toggle) with the contact list beside it. No FAQPage schema.
 */
export function Faq() {
  return (
    <section id="preguntas" className="band-light section" aria-labelledby="preguntas-titulo">
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,0.9fr)]">
        <div>
          <SectionHeading id="preguntas-titulo" overline="Preguntas frecuentes" title="Lo que preguntan quienes cotizan" />
          <dl className="mt-10 border-t border-paper-line">
            {faqs.map((f, i) => (
              <div key={f.q} id={`pregunta-${i + 1}`} className="border-b border-paper-line py-5">
                <dt className="font-bold">{f.q}</dt>
                <dd className="mt-2 text-gray-dark">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
        {hasContactSection ? (
          <aside aria-labelledby="contacto-titulo" className="self-start border-l-[6px] border-copper bg-paper p-6 [--accent:var(--color-copper-deep)] lg:sticky lg:top-24">
            <h2 id="contacto-titulo" className="display-3">
              Contacto
            </h2>
            <ContactList place="preguntas" className="mt-5" />
          </aside>
        ) : null}
      </div>
    </section>
  );
}
