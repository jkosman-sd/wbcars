import { CogIcon } from '@sanity/icons';
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
      title: 'Polityka prywatności',
      name: 'privacyPolicy',
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
      name: 'footerImage',
      type: 'responsiveImage',
      title: 'Footer Showcase Image',
      description: 'Showcase image displayed in the footer (e.g., car photo)',
      group: 'footer',
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
      title: 'Meta Keywords',
      name: 'keywords',
      group: 'metadata',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required(),
      description: 'Enter SEO Meta Keywords',
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
      group: 'privacyPolicy',
      validation: (Rule) => Rule.required(),
    }),
  ],
});
