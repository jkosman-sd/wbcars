import type { NextConfig } from 'next';

import { deviceSizes } from './device-sizes';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    remotePatterns: [
      { hostname: 'cdn.sanity.io' },
      { hostname: 'picsum.photos' },
      { hostname: '*.cdninstagram.com' },
      { hostname: '*.fbcdn.net' },
    ],
    deviceSizes: deviceSizes as unknown as number[],
  },
  typescript: {
    // Set this to false if you want production builds to abort if there's type errors
    ignoreBuildErrors: process.env.VERCEL_ENV === 'production',
  },
  async headers() {
    return [
      {
        // Applies to every route except /studio (Sanity Studio needs to manage its own framing/embedding behavior).
        source: '/((?!studio).*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
