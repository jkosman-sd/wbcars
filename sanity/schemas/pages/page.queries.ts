import { defineQuery } from 'next-sanity';

// Query with expanded asset references
// Usage: client.fetch(pageQuery, { slug: 'home' })
export const pageQuery = defineQuery(`*[_type == "page" && slug.current == $slug][0]{
  _id,
  _type,
  _createdAt,
  _updatedAt,
  _rev,
  title,
  slug,
  metadata{
    metaTitle,
    metaDescription,
    keywords,
    ogImage{
      ...,
      asset->
    },
    noIndex
  },
  sections[]{
    _key,
    _type,
    title,
    description,
    text,
    images[]{
      ...,
      asset->,
      alt,
      aspectRatio
    },
    body[]{
      ...,
      _type == 'image' => {
        ...,
        asset->
      }
    },
    image{
      ...,
      image{
        ...,
        asset->
      },
      aspectRatio
    },
    backgroundImage{
      ...,
      asset->
    },
    layout,
    fullWidth,
    phone,
    address,
    email
  }
}`);

export const allPagesQuery = defineQuery(`*[_type == "page"]{
  _id,
  title,
  slug
}`);
