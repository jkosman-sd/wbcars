import type { Meta, StoryObj } from '@storybook/nextjs';

import { PLACEHOLDER_POSTS } from '@/lib/instagram';

import { InstagramSection } from './instagram-section';

const meta = {
  title: 'Sections/InstagramSection',
  component: InstagramSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof InstagramSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    heading: 'Śledź nas na Instagramie',
    profileHandle: 'wbcars_pl',
    posts: PLACEHOLDER_POSTS.slice(0, 6),
    showFollowButton: true,
  },
};

export const WithoutFollowButton: Story = {
  args: {
    heading: 'Śledź nas na Instagramie',
    profileHandle: 'wbcars_pl',
    posts: PLACEHOLDER_POSTS.slice(0, 6),
    showFollowButton: false,
  },
};

export const ThreePosts: Story = {
  args: {
    heading: 'Śledź nas na Instagramie',
    profileHandle: 'wbcars_pl',
    posts: PLACEHOLDER_POSTS.slice(0, 3),
    showFollowButton: true,
  },
};
