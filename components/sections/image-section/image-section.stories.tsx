import type { Meta, StoryObj } from '@storybook/nextjs';
import Image from 'next/image';

import { ImageSection } from './image-section';

const meta = {
  title: 'Sections/ImageSection',
  component: ImageSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ImageSection>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample image URL
const sampleImageUrl = 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&h=600&fit=crop';

export const LeftLayout: Story = {
  args: {
    title: 'Polerowanie i zabezpieczanie lamp',
    description: (
      <p>
        Proces matowienia i polerowania lamp przednich lub tylnych ma na celu doprowadzenia ich do dużo lepszego stanu.
      </p>
    ),
    layout: 'left',
    image: <Image src={sampleImageUrl} alt='Polerowanie lamp samochodowych' fill className='object-cover' />,
  },
};

export const RightLayout: Story = {
  args: {
    title: 'Polerowanie i zabezpieczanie lamp',
    description: (
      <p>
        Proces matowienia i polerowania lamp przednich lub tylnych ma na celu doprowadzenia ich do dużo lepszego stanu.
      </p>
    ),
    layout: 'right',
    image: <Image src={sampleImageUrl} alt='Polerowanie lamp samochodowych' fill className='object-cover' />,
  },
};

export const WithLongerTitle: Story = {
  args: {
    title: 'Profesjonalne polerowanie i zabezpieczanie reflektorów samochodowych',
    description: (
      <p>
        Proces matowienia i polerowania lamp przednich lub tylnych ma na celu doprowadzenia ich do dużo lepszego stanu.
      </p>
    ),
    layout: 'left',
    image: <Image src={sampleImageUrl} alt='Polerowanie lamp samochodowych' fill className='object-cover' />,
  },
};
