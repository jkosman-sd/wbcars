import { Metadata } from 'next';

import { ArticleHubPage } from '../../../components/cms/article-hub-page';
import { getSettings } from '../../../sanity/lib/get-settings';
import { getSiteUrl } from '../../../sanity/lib/get-site-url';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const siteUrl = getSiteUrl(settings?.url);

  return {
    title: `Kiedy warto | ${settings?.title || 'WB Cars'}`,
    description:
      'Prawdziwe historie z naszego studia: kiedy PPF, kiedy powłoka ceramiczna, a kiedy korekta lakieru naprawdę się opłaca.',
    alternates: {
      canonical: siteUrl ? new URL(`${siteUrl}/kiedy-warto`) : null,
    },
  };
}

export const revalidate = 20;

export default function KiedyWartoPage() {
  return (
    <ArticleHubPage
      type='use-case'
      basePath='/kiedy-warto'
      heading='Kiedy warto'
      description='Prawdziwe realizacje i sytuacje z naszego studia — konkretne przykłady, kiedy dana usługa naprawdę się opłaca.'
      emptyMessage='Wkrótce pojawią się tu pierwsze historie z naszych realizacji.'
    />
  );
}
