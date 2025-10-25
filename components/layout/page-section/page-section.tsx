import React from 'react';

import { cn } from '@/lib/utils';

interface PageSectionProps {
  children: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  id?: string;
}

export const PageSection = ({ children, fullWidth, className, id }: PageSectionProps) => {
  return (
    <section id={id} className={cn('w-full', fullWidth ? 'px-0' : 'px-2 md:px-4 xl:px-0', className)}>
      <div className={cn('m-auto', 'w-full', fullWidth ? 'max-w-full' : 'max-w-7xl')}>{children}</div>
    </section>
  );
};
