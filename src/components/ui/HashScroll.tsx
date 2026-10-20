'use client';

import { useEffect } from 'react';

/**
 * @description Re-applies the URL fragment after hydration. Arriving from
 * another page at `/?unidad=…#cotizar` or `/#cobertura` left the view at the
 * top in testing; this scrolls the target into view once, instantly (no
 * animation, so `prefers-reduced-motion` is respected), and the header offset
 * comes from `scroll-padding-top` in globals.css.
 */
export function HashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' });
  }, []);
  return null;
}
