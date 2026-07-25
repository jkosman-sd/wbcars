interface OrganizationJsonLdProps {
  siteUrl: string;
  name: string;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  nip?: string | null;
  openingHours?: {
    days: string;
    from: string;
    to: string;
  } | null;
  sameAs?: string[];
}

// Godziny otwarcia są dziś takie same od poniedziałku do piątku — jeśli to się zmieni
// (np. dojdzie sobota), openingHoursSpecification poniżej trzeba będzie rozbić na kilka wpisów.
const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export const organizationId = (siteUrl: string) => `${siteUrl}/#organization`;

export const OrganizationJsonLd = ({
  siteUrl,
  name,
  phone,
  email,
  address,
  nip,
  openingHours,
  sameAs,
}: OrganizationJsonLdProps) => {
  const logoUrl = `${siteUrl}/images/wb-cars-logo.svg`;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AutomotiveBusiness',
        '@id': organizationId(siteUrl),
        name,
        url: siteUrl,
        image: logoUrl,
        logo: logoUrl,
        priceRange: '$$',
        areaServed: 'Tarnów',
        ...(phone && { telephone: phone }),
        ...(email && { email }),
        ...(address && { address }),
        ...(nip && { vatID: nip }),
        ...(sameAs && sameAs.length > 0 && { sameAs }),
        ...(openingHours?.from &&
          openingHours?.to && {
            openingHoursSpecification: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: WEEKDAYS,
              opens: openingHours.from,
              closes: openingHours.to,
            },
          }),
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name,
        inLanguage: 'pl',
        publisher: { '@id': organizationId(siteUrl) },
      },
    ],
  };

  return <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
};
