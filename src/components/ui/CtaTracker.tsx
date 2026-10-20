'use client';

import { useEffect } from 'react';

type Zaraz = { track: (name: string, props: object) => void };

/**
 * @description One delegated click listener: every `[data-cta]` activation
 * dispatches a `carmag:cta` DOM event and calls Cloudflare Zaraz `cta_click`
 * (a no-op until Zaraz is enabled for the zone). Loads nothing itself.
 */
export function CtaTracker() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const trigger = event.target.closest<HTMLElement>('[data-cta]');
      if (!trigger) return;
      const detail = { cta: trigger.dataset.cta ?? 'desconocido', place: trigger.dataset.ctaPlace ?? 'desconocido' };
      document.dispatchEvent(new CustomEvent('carmag:cta', { detail }));
      (window as Window & { zaraz?: Zaraz }).zaraz?.track('cta_click', detail);
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
  return null;
}
