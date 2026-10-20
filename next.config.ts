import type { NextConfig } from 'next';

/**
 * CARMAG TRANSPORTS — pure static export, served by a Cloudflare Workers
 * static-assets project (see wrangler.jsonc). `next build` writes `out/`.
 *
 * `images.unoptimized` is required under static export; photos are served
 * from pre-built renditions instead (src/components/ui/Photo.tsx,
 * scripts/build-images.mjs).
 */
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
};

export default nextConfig;
