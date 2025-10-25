import type { Meta, StoryObj } from '@storybook/nextjs';

import { SubheadingSection } from './subheading-section';

const meta: Meta<typeof SubheadingSection> = {
  title: 'Sections/SubheadingSection',
  component: SubheadingSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SubheadingSection>;

export const Default: Story = {
  args: {
    text: 'O nas',
  },
};

export const LongText: Story = {
  args: {
    text: 'Nasze Usługi i Realizacje',
  },
};

export const ShortText: Story = {
  args: {
    text: 'Portfolio',
  },
};

export const WithPolishCharacters: Story = {
  args: {
    text: 'Współpraca',
  },
};
