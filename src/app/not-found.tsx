import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Página no encontrada',
  robots: { index: false, follow: true },
};

/** @description 404 page; Cloudflare serves it with a 404 status (`not_found_handling`). */
export default function NotFound() {
  return (
    <>
      <Header />
      <main id="contenido" className="section">
        <div className="shell max-w-2xl">
          <p className="eyebrow">Error 404</p>
          <h1 className="display-2 mt-3">Esta página no existe</h1>
          <p className="mt-4 text-mist">Puede que el enlace haya cambiado. Desde el inicio encuentras el equipo, la cobertura y cómo cotizar tu flete.</p>
          <Link id="volver-inicio" href="/" className="btn btn-primary mt-8">
            Ir al inicio
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
