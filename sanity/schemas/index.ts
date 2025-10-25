import { responsiveImage } from './objects/responsive-image';
import { pageType } from './pages/page';
import { blockContentSection } from './sections/block-content-section';
import { contactSection } from './sections/contact-section';
import { heroSection } from './sections/hero-section';
import { imageSection } from './sections/image-section';
import { instagramCarouselSection } from './sections/instagram-carousel-section';
import { subheadingSection } from './sections/subheading-section';
import { settingsType } from './settings';

export const schemaTypes = [
  settingsType,
  pageType,
  responsiveImage,
  imageSection,
  blockContentSection,
  contactSection,
  heroSection,
  subheadingSection,
  instagramCarouselSection,
];
