import { Metadata } from 'next';

import { ArticleHubPage } from '../../../components/cms/article-hub-page';
import { getSettings } from '../../../sanity/lib/get-settings';
import { getSiteUrl } from '../../../sanity/lib/get-site-url';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const siteUrl = getSiteUrl(settings?.url);

  return {
    title: `Poradniki | ${settings?.title || 'WB Cars'}`,
    description: 'Poradniki krok po kroku o pielęgnacji lakieru, powłok ceramicznych i folii ochronnych PPF.',
    alternates: {
      canonical: siteUrl ? new URL(`${siteUrl}/poradniki`) : null,
    },
  };
}

export const revalidate = 20;

export default function PoradnikiPage() {
  return (
    <ArticleHubPage
      type='how-to'
      basePath='/poradniki'
      heading='Poradniki'
      description='Instrukcje krok po kroku: jak dbać o powłokę ceramiczną, folię PPF i lakier na co dzień.'
      emptyMessage='Wkrótce pojawią się tu pierwsze poradniki.'
    />
  );
}
