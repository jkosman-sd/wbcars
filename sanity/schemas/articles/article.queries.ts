import { defineQuery } from 'next-sanity';

// $type scopes both queries to one article type ('how-to' | 'use-case') so how-to and
// use-case content live under separate URL prefixes (/poradniki vs /kiedy-warto) —
// an article can only ever be reached through the prefix matching its own type.
export const articleQuery = defineQuery(`*[_type == "article" && slug.current == $slug && type == $type][0]{
  _id,
  _createdAt,
  _updatedAt,
  type,
  title,
  slug,
  excerpt,
  publishedAt,
  updatedAt,
  noIndex,
  coverImage{
    ...,
    image{
      ...,
      asset->
    }
  },
  body[]{
    ...,
    _type == 'image' => {
      ...,
      asset->
    }
  }
}`);

export const articlesByTypeQuery = defineQuery(`*[_type == "article" && type == $type] | order(publishedAt desc) {
  _id,
  type,
  title,
  slug,
  excerpt,
  publishedAt,
  coverImage{
    ...,
    image{
      ...,
      asset->
    }
  }
}`);
