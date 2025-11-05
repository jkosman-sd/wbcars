import React from 'react';

import { PageQueryResult } from '@/components/cms/sanity-types';

import { SanityCarousel } from './components/sanity-carousel';
import { SanityContactSection } from './components/sanity-contact-section';
import { SanityHeroSection } from './components/sanity-hero-section';
import { SanityImageSection } from './components/sanity-image-section';
import { SanityOfferSection } from './components/sanity-offer-section';
import { SanitySubheadingSection } from './components/sanity-subheading-section';

type ConfigQueryResultNotNullable = NonNullable<PageQueryResult>;
export type HeroSections = NonNullable<ConfigQueryResultNotNullable['sections']>[number];
type HomeSectionType = HeroSections['_type'];

export type PageSectionItem<T extends HomeSectionType> = Extract<HeroSections, { _type: T }>;

type SanityPageComponents = {
  [key in HomeSectionType]: (props: PageSectionItem<key>) => React.ReactNode;
};

export const sanityPageComponents = {
  heroSection: SanityHeroSection,
  imageSection: SanityImageSection,
  contactSection: SanityContactSection,
  subheadingSection: SanitySubheadingSection,
  carouselSection: SanityCarousel,
  offerSection: SanityOfferSection,
} satisfies SanityPageComponents;
