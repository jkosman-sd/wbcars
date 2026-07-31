import { PageSectionItem } from '@/components/cms/page/sanity-page';
import { RichText } from '@/components/cms/shared/rich-text/rich-text';
import { PageSection } from '@/components/layout/page-section/page-section';
import { ImageSection } from '@/components/sections/image-section/image-section';
import { AspectRatio } from '@/components/ui/image/aspect-ratio';
import { ResponsiveImage } from '@/components/ui/image/image';

type SanityImageSectionProps = PageSectionItem<'imageSection'> & { priority?: boolean };

export const SanityImageSection = (props: SanityImageSectionProps) => {
  const { priority = false, ...section } = props;

  const aspectRatio: AspectRatio = section.image.aspectRatio;
  const fullWidth = section.fullWidth || false;

  return (
    <PageSection key={section._key} fullWidth={fullWidth}>
      <ImageSection
        title={section.title}
        description={<RichText value={section.body}></RichText>}
        layout={section.layout}
        image={
          section.image.image.asset && (
            <ResponsiveImage
              loaderType='sanity'
              image={section.image.image}
              alt={section.image.image.alt || section.title || 'Zdjęcie'}
              aspectRatio={aspectRatio}
              priority={priority}
              sizes={['(max-width: 976px) 75vw', '540px']}
            />
          )
        }
      />
    </PageSection>
  );
};
