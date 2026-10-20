'use client';

import { useEffect } from 'react';

type Zaraz = { track: (name: string, props: object) => void };

/**
 * @description Emits one CTA event: a `carmag:cta` DOM event plus Cloudflare
 * Zaraz `cta_click` (a no-op until Zaraz is enabled). Only the CTA name and
 * its placement — never form data or message text.
 *
 * What the site can observe: a click on a link, or the form opening WhatsApp
 * (`cta: 'whatsapp-formulario'`). It cannot know whether the visitor sent the
 * message, so no event claims that.
 * @param cta Control name, e.g. `whatsapp`, `telefono`, `cotizar`.
 * @param place Placement id, e.g. `hero`.
 */
export function trackCta(cta: string, place: string) {
  const detail = { cta, place };
  document.dispatchEvent(new CustomEvent('carmag:cta', { detail }));
  (window as Window & { zaraz?: Zaraz }).zaraz?.track('cta_click', detail);
}

/**
 * @description One delegated click listener: every `[data-cta]` activation is
 * reported through `trackCta`. Loads nothing itself.
 */
export function CtaTracker() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const trigger = event.target.closest<HTMLElement>('[data-cta]');
      if (!trigger) return;
      trackCta(trigger.dataset.cta ?? 'desconocido', trigger.dataset.ctaPlace ?? 'desconocido');
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
  return null;
}
