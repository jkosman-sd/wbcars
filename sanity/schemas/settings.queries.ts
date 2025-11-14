import { defineQuery } from 'next-sanity';

// Query to fetch navigation data from settings
export const navigationQuery = defineQuery(`*[_type == "settings"][0]{
  _id,
  navigation{
    navigationLinks[]{
      label,
      href,
      external,
      order
    } | order(order asc)
  }
}`);

// Query to fetch all settings
export const settingsQuery = defineQuery(`
  *[_type == "settings"][0] {
    _id,
    title,
    description,
    keywords,
    url,
    phone,
    address,
    mail,
    social,
    footerImage {
      ...,
      image {
        ...,
        asset->
      }
    }
  }
`);
