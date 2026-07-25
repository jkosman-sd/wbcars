import { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';

import { OrganizationJsonLd } from '../../components/cms/organization-json-ld';
import { SiteLayout } from '../../components/layout/site-layout';
import { getSettings } from '../../sanity/lib/get-settings';
import { getSiteUrl } from '../../sanity/lib/get-site-url';
import { getNavigationData } from '../../sanity/sanity.client';

interface LayoutProps {
  children: ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const [navigationData, settings] = await Promise.all([getNavigationData(), getSettings()]);

  const navigationLinks = (navigationData?.navigation?.navigationLinks ?? []).map((link) => ({
    label: link.label,
    href: link.href,
    external: link.external || false,
  }));

  const siteUrl = getSiteUrl(settings?.url);

  return (
    <SiteLayout>
      {siteUrl && (
        <OrganizationJsonLd
          siteUrl={siteUrl}
          name={settings?.title || 'WB Cars'}
          phone={settings?.phone}
          email={settings?.mail}
          address={settings?.address}
          nip={settings?.nip}
          openingHours={settings?.openingHours}
        />
      )}
      <SiteLayout.Header navigationLinks={navigationLinks} />
      <SiteLayout.Main>{children}</SiteLayout.Main>
      <SiteLayout.Footer />
      <Analytics />
    </SiteLayout>
  );
}
