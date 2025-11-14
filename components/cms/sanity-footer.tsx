import { Footer } from '@/components/sections/footer/footer';
import { ResponsiveImage } from '@/components/ui/image/image';
import { SettingsQueryResult } from '@/components/cms/sanity-types';
import Image from 'next/image';

type SanityFooterData = SettingsQueryResult;

export function SanityFooter(props: SanityFooterData) {
  if (!props) {
    return null;
  }

  // Używaj statycznego logo
  const logoComponent = (
    <div className='relative h-full w-full'>
      <Image src='/images/wb-cars-logo.svg' alt='WB Cars Logo' fill className='object-contain object-left' priority />
    </div>
  );

  console.log(props.footerImage);
  // Renderuj showcase image z Sanity lub fallback
  const showcaseImageComponent = props.footerImage?.image?.asset ? (
    <ResponsiveImage
      loaderType='sanity'
      image={props.footerImage.image}
      aspectRatio={props.footerImage.aspectRatio as any}
      alt={props.footerImage.image.alt || 'Footer showcase image'}
    />
  ) : (
    <div className='flex h-full w-full items-center justify-center rounded-[10px] bg-gray-200'>
      <span className='text-gray-500'>No Image</span>
    </div>
  );

  return (
    <Footer
      logo={logoComponent}
      showcaseImage={showcaseImageComponent}
      contact={{
        phone: props.phone || '',
        address: props.address || '',
        email: props.mail || '',
      }}
      socialLinks={
        props.social
          ?.map((social) => ({
            platform: social.media as 'Facebook' | 'Instagram' | 'Twitter' | 'Linkedin' | 'Youtube',
            url: social.url || '',
          }))
          .filter((social) => social.url) || []
      }
    />
  );
}
