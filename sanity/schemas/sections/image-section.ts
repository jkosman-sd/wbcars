import { defineField, defineType } from 'sanity';

export const imageSection = defineType({
  name: 'imageSection',
  type: 'object',
  title: 'Image Section',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Tytuł',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      type: 'blockContentSection',
      title: 'Tekst',
      validation: (Rule) => Rule.required(),
      hidden: () => false,
    }),
    defineField({
      name: 'image',
      type: 'responsiveImage',
      title: 'Grafika',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'layout',
      type: 'string',
      title: 'Układ',
      options: {
        list: [
          { title: 'Lewy', value: 'left' },
          { title: 'Prawy', value: 'right' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fullWidth',
      type: 'boolean',
      title: 'Pełna szerokość',
      description: 'Sekcja zajmie całą dostępną szerokość sekcji',
      initialValue: false,
    }),
  ],
});
