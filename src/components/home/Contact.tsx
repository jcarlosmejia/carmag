import { contact, whatsappLink } from '@/data/company';
import { hasContactSection } from '@/data/navigation';
import { Icon } from '@/components/ui/Icon';
import { quoteTemplateMailto, whatsappQuoteMessage } from '@/lib/quote';
import { QuoteForm } from './QuoteForm';
import { SectionHeading } from './Sections';

/**
 * @description "Cotiza tu transporte" (#cotizar), target of every
 * "Solicitar cotización" button. The form is the main action; direct WhatsApp,
 * calls and e-mail stay one step away for whoever prefers to talk. Each number
 * is labelled with its function: calls and WhatsApp are different lines.
 */
export function Contact() {
  if (!hasContactSection) return null;
  const wa = whatsappLink(whatsappQuoteMessage);

  return (
    <section id="cotizar" className="section" aria-labelledby="cotizar-titulo">
      {/* DOM order = phone order: heading, form (main action), alternatives. */}
      <div className="shell grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:grid-rows-[auto_1fr] lg:gap-x-14">
        <div className="lg:col-start-1 lg:row-start-1">
          <SectionHeading id="cotizar-titulo" overline="Cotización" title="Cotiza tu transporte" />
          <p className="mt-6 max-w-md text-mist">
            Captura origen, destino y mercancía. Con unidad, fecha, peso y medidas te respondemos más rápido con tarifa y condiciones.
          </p>
        </div>
        {contact.whatsapp ? (
          <div className="band-light border-l-[6px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start border-copper bg-white p-5 text-teal sm:p-8">
            <h3 className="display-3">Datos de tu carga</h3>
            <p className="mt-2 mb-6 text-sm text-gray-dark">No guardamos lo que escribes: el mensaje se arma en tu navegador y lo envías tú desde WhatsApp.</p>
            <QuoteForm />
          </div>
        ) : null}
        <div className="lg:col-start-1 lg:row-start-2">
          <h3 className="label-tech">¿Prefieres conversar?</h3>
          <dl className="mt-4 space-y-5">
            {wa && contact.whatsapp ? (
              <div>
                <dt className="label-tech">WhatsApp</dt>
                <dd>
                  <a id="cotizar-whatsapp" href={wa} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-cta-place="cotizar" className="inline-flex min-h-11 items-center gap-2 font-bold text-white">
                    <Icon name="whatsapp" className="h-5 w-5 text-whatsapp" />
                    {contact.whatsapp.display}
                    <span className="sr-only"> (abre WhatsApp en una ventana nueva)</span>
                  </a>
                </dd>
              </div>
            ) : null}
            {contact.phone ? (
              <div>
                <dt className="label-tech">Llamadas</dt>
                <dd>
                  <a id="cotizar-telefono" href={`tel:${contact.phone.tel}`} data-cta="telefono" data-cta-place="cotizar" className="inline-flex min-h-11 items-center gap-2 font-bold text-white">
                    <Icon name="phone" className="h-5 w-5 text-copper-light" />
                    {contact.phone.display}
                  </a>
                </dd>
              </div>
            ) : null}
            {contact.email ? (
              <div>
                <dt className="label-tech">Correo</dt>
                <dd>
                  <a id="cotizar-correo" href={quoteTemplateMailto(contact.email)} data-cta="correo" data-cta-place="cotizar" className="inline-flex min-h-11 items-center gap-2 font-bold break-words text-white">
                    <Icon name="mail" className="h-5 w-5 shrink-0 text-copper-light" />
                    {contact.email}
                  </a>
                </dd>
              </div>
            ) : null}
          </dl>
        </div>
      </div>
    </section>
  );
}
