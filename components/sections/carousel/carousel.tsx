'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Instagram } from 'lucide-react';

import { cn } from '@/lib/utils';

export interface CarouselImageItem {
  type: 'image';
  image: React.ReactNode;
  alt: string;
}

export interface CarouselCtaItem {
  type: 'cta';
  text: string;
  url: string;
  icon?: React.ReactNode;
}

export type CarouselItem = CarouselImageItem | CarouselCtaItem;

export interface CarouselProps {
  items: CarouselItem[];
  className?: string;
}

export const Carousel = ({ items, className }: CarouselProps) => {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    loop: false,
    skipSnaps: false,
    dragFree: true,
  });

  return (
    <div className={cn('relative bg-background', className)} role='region' aria-label='Galeria zdjęć'>
      <div className='relative'>
        {/* Carousel Container */}
        <div ref={emblaRef}>
          <div className='flex gap-6' role='list'>
            {items.map((item, index) => (
              <div
                key={index}
                className={cn(
                  'relative min-w-0 shrink-0 grow-0',
                  item.type === 'cta' ? 'basis-[199px]' : 'basis-[320px] md:basis-[380px] lg:basis-[421px]'
                )}
                role='listitem'
              >
                {item.type === 'image' ? (
                  <div className='aspect-square overflow-hidden'>{item.image}</div>
                ) : (
                  <a
                    href={item.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex h-80 flex-col justify-between bg-primary px-4 py-6 transition-transform hover:scale-[1.02] focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none md:h-[380px] lg:h-[421px]'
                    aria-label='Odwiedź nasz Instagram'
                  >
                    <div className='flex flex-col justify-center'>
                      <p className='font-montserrat text-lg leading-normal font-semibold text-[#1a1a1a] underline decoration-solid underline-offset-2'>
                        {item.text}
                      </p>
                    </div>
                    <div className='flex items-end justify-start'>
                      <div className='flex size-[59px] items-center justify-center rounded-full bg-[#1a1a1a]'>
                        {item.icon || <Instagram className='size-8 text-primary' />}
                      </div>
                    </div>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
