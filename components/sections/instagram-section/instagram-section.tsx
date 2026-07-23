import { Instagram } from 'lucide-react';
import NextImage from 'next/image';

import { InstagramPost } from '@/lib/instagram';

export interface InstagramSectionProps {
  heading?: string;
  profileHandle: string;
  posts: InstagramPost[];
  showFollowButton?: boolean;
}

export const InstagramSection = ({
  heading,
  profileHandle,
  posts,
  showFollowButton = true,
}: InstagramSectionProps) => {
  const profileUrl = `https://instagram.com/${profileHandle}`;

  return (
    <section aria-label='Instagram' className='w-full bg-background'>
      <div>
        {heading && (
          <div className='mb-6'>
            <div className='h-0.5 w-full bg-primary' />
            <h2 className='mt-4 font-montserrat text-2xl font-medium uppercase leading-tight text-foreground md:text-3xl lg:text-[32px] lg:leading-8'>
              {heading}
            </h2>
          </div>
        )}

        <ul className='grid grid-cols-2 gap-6 lg:grid-cols-3'>
          {posts.map((post) => (
            <li key={post.id}>
              <a
                href={post.permalink}
                target='_blank'
                rel='noopener noreferrer'
                className='group relative block aspect-square overflow-hidden'
              >
                <NextImage
                  src={post.imageUrl}
                  alt={post.caption || `Post na Instagramie @${profileHandle}`}
                  fill
                  sizes='(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw'
                  className='object-cover transition-transform duration-500 group-hover:scale-[1.02]'
                />

                {post.caption && (
                  <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-12'>
                    <p className='line-clamp-2 font-montserrat text-xs leading-snug text-white/90'>
                      {post.caption}
                    </p>
                  </div>
                )}
              </a>
            </li>
          ))}
        </ul>

        {showFollowButton && (
          <div className='mt-6 flex justify-end'>
            <a
              href={profileUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 bg-primary px-6 py-4 font-montserrat text-lg font-semibold leading-normal text-[#1a1a1a] underline decoration-solid underline-offset-2 transition-transform hover:scale-[1.02]'
            >
              <Instagram className='size-5 text-[#1a1a1a]' aria-hidden='true' />
              Obserwuj nas na Instagramie
            </a>
          </div>
        )}
      </div>
    </section>
  );
};
