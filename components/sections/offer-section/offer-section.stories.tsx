import type { Meta, StoryObj } from '@storybook/nextjs';

import { OfferSection } from './offer-section';

const meta: Meta<typeof OfferSection> = {
  title: 'Sections/OfferSection',
  component: OfferSection,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof OfferSection>;

const mockPackages = [
  {
    id: '.01',
    number: '.01',
    subtitle: 'Pakiet',
    title: 'OPTIMUM',
    description: 'Lampy przód, wnęki klamek, progi wewnętrzne, ranty drzwi, parapet zderzaka tylnego.',
    price: 100,
    image: (
      <div className='flex size-full items-center justify-center bg-linear-to-br from-gray-700 to-gray-900'>
        <div className='text-center'>
          <p className='font-orbitron text-3xl font-bold text-primary'>OPTIMUM</p>
          <p className='text-sm text-gray-400'>755 x 474</p>
        </div>
      </div>
    ),
  },
  {
    id: '.02',
    number: '.02',
    subtitle: 'Pakiet',
    title: 'FULL FRONT',
    description:
      'Zderzak przód, błotniki, maska, lampy przód, lusterka, słupki A, nadszybie, wnęki klamek, parapet zderzaka tylnego.',
    price: 200,
    image: (
      <div className='flex size-full items-center justify-center bg-linear-to-br from-amber-700 to-orange-900'>
        <div className='text-center'>
          <p className='font-orbitron text-3xl font-bold text-primary'>FULL FRONT</p>
          <p className='text-sm text-gray-400'>755 x 474</p>
        </div>
      </div>
    ),
  },
  {
    id: '.03',
    number: '.03',
    subtitle: 'Pakiet',
    title: 'FULL BODY',
    description: 'Całościowe oklejenie samochodu.',
    price: 300,
    image: (
      <div className='flex size-full items-center justify-center bg-linear-to-br from-yellow-600 to-amber-700'>
        <div className='text-center'>
          <p className='font-orbitron text-3xl font-bold text-primary-foreground'>FULL BODY</p>
          <p className='text-sm text-gray-700'>755 x 474</p>
        </div>
      </div>
    ),
  },
];

export const Default: Story = {
  args: {
    packages: mockPackages,
    additionalOption: {
      label: 'Zabezpieczenie powłoką ceramiczną',
      price: 100,
    },
    defaultOpenPackage: '.01',
  },
};

export const WithoutAdditionalOption: Story = {
  args: {
    packages: mockPackages,
    defaultOpenPackage: '.01',
  },
};

export const SecondPackageOpen: Story = {
  args: {
    packages: mockPackages,
    additionalOption: {
      label: 'Zabezpieczenie powłoką ceramiczną',
      price: 100,
    },
    defaultOpenPackage: '.02',
  },
};

export const ThirdPackageOpen: Story = {
  args: {
    packages: mockPackages,
    additionalOption: {
      label: 'Zabezpieczenie powłoką ceramiczną',
      price: 100,
    },
    defaultOpenPackage: '.03',
  },
};

export const Mobile: Story = {
  args: {
    packages: mockPackages,
    additionalOption: {
      label: 'Zabezpieczenie powłoką ceramiczną',
      price: 100,
    },
    defaultOpenPackage: '.01',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
