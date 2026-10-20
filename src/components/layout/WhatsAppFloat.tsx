import { whatsappLink } from '@/data/company';
import { Icon } from '@/components/ui/Icon';

/**
 * @description The site's only floating element, always visible (owner
 * decision 2026-10-20). Fixed bottom-right; content can pass under it while
 * scrolling, but no control ends up stuck beneath it.
 * @param message Prefilled WhatsApp text.
 */
export function WhatsAppFloat({ message }: { message: string }) {
  const href = whatsappLink(message);
  if (!href) return null;
  return (
    <a id="whatsapp-flotante" href={href} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-cta-place="flotante" className="whatsapp-float">
      <Icon name="whatsapp" className="h-7 w-7" />
      <span className="sr-only">Cotizar por WhatsApp (se abre en una ventana nueva)</span>
    </a>
  );
}
