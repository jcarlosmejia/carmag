'use client';

import { useEffect, useState } from 'react';
import { whatsappLink } from '@/data/company';
import { Icon } from '@/components/ui/Icon';

/**
 * @description The site's only floating element. Hidden while the hero, the
 * quote form or the final CTA is on screen: each has its own WhatsApp link,
 * and on narrow phones the float would otherwise cover those controls.
 * @param message Prefilled WhatsApp text.
 */
export function WhatsAppFloat({ message }: { message: string }) {
  const [hidden, setHidden] = useState(false);
  const href = whatsappLink(message);

  useEffect(() => {
    const targets = ['inicio', 'servicio-inicio', 'cotizar', 'cta-final'].map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    if (!targets.length || typeof IntersectionObserver === 'undefined') return;
    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
      }
      setHidden(visible.size > 0);
    });
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  if (!href) return null;
  return (
    <a
      id="whatsapp-flotante"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cta="whatsapp"
      data-cta-place="flotante"
      data-hidden={hidden}
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      className="whatsapp-float"
    >
      <Icon name="whatsapp" className="h-7 w-7" />
      <span className="sr-only">Cotizar por WhatsApp (se abre en una ventana nueva)</span>
    </a>
  );
}
