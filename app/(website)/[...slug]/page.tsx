import { notFound } from 'next/navigation';

import { SanityComponents } from '@/components/cms/sanity-components';
import type { PageQueryResult } from '@/components/cms/sanity-types';
import { getClient } from '@/sanity/sanity.client';
import { pageQuery } from '@/sanity/schemas/pages/page.queries';
import { getSettings } from '../../../sanity/lib/get-settings';
import { Metadata } from 'next';
import { urlForImage } from '../../../sanity/schemas/image';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const slugString = slug ? `/${slug.join('/')}` : '/';

  const client = getClient();
  const page = await client.fetch<PageQueryResult>(pageQuery, { slug: slugString });
  const defaultSettings = await getSettings();
  console.log(page);

  // Use page-specific metadata if available, fallback to default settings
  const pageTitle = page?.metadata?.metaTitle || page?.title || defaultSettings?.title || 'WBCars';
  const pageDescription = page?.metadata?.metaDescription || defaultSettings?.description || 'Auto detailing Tarnów';
  const pageKeywords = page?.metadata?.keywords?.length ? page.metadata.keywords : (defaultSettings?.keywords ?? []);
  const pageOgImage = page?.metadata?.ogImage || defaultSettings?.openGraphImage;

  return {
    metadataBase: defaultSettings?.url ? new URL(defaultSettings?.url) : null,
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: defaultSettings?.url ? new URL(defaultSettings?.url + slugString) : null,
    },
    keywords: pageKeywords,
    authors: [{ name: 'Jakub Kosman Software Development' }, { name: 'Wojciech Szmidt' }],
    robots: page?.metadata?.noIndex ? 'noindex,nofollow' : 'index,follow',
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: defaultSettings?.url ? defaultSettings.url + slugString : undefined,
      siteName: 'WBCars',
      images: [
        {
          url: urlForImage(pageOgImage)?.src || '/img/opengraph.jpg',
          width: 800,
          height: 600,
        },
      ],
      locale: 'pl_PL',
      type: 'website',
    },
  };
}

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const slugString = slug ? `/${slug.join('/')}` : '/';

  const client = getClient();
  const page = await client.fetch<PageQueryResult>(pageQuery, { slug: slugString });

  if (!page) {
    notFound();
  }

  return page.sections && <SanityComponents pageType='page' sanityComponentsData={page.sections} />;
}
