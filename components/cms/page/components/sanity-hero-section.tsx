import Image from 'next/image';

import { PageSectionItem } from '@/components/cms/page/sanity-page';
import { PageSection } from '@/components/layout/page-section/page-section';
import { HeroSection } from '@/components/sections/hero-section/hero-section';

type SanityHeroSectionProps = PageSectionItem<'heroSection'>;

export const SanityHeroSection = (props: SanityHeroSectionProps) => {
  const section = props;
  return (
    <PageSection className='my-0' fullWidth key={section._key}>
      <HeroSection
        title={section.title}
        description={section.description}
        image={
          section.backgroundImage.asset?.url && (
            <Image
              className='object-cover object-center'
              src={section.backgroundImage.asset.url}
              alt={section.backgroundImage.alt}
              fill
              priority
            />
          )
        }
      />
    </PageSection>
  );
};
