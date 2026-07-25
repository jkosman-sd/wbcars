import { createImageUrlBuilder } from '@sanity/image-url';

import { dataset, projectId } from '@/sanity/sanity.api';

const imageBuilder = createImageUrlBuilder({ projectId, dataset });

export const urlForImage = (source) => {
  if (!source || !source.asset) return;
  const dimensions = source?.asset?.metadata?.dimensions;

  const url = imageBuilder.image(source).auto('format').width(Math.min(dimensions.width, '2000')).url();

  return {
    src: url,
    width: dimensions.width,
    height: dimensions.height,
  };
};

// Open Graph / Twitter Card previews expect a fixed 1200x630 (1.91:1) crop regardless of the
// source image's original dimensions — see https://ogp.me and Twitter's summary_large_image spec.
export const urlForOgImage = (source) => {
  if (!source || !source.asset) return;

  const url = imageBuilder.image(source).width(1200).height(630).fit('crop').auto('format').url();

  return {
    src: url,
    width: 1200,
    height: 630,
  };
};
