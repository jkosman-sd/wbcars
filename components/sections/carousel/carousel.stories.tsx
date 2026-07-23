import type { Meta, StoryObj } from '@storybook/nextjs';
import { Instagram } from 'lucide-react';
import Image from 'next/image';

import { Carousel } from './carousel';

const meta: Meta<typeof Carousel> = {
  title: 'Sections/Carousel',
  component: Carousel,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

// Mock car image component
const MockCarImage = ({ index }: { index: number }) => (
  <div className='relative size-full bg-muted'>
    <Image src={`https://picsum.photos/seed/${index}/800/800`} alt={`Car ${index + 1}`} fill className='object-cover' />
  </div>
);

export const Default: Story = {
  args: {
    items: [
      {
        type: 'image',
        image: <MockCarImage index={1} />,
        alt: 'BMW M4 niebieski z złotymi felgami',
      },
      {
        type: 'image',
        image: <MockCarImage index={2} />,
        alt: 'BMW M4 widok z boku',
      },
      {
        type: 'cta',
        text: 'Po więcej zapraszamy na nasze konto na instagramie',
        url: 'https://www.instagram.com/wbcarstarnow/',
        icon: <Instagram className='size-8 text-primary' />,
      },
      {
        type: 'image',
        image: <MockCarImage index={3} />,
        alt: 'BMW M4 widok z przodu',
      },
      {
        type: 'image',
        image: <MockCarImage index={4} />,
        alt: 'BMW M4 wnętrze',
      },
    ],
  },
};

export const ImagesOnly: Story = {
  args: {
    items: [
      {
        type: 'image',
        image: <MockCarImage index={1} />,
        alt: 'BMW M4 niebieski z złotymi felgami',
      },
      {
        type: 'image',
        image: <MockCarImage index={2} />,
        alt: 'BMW M4 widok z boku',
      },
      {
        type: 'image',
        image: <MockCarImage index={3} />,
        alt: 'BMW M4 widok z przodu',
      },
      {
        type: 'image',
        image: <MockCarImage index={4} />,
        alt: 'BMW M4 wnętrze',
      },
      {
        type: 'image',
        image: <MockCarImage index={5} />,
        alt: 'BMW M4 tylne światła',
      },
    ],
  },
};

export const SingleImage: Story = {
  args: {
    items: [
      {
        type: 'image',
        image: <MockCarImage index={1} />,
        alt: 'BMW M4 niebieski z złotymi felgami',
      },
    ],
  },
};

export const ManyImages: Story = {
  args: {
    items: [
      {
        type: 'image',
        image: <MockCarImage index={1} />,
        alt: 'BMW M4 image 1',
      },
      {
        type: 'image',
        image: <MockCarImage index={2} />,
        alt: 'BMW M4 image 2',
      },
      {
        type: 'cta',
        text: 'Po więcej zapraszamy na nasze konto na instagramie',
        url: 'https://www.instagram.com/wbcarstarnow/',
        icon: <Instagram className='size-8 text-primary' />,
      },
      {
        type: 'image',
        image: <MockCarImage index={3} />,
        alt: 'BMW M4 image 3',
      },
      {
        type: 'image',
        image: <MockCarImage index={4} />,
        alt: 'BMW M4 image 4',
      },
      {
        type: 'image',
        image: <MockCarImage index={5} />,
        alt: 'BMW M4 image 5',
      },
      {
        type: 'image',
        image: <MockCarImage index={6} />,
        alt: 'BMW M4 image 6',
      },
      {
        type: 'image',
        image: <MockCarImage index={7} />,
        alt: 'BMW M4 image 7',
      },
      {
        type: 'image',
        image: <MockCarImage index={8} />,
        alt: 'BMW M4 image 8',
      },
    ],
  },
};
