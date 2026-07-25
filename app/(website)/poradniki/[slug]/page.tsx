import { Metadata } from 'next';

import {
  ArticleDetailPage,
  generateArticleMetadata,
  generateArticleStaticParams,
} from '../../../../components/cms/article-detail-page';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return generateArticleStaticParams('how-to');
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return generateArticleMetadata('how-to', slug, '/poradniki');
}

export const revalidate = 20;

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  return <ArticleDetailPage type='how-to' slug={slug} hubPath='/poradniki' hubLabel='Poradniki' typeLabel='Poradnik' />;
}
