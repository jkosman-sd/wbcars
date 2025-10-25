'use client';

import React from 'react';
import Link from 'next/link';

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Icon } from '@/components/ui/icon';

export interface InstagramCarouselSectionProps {
  images: React.ReactNode[];
  instagramUrl?: string;
}

export const InstagramCarouselSection = ({ images, instagramUrl }: InstagramCarouselSectionProps) => {
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: false,
        slidesToScroll: 1,
      }}
      className='w-full'
    >
      <CarouselContent className='-ml-6 md:h-[500px]'>
        {images.map((image, index) => (
          <React.Fragment key={`fragment-${index}`}>
            {/* Insert CTA panel as 3rd element (after index 1, before index 2) */}
            {index === 2 && instagramUrl && (
              <CarouselItem className='basis-[33%] sm:basis-[28%] md:basis-[26%] lg:basis-[20%] xl:basis-[16.5%]'>
                <Link
                  href={instagramUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='relative flex h-full w-full flex-col items-start justify-between overflow-hidden bg-primary px-4 py-6 transition-opacity hover:opacity-90'
                >
                  <p className='font-montserrat text-xs leading-normal font-semibold text-background underline decoration-solid underline-offset-2 sm:text-lg'>
                    Po więcej zapraszamy na nasze konto na instagramie
                  </p>
                  <div className='flex h-[59px] w-[59px] items-center justify-center rounded-full bg-background'>
                    <Icon className='text-primary' name='Instagram' size={32} />
                  </div>
                </Link>
              </CarouselItem>
            )}
            <CarouselItem className='basis-[85%] sm:basis-[85%] md:basis-[70%] lg:basis-[50%] xl:basis-[40%]'>
              <div className='relative aspect-square h-full w-full overflow-hidden'>{image}</div>
            </CarouselItem>
          </React.Fragment>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
