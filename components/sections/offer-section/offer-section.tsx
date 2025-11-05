'use client';

import React, { useRef } from 'react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

export interface OfferPackage {
  id: string;
  number: string; // e.g., ".01", ".02", ".03"
  subtitle: string; // e.g., "Pakiet"
  title: string; // e.g., "OPTIMUM", "FULL FRONT", "FULL BODY"
  description: string; // opis usług w pakiecie
  price: number; // e.g., 100
  image: React.ReactNode; // obrazek samochodu dla tego pakietu
}

export interface AdditionalOption {
  label: string; // e.g., "Zabezpieczenie powłoką ceramiczną"
  price: number; // e.g., 100
}

export interface OfferSectionProps {
  packages: OfferPackage[];
  additionalOption?: AdditionalOption; // opcjonalne
  defaultOpenPackage?: string; // ID pakietu otwartego domyślnie
}

export const OfferSection = (props: OfferSectionProps) => {
  const { packages, additionalOption, defaultOpenPackage } = props;
  const [activePackage, setActivePackage] = React.useState<string>(defaultOpenPackage || packages[0]?.id || '');
  const [isAdditionalOptionSelected, setIsAdditionalOptionSelected] = React.useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleValueChange = (value: string) => {
    setActivePackage(value);

    // Scroll to the beginning of the section (image) on mobile
    if (typeof window !== 'undefined' && window.innerWidth < 976) {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const activePackageData = packages.find((pkg) => pkg.id === activePackage);
  const totalPrice = activePackageData
    ? activePackageData.price + (isAdditionalOptionSelected && additionalOption ? additionalOption.price : 0)
    : 0;

  return (
    <section ref={sectionRef} className='relative w-full bg-background'>
      <div className='grid lg:grid-cols-2'>
        {/* Left side - Car Image with crossfade animation */}
        <div className='relative aspect-video w-full overflow-hidden lg:aspect-auto lg:self-stretch'>
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              style={{
                willChange: activePackage === pkg.id ? 'opacity' : 'auto',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
              className={cn(
                'absolute inset-0 transition-opacity duration-500 ease-in-out',
                activePackage === pkg.id ? 'z-10 opacity-100' : 'z-0 opacity-0'
              )}
            >
              {pkg.image}
            </div>
          ))}
        </div>

        {/* Right side - Accordion */}
        <Accordion
          type='single'
          collapsible={false}
          value={activePackage}
          onValueChange={handleValueChange}
          className='flex flex-col'
        >
          {packages.map((pkg) => (
            <AccordionItem
              key={pkg.id}
              value={pkg.id}
              className={cn(
                'border-0 transition-colors duration-300',
                activePackage === pkg.id ? 'flex-1 bg-primary' : 'bg-transparent hover:bg-muted/10'
              )}
            >
              <AccordionTrigger
                className={cn(
                  'flex cursor-pointer items-start justify-between px-6 py-4 uppercase hover:no-underline md:px-8 md:py-4 lg:px-10 lg:pr-16 [&>svg]:hidden',
                  activePackage === pkg.id ? 'text-primary-foreground' : 'text-muted'
                )}
              >
                <div className='flex flex-col items-start'>
                  <span
                    className={cn(
                      'font-orbitron text-base leading-8 font-light md:text-xl lg:text-2xl',
                      activePackage === pkg.id ? 'text-primary-foreground' : 'text-muted'
                    )}
                  >
                    {pkg.subtitle}
                  </span>
                  <span
                    className={cn(
                      'font-orbitron text-2xl leading-8 font-semibold md:text-3xl lg:text-[32px]',
                      activePackage === pkg.id ? 'text-primary-foreground' : 'text-muted'
                    )}
                  >
                    {pkg.title}
                  </span>
                </div>
                <span
                  className={cn(
                    'font-orbitron text-4xl leading-none font-normal md:text-5xl lg:text-[64px]',
                    activePackage === pkg.id ? 'text-primary-foreground' : 'text-muted-foreground'
                  )}
                >
                  {pkg.number}
                </span>
              </AccordionTrigger>
              <AccordionContent className='flex h-full flex-col justify-between px-6 pt-0 pb-4 md:px-8 lg:min-h-[304px] lg:px-10 lg:pr-16 2xl:min-h-[272px]'>
                <div className='flex flex-col gap-2'>
                  {/* Package description and price */}
                  <div className='flex w-full gap-2'>
                    <div className='flex-1'>
                      <p className='font-montserrat text-base leading-normal font-normal text-primary-foreground md:text-lg lg:text-xl'>
                        {pkg.description}
                      </p>
                    </div>
                    <div className='w-24 shrink-0 text-right md:w-32'>
                      <p className='font-montserrat text-base leading-normal font-normal text-primary-foreground md:text-lg lg:text-xl'>
                        od {pkg.price} zł
                      </p>
                    </div>
                  </div>
                </div>
                {/* Additional option */}
                {additionalOption && (
                  <div className='flex flex-col gap-1 pt-4'>
                    <p className='font-montserrat text-xs leading-normal font-normal text-primary-foreground'>
                      Dodatkowo
                    </p>
                    <div className='flex w-full items-center gap-3'>
                      <Checkbox
                        id={`additional-${pkg.id}`}
                        checked={isAdditionalOptionSelected}
                        onCheckedChange={(checked) => setIsAdditionalOptionSelected(checked === true)}
                        className='border-primary-foreground data-[state=checked]:bg-primary-foreground data-[state=checked]:text-primary'
                      />
                      <label
                        htmlFor={`additional-${pkg.id}`}
                        className='font-montserrat flex-1 cursor-pointer text-base leading-normal font-normal text-primary-foreground md:text-lg lg:text-xl'
                      >
                        {additionalOption.label}
                      </label>
                      <div className='shrink-0 text-right'>
                        <p className='font-montserrat text-base leading-normal font-normal text-primary-foreground md:text-lg lg:text-xl'>
                          +{additionalOption.price} zł
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Summary Section */}
      <div className='grid bg-primary-foreground'>
        <div className='flex items-center justify-between bg-primary px-6 py-6 md:px-8 lg:px-10 lg:pr-16'>
          <p className='font-orbitron text-2xl font-semibold text-primary-foreground uppercase md:text-3xl lg:text-[32px]'>
            Suma
          </p>
          <p className='font-orbitron text-2xl font-bold text-primary-foreground md:text-3xl lg:text-[40px]'>
            od {totalPrice} zł
          </p>
        </div>
      </div>
    </section>
  );
};
