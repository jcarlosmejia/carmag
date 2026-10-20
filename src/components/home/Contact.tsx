import { quoteFormEnabled } from '@/data/company';
import { hasContactSection } from '@/data/navigation';
import { ContactList, EmailCta, WhatsAppCta } from '@/components/ui/Cta';
import { QuoteForm } from './QuoteForm';
import { SectionHeading } from './Sections';

/**
 * @description Contact channels plus the quote form. Renders only when at
 * least one channel is published; the form needs a mailbox and, in production,
 * a published privacy notice (`quoteFormEnabled`).
 */
export function Contact() {
  if (!hasContactSection) return null;
  return (
    <section id="contacto" className="band-light section" aria-labelledby="contacto-titulo">
      <div className={`shell grid gap-12 ${quoteFormEnabled ? 'lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]' : ''}`}>
        <div>
          <SectionHeading id="contacto-titulo" overline="Contacto" title="Solicita tu tarifa" />
          <p className="mt-6 max-w-md text-steel-dark">
            Envíanos origen, destino y tipo de carga. Con peso, dimensiones y fecha de carga, la tarifa sale más rápido y más precisa.
          </p>
          <ContactList place="contacto" className="mt-8" />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-start">
            <WhatsAppCta place="contacto" label="Cotizar por WhatsApp" />
            <EmailCta place="contacto" />
          </div>
        </div>

        {quoteFormEnabled ? (
          <div id="cotizar" className="border border-paper-line bg-white p-5 sm:p-8">
            <h3 className="display-3">Cotizar mi flete</h3>
            <p className="mt-2 mb-6 text-sm text-steel-dark">No guardamos tus datos en este sitio: la solicitud se envía desde tu propio correo.</p>
            <QuoteForm />
          </div>
        ) : null}
      </div>
    </section>
  );
}
