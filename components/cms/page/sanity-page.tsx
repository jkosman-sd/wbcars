import React from 'react';

import { PageQueryResult } from '@/components/cms/sanity-types';

import { SanityContactSection } from './components/sanity-contact-section';
import { SanityHeroSection } from './components/sanity-hero-section';
import { SanityImageSection } from './components/sanity-image-section';
import { SanityInstagramCarouselSection } from './components/sanity-instagram-carousel-section';
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
  instagramCarouselSection: SanityInstagramCarouselSection,
} satisfies SanityPageComponents;
