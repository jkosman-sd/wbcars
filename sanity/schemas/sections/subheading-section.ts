import { defineField, defineType } from 'sanity';

export const subheadingSection = defineType({
  name: 'subheadingSection',
  type: 'object',
  title: 'Subheading Section',
  fields: [
    defineField({
      name: 'text',
      type: 'string',
      title: 'Subheading Text',
      description: 'The subheading text to display',
      validation: (Rule) => Rule.required().max(100),
    }),
  ],
  preview: {
    select: {
      text: 'text',
    },
    prepare({ text }) {
      return {
        title: text || 'Subheading',
        subtitle: 'Subheading Section',
      };
    },
  },
});
