import type { NextConfig } from 'next';

import { deviceSizes } from './device-sizes';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    remotePatterns: [{ hostname: 'cdn.sanity.io' }, { hostname: 'picsum.photos' }],
    deviceSizes: deviceSizes as unknown as number[],
  },
  typescript: {
    // Set this to false if you want production builds to abort if there's type errors
    ignoreBuildErrors: process.env.VERCEL_ENV === 'production',
  },
};

export default nextConfig;
