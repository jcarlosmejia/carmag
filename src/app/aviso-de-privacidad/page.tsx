import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { company, privacyNoticeReady, privacyResponsible } from '@/data/company';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Aviso de privacidad',
  description: `Aviso de privacidad de ${company.name}: qué datos recibimos al solicitar una cotización, para qué los usamos y cómo ejercer tus derechos ARCO.`,
  alternates: { canonical: '/aviso-de-privacidad/' },
};

/**
 * @description Privacy notice (LFPDPPP). Published only when the responsible
 * party's legal name, address and mailbox are all confirmed
 * (`privacyNoticeReady`); otherwise the route is a 404 and nothing links to it.
 * The analytics paragraph must match what is actually enabled.
 */
export default function PrivacyPage() {
  if (!privacyNoticeReady) notFound();
  const { legalName, address, email } = privacyResponsible;

  return (
    <>
      <Header />
      <main id="contenido" className="band-light section">
        <article className="shell max-w-3xl space-y-6 text-gray-dark [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:text-teal">
          <h1 className="display-2 text-teal">Aviso de privacidad</h1>
          <p>
            <strong className="text-teal">{legalName}</strong>, que opera la marca {company.name}, con domicilio en {address}, es responsable del
            tratamiento de los datos personales que nos proporcionas, conforme a la Ley Federal de Protección de Datos Personales en Posesión de los
            Particulares.
          </p>

          <h2>Datos que recibimos</h2>
          <p>
            Este sitio no almacena datos. Cuando solicitas una cotización, el formulario abre tu propio programa de correo con la solicitud y tú decides
            enviarla. Si nos escribes, recibimos los datos que incluyas: nombre, teléfono y, si los agregas, empresa, correo electrónico y los datos de la
            carga (origen, destino, tipo, peso, dimensiones y fecha). Lo mismo aplica si nos contactas por WhatsApp o por teléfono.
          </p>

          <h2>Para qué los usamos</h2>
          <p>Para preparar y enviarte la cotización que solicitas, darle seguimiento y, si la aceptas, programar y prestar el servicio de transporte.</p>

          <h2>Transferencias</h2>
          <p>No vendemos ni compartimos tus datos con terceros, salvo cuando una autoridad competente lo requiera conforme a la ley.</p>

          <h2>Medición del sitio</h2>
          <p>
            Usamos Cloudflare Web Analytics, que no usa cookies ni identifica a los visitantes. Mide de forma agregada las páginas visitadas, la página
            de procedencia, el tipo de dispositivo y navegador, y el país de la visita, para saber qué contenido es útil.
          </p>

          <h2>Derechos ARCO</h2>
          <p>
            Puedes solicitar el acceso, la rectificación, la cancelación u oposición al uso de tus datos, o revocar tu consentimiento, escribiendo a{' '}
            <a id="aviso-correo" href={`mailto:${email}`} className="text-link">
              {email}
            </a>
            . Te responderemos en los plazos que establece la ley.
          </p>

          <h2>Cambios a este aviso</h2>
          <p>Cualquier cambio a este aviso se publicará en esta misma página.</p>
        </article>
      </main>
      <Footer />
    </>
  );
}
