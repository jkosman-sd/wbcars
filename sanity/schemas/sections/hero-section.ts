import { defineField, defineType } from 'sanity';

export const heroSection = defineType({
  name: 'heroSection',
  type: 'object',
  title: 'Hero Section',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Tytuł',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Opis',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'backgroundImage',
      type: 'image',
      title: 'Obraz tła',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Tekst alternatywny',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
});
