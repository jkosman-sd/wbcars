import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getSettings } from '../../sanity/lib/get-settings';
import { getSiteUrl } from '../../sanity/lib/get-site-url';
import { getClient } from '../../sanity/sanity.client';
import { articleQuery, articlesByTypeQuery } from '../../sanity/schemas/articles/article.queries';
import type { ArticleQueryResult, ArticlesByTypeQueryResult, ArticleType } from '../../sanity/schemas/articles/article.types';
import { urlForImage } from '../../sanity/schemas/image';
import { ResponsiveImage } from '../ui/image/image';
import { ArticleJsonLd } from './article-json-ld';
import { RichText } from './shared/rich-text/rich-text';

async function fetchArticle(type: ArticleType, slug: string) {
  const client = getClient();
  return client.fetch<ArticleQueryResult>(articleQuery, { slug, type });
}

export async function generateArticleStaticParams(type: ArticleType) {
  const client = getClient();
  const articles = await client.fetch<ArticlesByTypeQueryResult>(articlesByTypeQuery, { type });
  return articles.map((article) => ({ slug: article.slug.current }));
}

export async function generateArticleMetadata(type: ArticleType, slug: string, hubPath: string): Promise<Metadata> {
  const [article, settings] = await Promise.all([fetchArticle(type, slug), getSettings()]);
  const siteUrl = getSiteUrl(settings?.url);

  if (!article) {
    return {};
  }

  return {
    title: `${article.title} | ${settings?.title || 'WB Cars'}`,
    description: article.excerpt,
    alternates: {
      canonical: siteUrl ? new URL(`${siteUrl}${hubPath}/${article.slug.current}`) : null,
    },
    robots: article.noIndex ? 'noindex,nofollow' : 'index,follow',
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt || article.publishedAt,
    },
  };
}

interface ArticleDetailPageProps {
  type: ArticleType;
  slug: string;
  hubPath: string;
  hubLabel: string;
  typeLabel: string;
}

export async function ArticleDetailPage({ type, slug, hubPath, hubLabel, typeLabel }: ArticleDetailPageProps) {
  const [article, settings] = await Promise.all([fetchArticle(type, slug), getSettings()]);

  if (!article) {
    notFound();
  }

  const siteUrl = getSiteUrl(settings?.url);
  const coverImageUrl = article.coverImage?.image?.asset ? urlForImage(article.coverImage.image)?.src : undefined;

  return (
    <article className='mx-auto max-w-3xl px-4 py-16 md:px-16 lg:px-[62px] lg:py-[84px]'>
      {siteUrl && (
        <ArticleJsonLd
          siteUrl={siteUrl}
          title={article.title}
          excerpt={article.excerpt}
          publishedAt={article.publishedAt}
          updatedAt={article.updatedAt}
          slug={article.slug.current}
          hubPath={hubPath}
          hubLabel={hubLabel}
          image={coverImageUrl}
        />
      )}

      <p className='font-montserrat mb-2 text-sm font-semibold tracking-[3.2px] text-primary uppercase'>
        {typeLabel}
      </p>
      <h1 className='font-montserrat mb-4 text-3xl font-bold text-primary uppercase md:text-4xl'>{article.title}</h1>
      <div className='mb-6 h-px w-full max-w-md bg-gradient-to-r from-primary to-transparent' />
      <time dateTime={article.publishedAt} className='font-montserrat mb-8 block text-sm text-muted-foreground'>
        Opublikowano: {new Date(article.publishedAt).toLocaleDateString('pl-PL')}
        {article.updatedAt && ` · Zaktualizowano: ${new Date(article.updatedAt).toLocaleDateString('pl-PL')}`}
      </time>

      {article.coverImage?.image?.asset && (
        <ResponsiveImage
          loaderType='sanity'
          image={article.coverImage.image}
          aspectRatio={article.coverImage.aspectRatio}
          alt={article.coverImage.image.alt || article.title}
          sizes={['800px']}
          className='mb-8 rounded-lg'
          priority
        />
      )}

      <div className='font-montserrat text-base leading-relaxed text-muted-foreground'>
        <RichText value={article.body} />
      </div>
    </article>
  );
}
