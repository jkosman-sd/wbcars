import { ResponsiveImage } from '@/components/cms/sanity-types';

export type ArticleType = 'how-to' | 'use-case';

interface PortableTextBlock {
  children?: Array<{
    marks?: Array<string>;
    text?: string;
    _type: 'span';
    _key: string;
  }>;
  style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote';
  listItem?: 'bullet';
  markDefs?: Array<{
    href?: string;
    _type: 'link';
    _key: string;
  }>;
  level?: number;
  _type: 'block';
  _key: string;
}

interface PortableTextImage {
  asset?: {
    _id: string;
    url?: string;
    metadata?: { dimensions?: { width: number; height: number } };
  } | null;
  alt?: string;
  _type: 'image';
  _key: string;
}

export interface ArticleQueryResult {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  type: ArticleType;
  title: string;
  slug: { current: string };
  excerpt: string;
  publishedAt: string;
  updatedAt: string | null;
  noIndex: boolean | null;
  coverImage: ResponsiveImage | null;
  body: Array<PortableTextBlock | PortableTextImage>;
}

export type ArticlesByTypeQueryResult = Array<
  Pick<ArticleQueryResult, '_id' | 'type' | 'title' | 'slug' | 'excerpt' | 'publishedAt' | 'coverImage'>
>;
