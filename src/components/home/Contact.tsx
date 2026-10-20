import { contact, quoteFormEnabled, whatsappLink } from '@/data/company';
import { hasContactSection } from '@/data/navigation';
import { Icon } from '@/components/ui/Icon';
import { quoteTemplateMailto, whatsappQuoteMessage } from '@/lib/quote';
import { QuoteForm } from './QuoteForm';
import { SectionHeading } from './Sections';

const CHECKLIST = ['Origen y destino', 'Tipo de carga', 'Peso aproximado', 'Dimensiones', 'Fecha de carga', "Unidad: caja seca 53' o plataforma 40'"];

/**
 * @description "Cotiza tu transporte" (#cotizar): the target of every
 * "Solicitar cotización" button. Three channel tiles in the fixed order
 * WhatsApp → teléfono → correo. The form appears beside them once
 * `quoteFormEnabled` (mailbox + published privacy notice).
 */
export function Contact() {
  if (!hasContactSection) return null;
  const wa = whatsappLink(whatsappQuoteMessage);

  return (
    <section id="cotizar" className="section" aria-labelledby="cotizar-titulo">
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div>
          <SectionHeading id="cotizar-titulo" overline="Cotización" title="Cotiza tu transporte" />
          <p className="mt-6 max-w-md text-mist">
            Escríbenos o llámanos con los datos de tu carga y te respondemos con la tarifa y las condiciones del servicio.
          </p>
          <h3 className="label-tech mt-8">Ten a la mano</h3>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {CHECKLIST.map((item) => (
              <li key={item} className="flex gap-2.5 text-[0.9375rem] text-white">
                <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-copper" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          {quoteFormEnabled ? (
            <div className="band-light border-l-[6px] border-copper bg-white p-5 sm:p-8">
              <h3 className="display-3">Formulario de cotización</h3>
              <p className="mt-2 mb-6 text-sm text-gray-dark">No guardamos tus datos en este sitio: la solicitud se envía desde tu propio correo.</p>
              <QuoteForm />
            </div>
          ) : null}

          {wa && contact.whatsapp ? (
            <div className="border-l-[6px] border-whatsapp bg-teal-surface p-6">
              <p className="label-tech">La forma más rápida</p>
              <p className="mt-1 text-lg font-extrabold text-white">WhatsApp {contact.whatsapp.display}</p>
              <a id="cotizar-whatsapp" href={wa} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-cta-place="cotizar" className="btn btn-whatsapp mt-4 w-full sm:w-auto">
                <Icon name="whatsapp" className="h-[1.125rem] w-[1.125rem]" />
                Hablar por WhatsApp
                <span className="sr-only"> (se abre en una ventana nueva)</span>
              </a>
            </div>
          ) : null}

          <div className="grid gap-4">
            {contact.phone ? (
              <div className="border-l-[6px] border-copper bg-teal-surface p-6">
                <p className="label-tech">Teléfono</p>
                <a id="cotizar-telefono" href={`tel:${contact.phone.tel}`} data-cta="telefono" data-cta-place="cotizar" className="mt-2 flex min-h-11 items-center gap-2 font-bold text-white">
                  <Icon name="phone" className="h-5 w-5 text-copper-light" />
                  {contact.phone.display}
                </a>
                {contact.phoneSecondary ? (
                  <a id="cotizar-telefono-alterno" href={`tel:${contact.phoneSecondary.tel}`} data-cta="telefono-alterno" data-cta-place="cotizar" className="flex min-h-11 items-center gap-2 text-sm font-semibold text-gray-light">
                    <Icon name="phone" className="h-4 w-4" />
                    {contact.phoneSecondary.display}
                  </a>
                ) : null}
              </div>
            ) : null}
            {contact.email ? (
              <div className="border-l-[6px] border-copper bg-teal-surface p-6">
                <p className="label-tech">Correo</p>
                <a id="cotizar-correo" href={quoteTemplateMailto(contact.email)} data-cta="correo" data-cta-place="cotizar" className="mt-2 flex min-h-11 items-center gap-2 font-bold break-words text-white">
                  <Icon name="mail" className="h-5 w-5 shrink-0 text-copper-light" />
                  {contact.email}
                </a>
                <p className="text-sm text-gray-light">Abre tu correo con una plantilla de cotización lista para llenar.</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
