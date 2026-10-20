import { company, contact, siteUrl, socialProfiles } from '@/data/company';
import { corridors, services } from '@/data/content';
import type { Equipment } from '@/data/equipment';

const orgId = `${siteUrl}/#organizacion`;

/**
 * Serialised from typed constants only — no user input reaches this. `<` is
 * escaped anyway so no string can close the script element.
 */
function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}

/**
 * @description Home JSON-LD: WebSite, Organization and Service nodes. Only
 * visible, confirmed facts. Organization (not LocalBusiness) because there is
 * no confirmed street address; the address is city-level. No FAQPage, ratings,
 * reviews or `sameAs` until real profiles exist. Contact points appear only
 * once each channel is published.
 */
export function HomeStructuredData() {
  const organization: Record<string, unknown> = {
    '@type': 'Organization',
    '@id': orgId,
    name: company.name,
    alternateName: company.alternateNames,
    url: `${siteUrl}/`,
    logo: `${siteUrl}/brand/carmag-transports-logo-512.png`,
    image: `${siteUrl}/brand/og-image.jpg`,
    description: company.valueProposition,
    address: { '@type': 'PostalAddress', addressLocality: company.baseCity, addressRegion: company.baseState, addressCountry: 'MX' },
    areaServed: [
      { '@type': 'Country', name: 'México' },
      ...corridors.flatMap((c) => c.stops.map((s) => ({ '@type': 'City', name: s.name }))),
    ],
  };
  if (contact.email) organization.email = contact.email;
  if (contact.phone) organization.telephone = contact.phone.tel;
  const points = [
    contact.phone && { telephone: contact.phone.tel, description: 'Teléfono principal' },
    contact.phoneSecondary && { telephone: contact.phoneSecondary.tel, description: 'Teléfono secundario' },
    contact.whatsapp && { telephone: `+${contact.whatsapp.digits}`, description: 'WhatsApp' },
  ].filter((p) => !!p);
  if (points.length) {
    organization.contactPoint = points.map((p) => ({ '@type': 'ContactPoint', contactType: 'sales', areaServed: 'MX', availableLanguage: 'es', ...p }));
  }
  if (socialProfiles.length) organization.sameAs = socialProfiles.map((p) => p.url);

  const graph = [
    { '@type': 'WebSite', '@id': `${siteUrl}/#sitio`, url: `${siteUrl}/`, name: company.name, inLanguage: 'es-MX', publisher: { '@id': orgId } },
    organization,
    ...services.map((s) => ({
      '@type': 'Service',
      name: s.title,
      description: s.body,
      provider: { '@id': orgId },
      areaServed: { '@type': 'Country', name: 'México' },
    })),
  ];
  return <JsonLd data={{ '@context': 'https://schema.org', '@graph': graph }} />;
}

/**
 * @description Service page JSON-LD: the Service node and its BreadcrumbList.
 * @param item Equipment entry the page describes.
 */
export function ServiceStructuredData({ item }: { item: Equipment }) {
  const url = `${siteUrl}/${item.slug}/`;
  const graph = [
    {
      '@type': 'Service',
      '@id': `${url}#servicio`,
      name: item.page.h1,
      serviceType: item.name,
      description: item.page.description,
      url,
      provider: { '@type': 'Organization', '@id': orgId, name: company.name, url: `${siteUrl}/` },
      areaServed: { '@type': 'Country', name: 'México' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: 'Equipo', item: `${siteUrl}/#equipo` },
        { '@type': 'ListItem', position: 3, name: item.page.breadcrumb, item: url },
      ],
    },
  ];
  return <JsonLd data={{ '@context': 'https://schema.org', '@graph': graph }} />;
}
