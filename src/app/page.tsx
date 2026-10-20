import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { HomeStructuredData } from '@/components/layout/StructuredData';
import { Hero, heroPhotos } from '@/components/home/Hero';
import { Equipment } from '@/components/home/Equipment';
import { Coverage } from '@/components/home/Coverage';
import { Contact } from '@/components/home/Contact';
import { Faq, FinalCta, Gallery, Process, Reasons, Sectors, Services } from '@/components/home/Sections';
import { HeroPreload } from '@/components/ui/Photo';
import { whatsappQuoteMessage } from '@/lib/quote';

const title = 'Transporte de Carga y Fletes en Guadalajara';
const description =
  'Transporte de carga y fletes desde Guadalajara a todo México. Caja seca de 53 pies, plataforma de 40 pies, carga industrial y servicio dedicado, recurrente o spot.';

export const metadata: Metadata = {
  title: { absolute: `${title} | CARMAG TRANSPORTS` },
  description,
  alternates: { canonical: '/' },
  openGraph: { title, description, url: '/' },
  twitter: { title, description },
};

/**
 * @description Home. Bands alternate teal and light:
 * hero + figures (teal) → equipo (paper) → servicios (teal) → sectores (paper)
 * → cobertura (teal) → nosotros (white) → galería (teal) → cómo cotizar
 * (paper) → cotiza tu transporte (teal) → preguntas (white) → CTA (copper).
 * Contact-dependent sections render only once a channel is published.
 */
export default function HomePage() {
  return (
    <>
      {heroPhotos ? <HeroPreload desktop={heroPhotos.desktop} mobile={heroPhotos.mobile} /> : null}
      <HomeStructuredData />
      <Header />
      <main id="contenido">
        <Hero />
        <Equipment />
        <Services />
        <Sectors />
        <Coverage />
        <Reasons />
        <Gallery />
        <Process />
        <Contact />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppFloat message={whatsappQuoteMessage} />
    </>
  );
}
