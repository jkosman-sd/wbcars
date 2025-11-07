import { PhoneCall, Building2, Mail, Facebook, Instagram } from 'lucide-react';

import { ResponsiveImage } from '@/components/ui/image/image';

export interface FooterProps {
  logo: React.ReactNode;
  showcaseImage: React.ReactNode;
  contact: {
    phone: string;
    address: string;
    email: string;
  };
  socialLinks: Array<{
    platform: 'Facebook' | 'Instagram' | 'Twitter' | 'Linkedin' | 'Youtube';
    url: string;
  }>;
}

export function Footer({ logo, showcaseImage, contact, socialLinks }: FooterProps) {
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'Facebook':
        return (
          <div className='flex h-[59px] w-[59px] items-center justify-center rounded-full bg-white transition-colors hover:bg-primary'>
            <Facebook size={30} className='text-secondary transition-colors' />
          </div>
        );
      case 'Instagram':
        return (
          <div className='flex h-[59px] w-[59px] items-center justify-center rounded-full bg-white transition-colors hover:bg-primary'>
            <Instagram size={30} className='text-secondary transition-colors' />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <footer className='bg-secondary'>
      <div className='px-4 py-16 md:px-16 lg:px-[62px] lg:py-[84px]'>
        <div className='mx-auto max-w-[1200px]'>
          {/* Main Content */}
          <div className='flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-8'>
            {/* Left Column - Logo, Line, Showcase Image */}
            <div className='flex flex-col gap-6 lg:w-[350px] lg:shrink-0 lg:gap-8'>
              {/* Logo */}
              <div className='h-16 w-full lg:h-[92px]'>{logo}</div>

              {/* Decorative Line */}
              <div className='h-px w-full bg-gradient-to-r from-primary to-transparent'></div>

              {/* Showcase Image */}
              <div className='h-64 w-full max-w-[312px] lg:h-[305px] lg:w-[312px]'>{showcaseImage}</div>
            </div>

            {/* Right Column - Contact Info */}
            <div className='flex flex-col justify-start lg:max-w-[869px] lg:pt-16'>
              <div className='flex flex-col gap-2'>
                {/* Contact Header */}
                <div className='mb-2'>
                  <h2 className='font-montserrat text-2xl font-bold tracking-[3.2px] text-primary uppercase lg:text-[32px]'>
                    Kontakt
                  </h2>
                </div>

                {/* Contact Items */}
                <div className='flex flex-col gap-3'>
                  {/* Phone */}
                  <div className='flex items-center gap-2'>
                    <PhoneCall size={24} className='shrink-0 text-white' />
                    <p className='font-montserrat text-sm tracking-[0.48px] text-white uppercase lg:text-base'>
                      Telefon: {contact.phone}
                    </p>
                  </div>

                  {/* Address */}
                  <div className='flex items-center gap-2'>
                    <Building2 size={24} className='shrink-0 text-white' />
                    <p className='font-montserrat text-sm tracking-[0.48px] text-white uppercase lg:text-base'>
                      Adres: {contact.address}
                    </p>
                  </div>

                  {/* Email */}
                  <div className='flex items-center gap-2'>
                    <Mail size={24} className='shrink-0 text-white' />
                    <p className='font-montserrat text-sm tracking-[0.48px] text-white uppercase lg:text-base'>
                      Mail:{' '}
                      <a
                        href={`mailto:${contact.email}`}
                        className='underline decoration-solid underline-offset-2 transition-colors hover:text-primary'
                      >
                        {contact.email}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - Follow Us & Social */}
          <div className='mt-6 flex flex-col items-start justify-between gap-4 lg:mt-8 lg:flex-row lg:items-center'>
            {/* Follow Us Text */}
            <div>
              <h3 className='font-michroma text-3xl font-semibold text-white uppercase lg:text-[48px] lg:leading-none'>
                Follow us
              </h3>
            </div>

            {/* Social Links */}
            <div className='flex gap-3'>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='transition-transform hover:scale-110'
                  aria-label={`Follow us on ${social.platform}`}
                >
                  {getSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
