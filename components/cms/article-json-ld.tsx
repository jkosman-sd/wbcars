import { organizationId } from './organization-json-ld';

interface ArticleJsonLdProps {
  siteUrl: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string | null;
  slug: string;
  hubPath: string;
  hubLabel: string;
  image?: string | null;
}

export const ArticleJsonLd = ({
  siteUrl,
  title,
  excerpt,
  publishedAt,
  updatedAt,
  slug,
  hubPath,
  hubLabel,
  image,
}: ArticleJsonLdProps) => {
  const url = `${siteUrl}${hubPath}/${slug}`;
  const orgRef = { '@id': organizationId(siteUrl) };

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: title,
        description: excerpt,
        url,
        mainEntityOfPage: url,
        inLanguage: 'pl',
        datePublished: publishedAt,
        dateModified: updatedAt || publishedAt,
        ...(image && { image }),
        author: orgRef,
        publisher: {
          '@type': 'Organization',
          ...orgRef,
          logo: { '@type': 'ImageObject', url: `${siteUrl}/images/wb-cars-logo.svg` },
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Strona główna', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: hubLabel, item: `${siteUrl}${hubPath}` },
          { '@type': 'ListItem', position: 3, name: title, item: url },
        ],
      },
    ],
  };

  return <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
};
