import React from 'react';

import { cn } from '@/lib/utils';

interface ImageSectionProps {
  title: string;
  description: React.ReactNode;
  image: React.ReactNode;
  layout: 'left' | 'right';
}

export const ImageSection = (props: ImageSectionProps) => {
  const { title, description, image, layout } = props;

  return (
    <div className='bg-background'>
      <div
        className={cn('flex flex-col gap-6 lg:flex-row lg:gap-6', {
          'lg:flex-row': layout === 'left',
          'lg:flex-row-reverse': layout === 'right',
        })}
      >
        {/* Image section */}
        <div className='w-full shrink-0 lg:max-w-[820px]'>{image}</div>

        {/* Content section */}
        <div className='flex grow flex-col gap-4 px-4 pt-8 pb-6 md:px-8 md:pt-12 md:pb-8 lg:gap-4 lg:pt-20 lg:pr-16 lg:pb-6 lg:pl-0'>
          {/* Yellow accent line */}
          <div className='h-[2px] w-full bg-primary' />

          {/* Title */}
          <h3 className='font-montserrat text-2xl leading-tight font-medium text-foreground uppercase md:text-3xl lg:text-[32px] lg:leading-[32px]'>
            {title}
          </h3>

          {/* Description */}
          <div className='font-montserrat text-lg leading-relaxed font-normal text-foreground md:text-xl lg:max-w-[507px] lg:text-2xl lg:leading-[1.2]'>
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};
