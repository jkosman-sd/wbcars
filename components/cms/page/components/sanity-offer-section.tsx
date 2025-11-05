import Image from 'next/image';

import { PageSection } from '@/components/layout/page-section/page-section';
import { OfferSection } from '@/components/sections/offer-section/offer-section';

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
          sizes='(max-width: 976px) 100vw, 50vw'
          priority={index === (section.defaultOpenPackage || 0)}
        />
      ) : null,
    };
  });

  const additionalOption = section.additionalOption
    ? {
        label: section.additionalOption.label,
        price: section.additionalOption.price,
      }
    : undefined;

  return (
    <PageSection fullWidth key={section._key}>
      <OfferSection
        packages={packages}
        additionalOption={additionalOption}
        defaultOpenPackage={packages[section.defaultOpenPackage || 0]?.id}
      />
    </PageSection>
  );
};
