import type { Meta, StoryObj } from '@storybook/nextjs';

import type { InstagramPost } from '@/lib/instagram';

import { InstagramSection } from './instagram-section';

const MOCK_POSTS: InstagramPost[] = Array.from({ length: 6 }, (_, i) => ({
  id: `mock-${i + 1}`,
  caption: 'Świeżo po pełnym detailingu — lakier lśni jak nowy. ✨ #detailing #wbcars',
  mediaType: i === 2 ? 'VIDEO' : 'IMAGE',
  mediaUrl: `https://picsum.photos/600/600?random=${i + 1}`,
  thumbnailUrl: `https://picsum.photos/600/600?random=${i + 1}`,
  permalink: `https://instagram.com/p/mock-${i + 1}`,
  timestamp: new Date(Date.now() - i * 86_400_000).toISOString(),
}));

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
    posts: MOCK_POSTS,
    showFollowButton: true,
  },
};

export const WithoutFollowButton: Story = {
  args: {
    heading: 'Śledź nas na Instagramie',
    profileHandle: 'wbcars_pl',
    posts: MOCK_POSTS,
    showFollowButton: false,
  },
};

export const ThreePosts: Story = {
  args: {
    heading: 'Śledź nas na Instagramie',
    profileHandle: 'wbcars_pl',
    posts: MOCK_POSTS.slice(0, 3),
    showFollowButton: true,
  },
};

export const Empty: Story = {
  args: {
    heading: 'Śledź nas na Instagramie',
    profileHandle: 'wbcars_pl',
    posts: [],
    showFollowButton: true,
  },
};
