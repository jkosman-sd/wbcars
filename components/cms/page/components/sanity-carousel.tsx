import { PageSectionItem } from '@/components/cms/page/sanity-page';
import { PageSection } from '@/components/layout/page-section/page-section';
import { Carousel, type CarouselItem } from '@/components/sections/carousel/carousel';
import { Icon } from '@/components/ui/icon';
import { AspectRatio } from '@/components/ui/image/aspect-ratio';
import { ResponsiveImage } from '@/components/ui/image/image';

type SanityCarouselProps = PageSectionItem<'carouselSection'>;

export const SanityCarousel = (props: SanityCarouselProps) => {
  const section = props;

  console.log('Rendering SanityCarousel with section:', section.images);
  console.log('First image structure:', section.images?.[0]);

  // Transform images to CarouselItem[]
  const imageItems: CarouselItem[] =
    section.images?.map((img, index) => {
      return {
        type: 'image' as const,
        image: img.image?.asset ? (
          <ResponsiveImage
            loaderType='sanity'
            image={img.image}
            aspectRatio={(img.aspectRatio as AspectRatio) || '1/1'}
            priority={index === 0}
          />
        ) : null,
        alt: img.image?.alt || `Zdjęcie ${index + 1}`,
      };
    }) || [];

  // Insert CTA card at specified position
  if (section.showCtaCard && section.instagramUrl) {
    const ctaItem: CarouselItem = {
      type: 'cta',
      text: section.ctaText || 'Po więcej zapraszamy na nasze konto na instagramie',
      url: section.instagramUrl,
      icon: <Icon name='Instagram' className='size-8 text-primary' />,
    };

    const position = section.ctaPosition ?? 2;
    imageItems.splice(position, 0, ctaItem);
  }

  return (
    <PageSection key={section._key} className='overflow-hidden'>
      <Carousel items={imageItems} />
    </PageSection>
  );
};
