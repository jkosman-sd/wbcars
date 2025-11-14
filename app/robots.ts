import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const isProd = process.env.VERCEL_ENV === 'production';

  return {
    rules: [
      {
        userAgent: '*',
        ...(isProd
          ? { allow: '/', disallow: ['/studio'] }
          : { disallow: '/' }), // Disallow all routes for non-production
      },
    ],
    host: 'https://wbcars.pl',
    sitemap: 'https://wbcars.pl/sitemap.xml',
  };
}
