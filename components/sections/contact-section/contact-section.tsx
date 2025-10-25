import React from 'react';

import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface ContactItem {
  icon: 'Phone' | 'House' | 'Mail';
  label: string;
  value: string;
  isLink?: boolean;
}

interface ContactSectionProps {
  title: string;
  phone: string;
  address: string;
  email: string;
}

export const ContactSection = (props: ContactSectionProps) => {
  const { title, phone, address, email } = props;

  const contactItems: ContactItem[] = [
    {
      icon: 'Phone',
      label: 'Telefon:',
      value: phone,
      isLink: false,
    },
    {
      icon: 'House',
      label: 'Adres:',
      value: address,
      isLink: false,
    },
    {
      icon: 'Mail',
      label: 'Mail:',
      value: email,
      isLink: true,
    },
  ];

  return (
    <section className='bg-primary px-4 py-12 md:px-12 md:py-12 lg:px-16 lg:py-12'>
      <div className='mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-start lg:justify-between'>
        {/* Title */}
        <h2 className='font-orbitron text-3xl leading-normal font-semibold text-background uppercase md:text-4xl lg:w-[533px] lg:shrink-0 lg:text-[48px] lg:leading-normal'>
          {title}
        </h2>

        {/* Contact Items */}
        <div className='flex flex-col lg:justify-between lg:self-stretch'>
          {contactItems.map((item, index) => (
            <div key={index} className='flex grow basis-0 items-center gap-2'>
              <div className='relative size-6 shrink-0'>
                <Icon name={item.icon} size={24} color='#1a1a1a' />
              </div>
              <p className='font-montserrat text-base leading-[1.55] font-normal tracking-[0.03em] text-background uppercase'>
                <span>{item.label} </span>
                {item.isLink ? (
                  <a href={`mailto:${item.value}`} className='underline decoration-solid hover:no-underline'>
                    {item.value}
                  </a>
                ) : (
                  <span>{item.value}</span>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
