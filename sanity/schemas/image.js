import createImageUrlBuilder from '@sanity/image-url';
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
