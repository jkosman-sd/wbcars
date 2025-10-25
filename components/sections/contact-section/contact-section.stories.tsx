import type { Meta, StoryObj } from '@storybook/nextjs';

import { ContactSection } from './contact-section';

const meta = {
  title: 'Sections/ContactSection',
  component: ContactSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ContactSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Skontaktuj się z nami',
    phone: '+48 577 211 777',
    address: 'Tarnów, ul. Gliniańska 12b',
    email: 'wbcarss@gmail.com',
  },
};

export const DifferentData: Story = {
  args: {
    title: 'Napisz do nas',
    phone: '+48 123 456 789',
    address: 'Kraków, ul. Przykładowa 1',
    email: 'kontakt@example.com',
  },
};

export const LongTitle: Story = {
  args: {
    title: 'Skontaktuj się z nami już dziś',
    phone: '+48 577 211 777',
    address: 'Tarnów, ul. Gliniańska 12b',
    email: 'wbcarss@gmail.com',
  },
};
