import type { Meta, StoryObj } from '@storybook/nextjs';
import Image from 'next/image';

import { HeroSection } from './hero-section';

const meta = {
  title: 'Sections/HeroSection',
  component: HeroSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HeroSection>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample car image URL
const sampleImageUrl = 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&h=1080&fit=crop&q=80';

export const Default: Story = {
  args: {
    title: 'Detailing bez kompromisów',
    description:
      'Ceramiczna ochrona, samoregenerujące folie, perfekcyjny lakier i czyste wnętrze. Twój samochód zasługuje na najlepszy detailing.',
    backgroundImage: <Image src={sampleImageUrl} alt='Samochód sportowy' fill className='object-cover object-center' />,
  },
};

export const ShortTitle: Story = {
  args: {
    title: 'Premium Detailing',
    description:
      'Ceramiczna ochrona, samoregenerujące folie, perfekcyjny lakier i czyste wnętrze. Twój samochód zasługuje na najlepszy detailing.',
    backgroundImage: <Image src={sampleImageUrl} alt='Samochód sportowy' fill className='object-cover object-center' />,
  },
};

export const LongDescription: Story = {
  args: {
    title: 'Detailing bez kompromisów',
    description:
      'Oferujemy kompleksowe usługi detailingu samochodowego. Ceramiczna ochrona lakieru, samoregenerujące folie PPF, profesjonalne polerowanie, химчистка wnętrza oraz wiele innych usług premium. Twój samochód zasługuje na najwyższą jakość obsługi i ochrony.',
    backgroundImage: <Image src={sampleImageUrl} alt='Samochód sportowy' fill className='object-cover object-center' />,
  },
};
