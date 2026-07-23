import { PageSectionItem } from '@/components/cms/page/sanity-page';
import { PageSection } from '@/components/layout/page-section/page-section';
import { InstagramSection } from '@/components/sections/instagram-section/instagram-section';
import { getInstagramPosts, InstagramPost, PLACEHOLDER_POSTS } from '@/lib/instagram';

type SanityInstagramSectionProps = PageSectionItem<'instagramSection'>;

export const SanityInstagramSection = async (props: SanityInstagramSectionProps) => {
  const { heading, profileHandle, postCount, showFollowButton } = props;

  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  let posts: InstagramPost[];

  if (accessToken) {
    try {
      posts = await getInstagramPosts(accessToken, postCount);
    } catch {
      posts = PLACEHOLDER_POSTS.slice(0, postCount);
    }
  } else {
    posts = PLACEHOLDER_POSTS.slice(0, postCount);
  }

  return (
    <PageSection key={props._key}>
      <InstagramSection
        heading={heading ?? undefined}
        profileHandle={profileHandle}
        posts={posts}
        showFollowButton={showFollowButton ?? undefined}
      />
    </PageSection>
  );
};
