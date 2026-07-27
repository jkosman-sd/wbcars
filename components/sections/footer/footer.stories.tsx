import type { Meta, StoryObj } from '@storybook/nextjs';
import Image from 'next/image';

import { ResponsiveImage } from '@/components/ui/image/image';

import { Footer } from './footer';

const meta: Meta<typeof Footer> = {
  title: 'Sections/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#121212',
        },
      ],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {
    logo: (
      <div className='relative h-full w-full'>
        <Image src='/images/wb-cars-logo.svg' alt='WB Cars Logo' fill className='object-contain object-left' />
      </div>
    ),
    showcaseImage: (
      <ResponsiveImage
        src='http://localhost:3845/assets/89ca914e1cb1c12985b42a8d712f08000343c39c.png'
        alt='Blue BMW M4 car showcase'
        aspectRatio='4/3'
        loaderType='external'
      />
    ),
    contact: {
      phone: '+48 577 211 777',
      address: 'Tarnów, ul. Gliniańska 12b',
      email: 'wbcarss@gmail.com',
    },
    socialLinks: [
      {
        platform: 'Facebook' as const,
        url: 'https://facebook.com/wbcars',
      },
      {
        platform: 'Instagram' as const,
        url: 'https://instagram.com/wbcars',
      },
    ],
  },
};

export const WithCustomContent: Story = {
  args: {
    logo: (
      <div className='relative h-full w-full'>
        <Image src='/images/wb-cars-logo.svg' alt='WB Cars Logo' fill className='object-contain object-left' />
      </div>
    ),
    showcaseImage: (
      <ResponsiveImage
        src='http://localhost:3845/assets/89ca914e1cb1c12985b42a8d712f08000343c39c.png'
        alt='Custom car showcase'
        aspectRatio='4/3'
        loaderType='external'
      />
    ),
    contact: {
      phone: '+1 234 567 890',
      address: 'New York, NY 10001',
      email: 'contact@example.com',
    },
    socialLinks: [
      {
        platform: 'Facebook' as const,
        url: 'https://facebook.com/example',
      },
      {
        platform: 'Instagram' as const,
        url: 'https://instagram.com/example',
      },
    ],
  },
};

export const SingleSocialLink: Story = {
  args: {
    ...Default.args,
    socialLinks: [
      {
        platform: 'Instagram' as const,
        url: 'https://instagram.com/wbcars',
      },
    ],
  },
};
