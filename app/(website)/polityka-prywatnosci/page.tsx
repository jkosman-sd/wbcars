import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { RichText } from '../../../components/cms/shared/rich-text/rich-text';
import { getSettings } from '../../../sanity/lib/get-settings';
import { getSiteUrl } from '../../../sanity/lib/get-site-url';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const siteUrl = getSiteUrl(settings?.url);

  return {
    title: `Polityka prywatności | ${settings?.title || 'WB Cars'}`,
    description: 'Polityka prywatności WB Cars — zasady przetwarzania danych osobowych.',
    robots: 'index,follow',
    alternates: {
      canonical: siteUrl ? new URL(`${siteUrl}/polityka-prywatnosci`) : null,
    },
  };
}

export const revalidate = 20;

export default async function PrivacyPolicyPage() {
  const settings = await getSettings();

  if (!settings?.privacyPolicy?.length) {
    notFound();
  }

  return (
    <article className='mx-auto max-w-3xl px-4 py-16 md:px-16 lg:px-[62px] lg:py-[84px]'>
      <h1 className='font-montserrat mb-8 text-3xl font-bold text-foreground uppercase'>Polityka prywatności</h1>
      <div className='font-montserrat text-base leading-relaxed text-muted-foreground'>
        <RichText value={settings.privacyPolicy} />
      </div>
    </article>
  );
}
