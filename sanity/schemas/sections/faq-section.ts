import { defineArrayMember, defineField, defineType } from 'sanity';

export const faqSection = defineType({
  name: 'faqSection',
  type: 'object',
  title: 'FAQ Section',
  fields: [
    defineField({
      name: 'items',
      type: 'array',
      title: 'Pytania i odpowiedzi',
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Pytanie',
          fields: [
            defineField({
              name: 'question',
              type: 'string',
              title: 'Pytanie',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'answer',
              type: 'blockContentSection',
              title: 'Odpowiedź',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'question' },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: 'items.0.question' },
    prepare({ title }) {
      return { title: title ? `FAQ: ${title}` : 'FAQ Section' };
    },
  },
});
