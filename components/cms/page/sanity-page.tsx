import React from 'react';

import { PageQueryResult } from '@/components/cms/sanity-types';

import { SanityImageSection } from './components/sanity-image-section';

type ConfigQueryResultNotNullable = NonNullable<PageQueryResult>;
export type HeroSections = NonNullable<ConfigQueryResultNotNullable['sections']>[number];
type HomeSectionType = HeroSections['_type'];

export type PageSectionItem<T extends HomeSectionType> = Extract<HeroSections, { _type: T }>;

type SanityPageComponents = {
  [key in HomeSectionType]: (props: PageSectionItem<key>) => React.ReactNode;
};

export const sanityPageComponents = {
  imageSection: SanityImageSection,
} satisfies SanityPageComponents;
