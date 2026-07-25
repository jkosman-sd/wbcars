interface ArticleJsonLdProps {
  siteUrl: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string | null;
  slug: string;
  hubPath: string;
  hubLabel: string;
  authorName?: string;
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
  authorName = 'WB Cars',
}: ArticleJsonLdProps) => {
  const url = `${siteUrl}${hubPath}/${slug}`;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: title,
        description: excerpt,
        url,
        datePublished: publishedAt,
        dateModified: updatedAt || publishedAt,
        author: { '@type': 'Organization', name: authorName },
        publisher: { '@type': 'Organization', name: authorName },
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
