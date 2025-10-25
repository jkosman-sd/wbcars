import React from 'react';

export interface SubheadingSectionProps {
  text: string;
}

export const SubheadingSection = (props: SubheadingSectionProps) => {
  const { text } = props;

  return <h2 className='font-orbitron py-4 text-[40px] leading-none font-semibold text-primary uppercase'>{text}</h2>;
};
