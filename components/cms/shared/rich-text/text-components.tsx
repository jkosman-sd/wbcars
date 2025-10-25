import Link from 'next/link';
import { PortableTextComponents } from 'next-sanity';

export const textComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className='text-2xl'>{children}</h1>,
    h2: ({ children }) => <h2 className='text-xl font-semibold'>{children}</h2>,
    h3: ({ children }) => <h3 className='text-lg font-medium'>{children}</h3>,
    h4: ({ children }) => <h4 className='text-base font-normal'>{children}</h4>,
    blockquote: ({ children }) => <blockquote className='border-l-purple-500'>{children}</blockquote>,
    normal: ({ children }) => (
      <div className='mt-3'>
        <p>{children}</p>
      </div>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className='mt-xl my-6 ml-6 list-disc [&>li]:mt-2'>{children}</ul>,
    number: ({ children }) => <ol className='mt-lg list-decimal [&>li]:mb-4 [&>li]:ml-4'>{children}</ol>,
  },
  marks: {
    anchor: ({ children, value }) => (
      <Link className='font-bold text-primary hover:underline' href={`#`}>
        {children}
      </Link>
    ),
    strong: ({ children }) => <strong className='font-bold'>{children}</strong>,
    s: ({ children }) => <s className='line-through'>{children}</s>,
    u: ({ children }) => <u className='underline'>{children}</u>,
    mailTo: ({ children, value }) => {
      return (
        <a href={`mailto:${value.mailAddress}`} className='font-bold text-primary hover:underline'>
          {children}
        </a>
      );
    },
    phonenumber: ({ children, value }) => {
      return (
        <a href={`tel:${value.phoneNumber.replace(/\s/g, '')}`} className='font-bold text-primary hover:underline'>
          {children}
        </a>
      );
    },
  },
};
