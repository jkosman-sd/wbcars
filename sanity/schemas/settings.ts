import { CogIcon } from '@sanity/icons/Cog';
import { defineField, defineType } from 'sanity';

export const settingsType = defineType({
  name: 'settings',
  type: 'document',
  title: 'Ustawienia',
  icon: CogIcon,
  groups: [
    {
      title: 'SEO & metadata',
      name: 'metadata',
    },
    {
      title: 'Nawigacja',
      name: 'navigation',
    },
    {
      title: 'Stopka',
      name: 'footer',
    },
    {
      title: 'Dokumenty prawne',
      name: 'legal',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Site title',
      group: 'metadata',
    }),
    defineField({
      title: 'URL',
      name: 'url',
      type: 'url',
      description: 'The main site url. Used to create canonical url',
      group: 'metadata',
    }),
    defineField({
      name: 'navigation',
      type: 'object',
      title: 'Nawigacja',
      group: 'navigation',
      fields: [
        defineField({
          name: 'navigationLinks',
          type: 'array',
          title: 'Linki nawigacyjne',
          description: 'Linki wyświetlane w głównym menu',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'label',
                  type: 'string',
                  title: 'Etykieta',
                  description: 'Tekst wyświetlany w menu',
                  validation: (Rule) => Rule.required().max(30),
                },
                {
                  name: 'href',
                  type: 'string',
                  title: 'Link',
                  description: 'Ścieżka URL (np. /o-nas, /galeria) lub pełny URL',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'external',
                  type: 'boolean',
                  title: 'Link zewnętrzny',
                  description: 'Zaznacz, jeśli link prowadzi poza stronę',
                  initialValue: false,
                },
                {
                  name: 'order',
                  type: 'number',
                  title: 'Kolejność',
                  description: 'Kolejność wyświetlania (1, 2, 3...)',
                  validation: (Rule) => Rule.required().integer().min(1),
                },
              ],
              preview: {
                select: {
                  title: 'label',
                  subtitle: 'href',
                  order: 'order',
                },
                prepare({ title, subtitle, order }) {
                  return {
                    title: `${order}. ${title}`,
                    subtitle: subtitle,
                  };
                },
              },
            },
          ],
          validation: (Rule) => Rule.required().min(1).max(6),
        }),
      ],
    }),
    defineField({
      name: 'phone',
      type: 'string',
      title: 'Contact Phone',
      group: 'footer',
    }),
    defineField({
      name: 'mail',
      type: 'string',
      title: 'Contact Email',
      group: 'footer',
    }),
    defineField({
      name: 'address',
      type: 'string',
      title: 'Adres',
      group: 'footer',
    }),
    defineField({
      name: 'nip',
      type: 'string',
      title: 'NIP',
      description: 'Numer Identyfikacji Podatkowej firmy. Używany w danych strukturalnych (LocalBusiness).',
      group: 'footer',
    }),
    defineField({
      name: 'openingHours',
      type: 'object',
      title: 'Godziny otwarcia',
      group: 'footer',
      fields: [
        defineField({
          name: 'days',
          type: 'string',
          title: 'Dni',
          description: 'Np. "Poniedziałek - Piątek"',
          initialValue: 'Poniedziałek - Piątek',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'from',
          type: 'string',
          title: 'Otwarte od',
          description: 'Format GG:MM, np. "08:00"',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'to',
          type: 'string',
          title: 'Otwarte do',
          description: 'Format GG:MM, np. "18:00"',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'footerImage',
      type: 'responsiveImage',
      title: 'Footer Showcase Image',
      description: 'Showcase image displayed in the footer (e.g., car photo)',
      group: 'footer',
    }),
    defineField({
      name: 'recommendedLinks',
      type: 'array',
      title: 'Polecane strony',
      group: 'footer',
      description:
        'Linki wyświetlane w stopce w sekcji "Polecane strony". Jeśli puste — sekcja nie pojawi się w stopce.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              type: 'string',
              title: 'Etykieta',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'href',
              type: 'url',
              title: 'URL',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: { title: 'label', subtitle: 'href' },
          },
        },
      ],
    }),
    defineField({
      group: 'footer',
      name: 'social',
      type: 'array',
      title: 'Social Links',
      description: 'Enter your Social Media URLs',
      validation: (Rule) => Rule.unique(),
      of: [
        {
          type: 'object',
          fields: [
            {
              type: 'string',
              name: 'media',
              title: 'Choose Social Media',
              options: {
                list: [
                  { title: 'Twitter', value: 'Twitter' },
                  { title: 'Facebook', value: 'Facebook' },
                  { title: 'Instagram', value: 'Instagram' },
                  { title: 'Linkedin', value: 'Linkedin' },
                  { title: 'Youtube', value: 'Youtube' },
                ],
              },
            },
            {
              type: 'url',
              name: 'url',
              title: 'Full Profile URL',
            },
          ],
          preview: {
            select: {
              title: 'media',
              subtitle: 'url',
            },
          },
        },
      ],
    }),
    defineField({
      title: 'Meta Description',
      name: 'description',
      group: 'metadata',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.min(120).max(160),
      description: 'Enter SEO Meta Description',
    }),
    defineField({
      name: 'openGraphImage',
      type: 'image',
      title: 'Open Graph Image',
      description: 'Image for sharing previews on Facebook, Twitter etc.',
      group: 'metadata',
    }),
    defineField({
      name: 'privacyPolicy',
      type: 'blockContentSection',
      title: 'Polityka prywatności',
      description: 'Wyświetlana pod adresem /polityka-prywatnosci. Jeśli puste — link nie pojawi się w stopce.',
      group: 'legal',
    }),
    defineField({
      name: 'termsOfService',
      type: 'blockContentSection',
      title: 'Regulamin',
      description: 'Wyświetlany pod adresem /regulamin. Jeśli puste — link nie pojawi się w stopce.',
      group: 'legal',
    }),
  ],
});
