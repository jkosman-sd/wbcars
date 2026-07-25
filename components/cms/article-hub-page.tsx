import Link from 'next/link';

import { getClient } from '../../sanity/sanity.client';
import { articlesByTypeQuery } from '../../sanity/schemas/articles/article.queries';
import type { ArticlesByTypeQueryResult, ArticleType } from '../../sanity/schemas/articles/article.types';
import { ResponsiveImage } from '../ui/image/image';

interface ArticleHubPageProps {
  type: ArticleType;
  basePath: string;
  heading: string;
  description: string;
  emptyMessage: string;
}

export async function ArticleHubPage({ type, basePath, heading, description, emptyMessage }: ArticleHubPageProps) {
  const client = getClient();
  const articles = await client.fetch<ArticlesByTypeQueryResult>(articlesByTypeQuery, { type });

  return (
    <div className='mx-auto max-w-6xl px-4 py-16 md:px-16 lg:px-[62px] lg:py-[84px]'>
      <h1 className='font-montserrat mb-4 text-3xl font-bold tracking-[3.2px] text-primary uppercase md:text-4xl lg:text-[48px]'>
        {heading}
      </h1>
      <div className='mb-8 h-px w-full max-w-2xl bg-gradient-to-r from-primary to-transparent' />
      <p className='font-montserrat mb-12 max-w-2xl text-muted-foreground'>{description}</p>

      {articles.length > 0 ? (
        <ul className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {articles.map((article) => (
            <li key={article._id}>
              <Link href={`${basePath}/${article.slug.current}`} className='group block'>
                {article.coverImage?.image?.asset && (
                  <ResponsiveImage
                    loaderType='sanity'
                    image={article.coverImage.image}
                    aspectRatio={article.coverImage.aspectRatio}
                    alt={article.coverImage.image.alt || article.title}
                    sizes={['400px']}
                    className='mb-4 rounded-lg'
                  />
                )}
                <h2 className='font-montserrat text-lg font-semibold text-primary uppercase transition-opacity group-hover:opacity-80'>
                  {article.title}
                </h2>
                <p className='font-montserrat mt-2 text-sm text-muted-foreground'>{article.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className='font-montserrat text-muted-foreground'>{emptyMessage}</p>
      )}
    </div>
  );
}
