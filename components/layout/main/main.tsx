import React, { ReactNode } from 'react';

interface MainProps {
  children: ReactNode;
}

export const Main = ({ children }: MainProps) => {
  return (
    <main className='flex-1'>
      <article>{children}</article>
    </main>
  );
};
