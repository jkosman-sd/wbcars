import React from 'react';

import { HeroMask } from './hero-mask';

interface HeroSectionProps {
  title: string;
  description: string;
  backgroundImage: React.ReactNode;
}

export const HeroSection = (props: HeroSectionProps) => {
  const { title, description, backgroundImage } = props;

  return (
    <section className='relative h-[500px] w-full overflow-hidden bg-background md:h-[600px] lg:h-[723px]'>
      <HeroMask />

      {/* Masked Image on the right side - only visible through mask */}
      <div className='absolute top-0 right-0 h-full w-[60%] md:w-[55%] lg:w-[917px]'>
        <div
          className='absolute inset-0'
          style={{
            mask: 'url(#hero-diagonal-mask)',
            WebkitMask: 'url(#hero-diagonal-mask)',
            maskSize: 'contain',
            WebkitMaskSize: 'contain',
            maskPosition: 'right center',
            WebkitMaskPosition: 'right center',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
          }}
        >
          {backgroundImage}
        </div>
      </div>

      {/* Content */}
      <div className='relative flex h-full items-center'>
        <div className='container mx-auto px-4 md:px-8 lg:px-16'>
          <div className='flex max-w-[634px] flex-col gap-6 lg:py-[24px] lg:pl-[64px]'>
            {/* Title */}
            <h1 className='font-orbitron text-4xl leading-normal font-normal text-primary uppercase md:text-5xl lg:text-[56px]'>
              {title}
            </h1>

            {/* Description */}
            <p className='font-montserrat text-lg leading-[1.2] font-normal text-neutral-50 md:text-xl lg:max-w-[507px] lg:text-2xl'>
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
