import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { SanityComponents } from '@/components/cms/sanity-components';
import type { PageQueryResult } from '@/components/cms/sanity-types';
import { getClient } from '@/sanity/sanity.client';
import { pageQuery } from '@/sanity/schemas/pages/page.queries';

import { getSettings } from '../../../sanity/lib/get-settings';
import { getSiteUrl } from '../../../sanity/lib/get-site-url';
import { urlForOgImage } from '../../../sanity/schemas/image';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const slugString = slug ? `/${slug.join('/')}` : '/';

  const client = getClient();
  const page = await client.fetch<PageQueryResult>(pageQuery, { slug: slugString });
  const defaultSettings = await getSettings();
  const siteUrl = getSiteUrl(defaultSettings?.url);
  // Use page-specific metadata if available, fallback to default settings
  const pageTitle = page?.metadata?.metaTitle || page?.title || defaultSettings?.title || 'WB Cars';
  const pageDescription = page?.metadata?.metaDescription || defaultSettings?.description || 'Auto detailing Tarnów';
  const pageKeywords = page?.metadata?.keywords ?? [];
  const pageOgImage = page?.metadata?.ogImage || defaultSettings?.openGraphImage;
  const ogImage = urlForOgImage(pageOgImage);

  return {
    metadataBase: siteUrl ? new URL(siteUrl) : null,
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: siteUrl ? new URL(siteUrl + slugString) : null,
    },
    keywords: pageKeywords,
    robots: page?.metadata?.noIndex ? 'noindex,nofollow' : 'index,follow',
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: siteUrl ? siteUrl + slugString : undefined,
      siteName: 'WB Cars',
      images: [
        {
          url: ogImage?.src || '/img/opengraph.jpg',
          width: ogImage?.width || 1200,
          height: ogImage?.height || 630,
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

export const revalidate = 20;

export const dynamic = 'force-static';

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
