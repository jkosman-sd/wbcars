import { getSettings } from '@/sanity/lib/get-settings';
import { getSiteUrl } from '@/sanity/lib/get-site-url';
import { getClient } from '@/sanity/sanity.client';
import { articlesByTypeQuery } from '@/sanity/schemas/articles/article.queries';
import type { ArticlesByTypeQueryResult } from '@/sanity/schemas/articles/article.types';

export const revalidate = 3600;

function formatArticleList(articles: ArticlesByTypeQueryResult, siteUrl: string, basePath: string) {
  if (articles.length === 0) {
    return '_(brak opublikowanych artykułów)_';
  }

  return articles.map((article) => `- [${article.title}](${siteUrl}${basePath}/${article.slug.current})`).join('\n');
}

export async function GET() {
  const client = getClient();
  const [settings, howToArticles, useCaseArticles] = await Promise.all([
    getSettings(),
    client.fetch<ArticlesByTypeQueryResult>(articlesByTypeQuery, { type: 'how-to' }),
    client.fetch<ArticlesByTypeQueryResult>(articlesByTypeQuery, { type: 'use-case' }),
  ]);
  const siteUrl = getSiteUrl(settings?.url) || 'https://www.wbcars.pl';

  const phone = settings?.phone || '+48 577 211 777';
  const email = settings?.mail || 'wbcarss@gmail.com';
  const address = settings?.address || 'Tarnów';

  const body = `# WB Cars

> Studio detailingu samochodowego w Tarnowie: folie ochronne PPF, powłoki ceramiczne, korekta lakieru, detailing wnętrza.

WB Cars to autoryzowane studio detailingu samochodowego działające w Tarnowie, autoryzowany partner Gtechniq, z ponad 3000 zrealizowanych projektów.

## Kontakt

- Telefon: ${phone}
- E-mail: ${email}
- Adres: ${address}
- Strona: ${siteUrl}

## Usługi

- Folie ochronne PPF (bezbarwne folie ochronne lakieru)
- Powłoki ceramiczne (długoterminowe zabezpieczenie lakieru)
- Korekta lakieru (usuwanie rys i hologramów)
- Detailing wnętrza

## Cennik

Aktualne pakiety i ceny usług dostępne są na stronie głównej: ${siteUrl}

## FAQ

Najczęściej zadawane pytania o PPF, powłoki ceramiczne i pielęgnację lakieru znajdują się na stronie głównej: ${siteUrl}

## Poradniki (How-To)

Instrukcje krok po kroku o pielęgnacji lakieru, folii PPF i powłok ceramicznych: ${siteUrl}/poradniki

${formatArticleList(howToArticles, siteUrl, '/poradniki')}

## Kiedy warto (Use Case)

Prawdziwe historie i realizacje z naszego studia — konkretne przykłady, kiedy dana usługa się opłaca: ${siteUrl}/kiedy-warto

${formatArticleList(useCaseArticles, siteUrl, '/kiedy-warto')}

## Polityka prywatności

${siteUrl}/polityka-prywatnosci

## Regulamin

${siteUrl}/regulamin
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
