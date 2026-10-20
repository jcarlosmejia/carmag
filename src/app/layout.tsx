import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { company, isReviewBuild, siteUrl } from '@/data/company';
import { CtaTracker } from '@/components/ui/CtaTracker';
import { HashScroll } from '@/components/ui/HashScroll';
import './globals.css';

/**
 * Montserrat, the owner's chosen typeface, self-hosted (latin subset, variable
 * weight 100–900, 37 KB) so the build never fetches Google Fonts. The latin
 * subset covers every Spanish character.
 */
const montserrat = localFont({
  src: [{ path: './fonts/Montserrat-Variable-latin.woff2', weight: '100 900', style: 'normal' }],
  display: 'swap',
  variable: '--font-montserrat',
  fallback: ['system-ui', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
});

/**
 * Layout-level metadata holds only what every page shares. Each page sets its
 * own title, description and `alternates.canonical`: a canonical declared here
 * would be inherited by every child page.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: company.name, template: `%s | ${company.name}` },
  applicationName: company.name,
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    siteName: company.name,
    images: [{ url: '/brand/og-image.jpg', width: 1200, height: 630, alt: `${company.name} — ${company.tagline}` }],
  },
  twitter: { card: 'summary_large_image', images: ['/brand/og-image.jpg'] },
  robots: isReviewBuild ? { index: false, follow: false } : { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  icons: {
    icon: [
      { url: '/brand/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/brand/favicon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/brand/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/brand/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#123c3d',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

/**
 * @description Root layout: font, skip link, review banner, CTA tracker,
 * fragment scroll.
 * @param children Page content.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX" className={montserrat.variable}>
      <body>
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>
        {isReviewBuild ? (
          <p role="note" className="bg-copper px-4 py-2 text-center text-sm font-bold text-teal-ink">
            Vista de revisión: incluye datos de contacto sin confirmar. No publicar.
          </p>
        ) : null}
        {children}
        <CtaTracker />
        <HashScroll />
      </body>
    </html>
  );
}
