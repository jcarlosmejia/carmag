import coreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

/**
 * Flat config. `eslint-config-next` v16 exports flat-config arrays directly, so
 * no `FlatCompat` bridge is needed (and the bridge in fact crashes against this
 * version).
 */
const config = [
  ...coreWebVitals,
  ...nextTypescript,
  {
    ignores: ['out/**', '.next/**', 'node_modules/**', 'next-env.d.ts'],
  },
  {
    // The image pipeline and brand audit are Node scripts, not app code.
    files: ['scripts/**/*.mjs'],
    rules: {
      'no-console': 'off',
    },
  },
];

export default config;
