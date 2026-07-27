import { PageSectionItem } from '@/components/cms/page/sanity-page';
import { PageSection } from '@/components/layout/page-section/page-section';
import { InstagramSection } from '@/components/sections/instagram-section/instagram-section';
import { getInstagramPosts } from '@/lib/instagram';

type SanityInstagramSectionProps = PageSectionItem<'instagramSection'>;

export const SanityInstagramSection = async (props: SanityInstagramSectionProps) => {
  const { heading, profileHandle, postCount, showFollowButton } = props;

  const posts = await getInstagramPosts(postCount);

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
