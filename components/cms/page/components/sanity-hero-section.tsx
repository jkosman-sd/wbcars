'use client';

import Image from 'next/image';

import { PageSectionItem } from '@/components/cms/page/sanity-page';
import { PageSection } from '@/components/layout/page-section/page-section';
import { HeroSection } from '@/components/sections/hero-section/hero-section';

import { sanityLoader } from '../../../ui/image/image';

type SanityHeroSectionProps = PageSectionItem<'heroSection'>;

export const SanityHeroSection = (props: SanityHeroSectionProps) => {
  const section = props;
  return (
    <PageSection className='my-0 sm:my-0 md:my-0 lg:my-0' fullWidth key={section._key}>
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
              sizes='(max-width: 976px) 80vw, 45vw'
              loader={(loaderProps) => sanityLoader({ ...loaderProps, asset: section.backgroundImage })}
            />
          )
        }
      />
    </PageSection>
  );
};
