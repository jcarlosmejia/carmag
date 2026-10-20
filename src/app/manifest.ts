import type { MetadataRoute } from 'next';
import { company } from '@/data/company';

/** Required for metadata routes under `output: 'export'`. */
export const dynamic = 'force-static';

/** @description Web app manifest. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: company.name,
    short_name: 'CARMAG',
    description: company.valueProposition,
    start_url: '/',
    display: 'browser',
    background_color: '#071b2e',
    theme_color: '#071b2e',
    lang: 'es-MX',
    icons: [
      { src: '/brand/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/brand/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
