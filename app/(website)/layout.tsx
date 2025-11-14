import { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';

import { SiteLayout } from '../../components/layout/site-layout';
import { getNavigationData } from '../../sanity/sanity.client';

interface LayoutProps {
  children: ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const navigationData = await getNavigationData();

  const navigationLinks = (navigationData?.navigation?.navigationLinks ?? []).map((link) => ({
    label: link.label,
    href: link.href,
    external: link.external || false,
  }));

  return (
    <SiteLayout>
      <SiteLayout.Header navigationLinks={navigationLinks} />
      <SiteLayout.Main>{children}</SiteLayout.Main>
      <SiteLayout.Footer />
      <Analytics />
    </SiteLayout>
  );
}
