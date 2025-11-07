import React from 'react';

interface HeroSectionProps {
  title: string;
  description: string;
  image: React.ReactNode;
}

export const HeroSection = (props: HeroSectionProps) => {
  const { title, description, image } = props;

  return (
    <section className='relative h-[500px] w-full overflow-hidden bg-background md:h-[600px] lg:h-[723px]'>
      <div className='absolute top-0 right-0 h-full w-[60%] md:w-[55%] lg:w-[917px]'>
        <div className='absolute inset-0'>{image}</div>
      </div>

      {/* Content */}
      <div className='relative flex h-full items-end lg:items-center'>
        <div className='container mb-10 lg:mx-auto lg:px-16'>
          <div className='flex max-w-[500] flex-col gap-6 rounded-lg bg-black/30 p-4 backdrop-blur-md md:max-w-[634px] lg:bg-transparent lg:p-0 lg:backdrop-blur-none'>
            {/* Title */}
            <h1 className='font-michroma text-4xl leading-normal font-normal text-primary uppercase md:text-5xl lg:text-[56px]'>
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
