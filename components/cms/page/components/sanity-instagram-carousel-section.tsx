import { PageSectionItem } from '@/components/cms/page/sanity-page';
import { PageSection } from '@/components/layout/page-section/page-section';
import { InstagramCarouselSection } from '@/components/sections/instagram-carousel-section/instagram-carousel-section';
import { ResponsiveImage } from '@/components/ui/image/image';
import { getClient } from '@/sanity/sanity.client';

type SanityInstagramCarouselSectionProps = PageSectionItem<'instagramCarouselSection'>;

// Query to get Instagram URL from settings
const settingsQuery = `*[_type == "settings"][0]{
  "instagramUrl": social[media == "Instagram"][0].url
}`;

export const SanityInstagramCarouselSection = async (props: SanityInstagramCarouselSectionProps) => {
  const section = props;
  const client = getClient();

  // Fetch Instagram URL from settings
  const settings = await client.fetch<{ instagramUrl?: string }>(settingsQuery);
  console.log(settings);

  // Transform Sanity images to component format
  const images = section.images || [];

  return (
    <PageSection key={section._key}>
      <InstagramCarouselSection
        images={images.map((image) => (
          <ResponsiveImage
            key={image._key}
            image={image}
            aspectRatio='1/1'
            loaderType='sanity'
            sizes={['(max-width: 480px) 90vw', '(max-width: 976px) 45vw', '33vw']}
          />
        ))}
        instagramUrl={settings?.instagramUrl}
      />
    </PageSection>
  );
};
