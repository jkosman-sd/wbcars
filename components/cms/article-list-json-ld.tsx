interface ArticleListJsonLdProps {
  siteUrl: string;
  hubPath: string;
  hubLabel: string;
  articles: Array<{ title: string; slug: string }>;
}

export const ArticleListJsonLd = ({ siteUrl, hubPath, hubLabel, articles }: ArticleListJsonLdProps) => {
  const url = `${siteUrl}${hubPath}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    url,
    name: hubLabel,
    inLanguage: 'pl',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: articles.map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${url}/${article.slug}`,
        name: article.title,
      })),
    },
  };

  return <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
};
