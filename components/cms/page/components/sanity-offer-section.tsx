'use client';

import Image from 'next/image';

import { PageSection } from '@/components/layout/page-section/page-section';
import { OfferSection } from '@/components/sections/offer-section/offer-section';

import { countAspectRatio } from '../../../ui/image/aspect-ratio';
import { sanityLoader } from '../../../ui/image/image';
import { PageSectionItem } from '../sanity-page';

type SanityOfferSectionProps = PageSectionItem<'offerSection'>;

export const SanityOfferSection = (props: SanityOfferSectionProps) => {
  const section = props;

  const packages = section.packages.map((pkg, index) => {
    const hotspot = pkg.image.image.hotspot;
    const objectPosition = hotspot ? `${hotspot.x * 100}% ${hotspot.y * 100}%` : 'center';

    return {
      id: pkg.number,
      number: pkg.number,
      subtitle: pkg.subtitle,
      title: pkg.title,
      description: pkg.description,
      price: pkg.price,
      image: pkg.image.image?.asset?.url ? (
        <Image
          src={pkg.image.image.asset.url}
          alt={pkg.image.image.alt || `${pkg.title} package image`}
          fill
          className='object-cover'
          style={{ objectPosition }}
          sizes='(max-width: 976px) 80vw, 45vw'
          priority={index === 0}
          loader={(loaderProps) =>
            sanityLoader({
              ...loaderProps,
              asset: pkg.image.image,
              aspectRatio: pkg.image.aspectRatio ? countAspectRatio(pkg.image.aspectRatio) : 16 / 9,
            })
          }
        />
      ) : null,
      additionalOption: pkg.additionalOption
        ? {
            label: pkg.additionalOption.label,
            price: pkg.additionalOption.price,
          }
        : undefined,
    };
  });

  return (
    <PageSection fullWidth key={section._key}>
      <OfferSection packages={packages} defaultOpenPackage={packages[section.defaultOpenPackage || 0]?.id} />
    </PageSection>
  );
};
