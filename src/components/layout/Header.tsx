'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { navItems } from '@/data/navigation';
import { PhoneLink, QuoteButton, WhatsAppCta } from '@/components/ui/Cta';
import { Icon } from '@/components/ui/Icon';
import { Logo } from '@/components/ui/Logo';

/**
 * @description Sticky header with a mobile drawer. The toggle owns
 * `aria-expanded`/`aria-controls`; the open drawer traps Tab, Escape closes it
 * and returns focus to the toggle, and background scroll is locked.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    drawerRef.current?.querySelector<HTMLElement>('a[href]')?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab') return;
      // The toggle sits outside the drawer but stays part of the trap, so the
      // menu can always be closed by keyboard.
      const focusable = [
        toggleRef.current,
        ...(drawerRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []),
      ].filter((el): el is HTMLElement => el !== null);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <header id="site-header" className="sticky top-0 z-50 border-b border-navy-border bg-navy/95 backdrop-blur-sm">
      <div className="shell flex h-[4.5rem] items-center justify-between gap-4">
        <Link id="header-logo" href="/" className="shrink-0 text-white" aria-label="CARMAG TRANSPORTS — inicio">
          <Logo className="h-8 w-auto sm:h-9" />
        </Link>

        <nav aria-label="Navegación principal" className="hidden lg:block">
          <ul className="flex items-center">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  id={`nav-${item.href.slice(2)}`}
                  href={item.href}
                  className="block px-2.5 py-2 text-[0.8125rem] font-semibold text-steel-light transition-colors hover:text-white xl:px-3.5"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          {/* `hidden` on a wrapper, not on PhoneLink: its own `inline-flex` would conflict. */}
          <span className="hidden xl:block">
            <PhoneLink place="header" className="text-sm text-white" />
          </span>
          <QuoteButton place="header" label="Cotizar" small className="hidden sm:inline-flex" />
          <button
            ref={toggleRef}
            id="menu-toggle"
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-movil"
            className="btn btn-ghost btn-sm w-11 px-0 lg:hidden"
          >
            <span className="sr-only">{open ? 'Cerrar menú' : 'Abrir menú'}</span>
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-5 w-5">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />}
            </svg>
          </button>
        </div>
      </div>

      <div ref={drawerRef} id="menu-movil" hidden={!open} className="h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-navy-border bg-navy lg:hidden">
        <nav aria-label="Navegación principal (móvil)" className="shell py-4">
          <ul>
            {navItems.map((item) => (
              <li key={item.href} className="border-b border-navy-border last:border-b-0">
                <Link
                  id={`nav-movil-${item.href.slice(2)}`}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[3.25rem] items-center justify-between font-semibold text-white"
                >
                  {item.label}
                  <Icon name="arrow" className="h-4 w-4 text-steel-light" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3">
            <WhatsAppCta place="menu-movil" label="Cotizar por WhatsApp" className="w-full" />
            <QuoteButton place="menu-movil" className="w-full" />
            <PhoneLink place="menu-movil" prefix="Llamar al" className="justify-center text-white" />
          </div>
        </nav>
      </div>
    </header>
  );
}
