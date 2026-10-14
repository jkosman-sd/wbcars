import './globals.css';

import React from 'react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Michroma, Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const michroma = Michroma({
  variable: '--font-michroma',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pl'>
      <body className={`${montserrat.variable} ${michroma.variable} antialiased`}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
