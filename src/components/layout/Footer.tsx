import Link from 'next/link';
import { company, privacyNoticeReady } from '@/data/company';
import { equipment } from '@/data/equipment';
import { hasContactSection, navItems } from '@/data/navigation';
import { ContactList } from '@/components/ui/Cta';
import { Logo } from '@/components/ui/Logo';

/**
 * @description Footer: navigation, service pages, contact list (fixed order),
 * service area and the privacy link once the notice is publishable.
 */
export function Footer() {
  return (
    <footer id="pie" className="border-t-4 border-copper bg-teal text-mist">
      <div className="shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo className="h-10 w-auto" title={company.name} />
          <p className="mt-5 max-w-xs text-sm text-gray-light">
            {company.tagline}. Base en {company.baseCity}, {company.baseState}; servicio local, regional y nacional dentro de México.
          </p>
        </div>

        <nav aria-label="Secciones">
          <h2 className="label-tech">Secciones</h2>
          <ul className="mt-4 space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link id={`pie-${item.href.slice(2)}`} href={item.href} className="inline-flex min-h-9 items-center text-sm font-semibold text-white hover:text-copper-light">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Equipo">
          <h2 className="label-tech">Equipo</h2>
          <ul className="mt-4 space-y-1">
            {equipment.map((e) => (
              <li key={e.slug}>
                <Link id={`pie-${e.slug}`} href={`/${e.slug}/`} className="inline-flex min-h-9 items-center text-sm font-semibold text-white hover:text-copper-light">
                  {e.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {hasContactSection ? (
          <div>
            <h2 className="label-tech">Contacto</h2>
            <ContactList place="pie" className="mt-4" />
          </div>
        ) : null}
      </div>

      <div className="border-t border-teal-border">
        <div className="shell flex flex-col gap-2 py-6 text-xs text-gray-light sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.name}. Transporte de carga desde {company.baseCity}, {company.baseState}, México.
          </p>
          {privacyNoticeReady ? (
            <Link id="pie-aviso-privacidad" href="/aviso-de-privacidad/" className="font-semibold text-white underline underline-offset-4">
              Aviso de privacidad
            </Link>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
