import { Metadata } from 'next';

import { ArticleDetailPage, generateArticleMetadata } from '../../../../components/cms/article-detail-page';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return generateArticleMetadata('use-case', slug, '/kiedy-warto');
}

export const revalidate = 20;

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  return (
    <ArticleDetailPage type='use-case' slug={slug} hubPath='/kiedy-warto' hubLabel='Kiedy warto' typeLabel='Kiedy warto' />
  );
}
