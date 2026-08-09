import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { RichText } from '../../../components/cms/shared/rich-text/rich-text';
import { getSettings } from '../../../sanity/lib/get-settings';
import { getSiteUrl } from '../../../sanity/lib/get-site-url';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const siteUrl = getSiteUrl(settings?.url);

  return {
    title: `Regulamin | ${settings?.title || 'WB Cars'}`,
    description: 'Regulamin świadczenia usług WB Cars.',
    robots: 'index,follow',
    alternates: {
      canonical: siteUrl ? new URL(`${siteUrl}/regulamin`) : null,
    },
  };
}

export const revalidate = 20;

export default async function TermsOfServicePage() {
  const settings = await getSettings();

  if (!settings?.termsOfService?.length) {
    notFound();
  }

  return (
    <article className='mx-auto max-w-3xl px-4 py-16 md:px-16 lg:px-[62px] lg:py-[84px]'>
      <h1 className='font-montserrat mb-8 text-3xl font-bold text-foreground uppercase'>Regulamin</h1>
      <div className='font-montserrat text-base leading-relaxed text-muted-foreground'>
        <RichText value={settings.termsOfService} />
      </div>
    </article>
  );
}
