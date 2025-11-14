'use client';

import React from 'react';
import imageUrlBuilder from '@sanity/image-url';
import { SanityAsset } from '@sanity/image-url/lib/types/types';
import NextImage from 'next/image';

import { deviceSizes } from '@/device-sizes';
import { cn } from '@/lib/utils';
import { dataset, projectId } from '@/sanity/sanity.api';

import { AspectRatio, aspectRatioToClassName, countAspectRatio } from './aspect-ratio';

type UnionDeviceSizes = (typeof deviceSizes)[number];
type ImageSize = `${number}${'vw' | 'px'}`;
type Sizes = [...`(${'max' | 'min'}-width: ${UnionDeviceSizes}px) ${ImageSize}`[], ImageSize];

const sanityLoader = ({
  width,
  asset,
  aspectRatio,
  quality,
}: {
  width: number;
  asset: SanityAsset;
  aspectRatio?: number;
  quality?: number;
}) => {
  const sanityBuilder = imageUrlBuilder({
    dataset,
    projectId,
  });

  const image = sanityBuilder
    .image(asset)
    .width(width)
    .quality(quality || 75);

  if (aspectRatio) {
    image.height(Math.floor(width * aspectRatio)).fit('crop');
  }

  return image.url();
};

type StaticImageProps = {
  width: number;
  height: number;
  quality?: number;
  priority?: boolean;
  alt: string;
  errorImage?: React.ReactNode;
  className?: string;
} & (
  | {
      src: string;
      loaderType: 'local';
    }
  | {
      src: string;
      loaderType: 'external';
    }
  | {
      loaderType: 'sanity';
      image: SanityAsset;
    }
);

export const StaticImage = (props: StaticImageProps) => {
  const { quality, alt, priority = false, loaderType, className } = props;

  if (loaderType === 'sanity') {
    return (
      <NextImage
        className={className}
        width={props.width}
        height={props.height}
        priority={priority}
        loader={(loaderProps) =>
          sanityLoader({
            ...loaderProps,
            asset: props.image,
          })
        }
        src={props.image.asset.url}
        alt={alt}
        quality={quality}
        // onError={handleError}
      />
    );
  }

  return (
    <NextImage
      className={className}
      width={props.width}
      height={props.height}
      priority={priority}
      src={props.src!}
      alt={alt}
      quality={quality}
      // onError={handleError}
    />
  );
};

export const aspectRatioStyle = (aspectRatio: AspectRatio) => {
  if (typeof aspectRatio === 'string') {
    return { className: aspectRatioToClassName[aspectRatio] };
  }

  return {
    style: {
      paddingBottom: `${countAspectRatio(aspectRatio) * 100}%`,
    },
  };
};

type ResponsiveImageProps = {
  aspectRatio: AspectRatio;
  quality?: number;
  priority?: boolean;
  sizes?: Sizes;
  errorImage?: React.ReactNode;
  className?: string;
} & (
  | {
      src: string;
      alt: string;
      loaderType: 'local';
    }
  | {
      src: string;
      alt: string;
      loaderType: 'external';
    }
  | {
      loaderType: 'sanity';
      image: SanityAsset;
      alt: string;
    }
);

export const ResponsiveImage = (props: ResponsiveImageProps) => {
  const { aspectRatio, priority, loaderType } = props;

  const { className, style } = aspectRatioStyle(aspectRatio);

  if (loaderType === 'sanity') {
    return (
      <div className={cn(className, props.className, 'relative w-full overflow-hidden')} style={style}>
        <NextImage
          className={cn('absolute inset-0 h-full w-full object-cover')}
          priority={priority}
          loader={(loaderProps) =>
            sanityLoader({
              ...loaderProps,
              asset: props.image,
              aspectRatio: countAspectRatio(props.aspectRatio),
            })
          }
          fill
          src={props.image.asset.url}
          alt={props.image.alt}
          quality={props.quality}
          // onError={handleError}
          sizes={props.sizes?.join(', ')}
        />
      </div>
    );
  }

  return (
    <div className={cn(className, 'relative w-full overflow-hidden')} style={style}>
      <NextImage
        className={cn('absolute inset-0 h-full w-full object-contain')}
        priority={priority}
        fill
        src={props.src}
        alt={props.alt}
        quality={props.quality}
        // onError={handleError}
        sizes={props.sizes?.join(', ')}
      />
    </div>
  );
};
