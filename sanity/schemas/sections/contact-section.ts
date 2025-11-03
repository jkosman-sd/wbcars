import { defineField, defineType } from 'sanity';

export const contactSection = defineType({
  name: 'contactSection',
  type: 'object',
  title: 'Contact Section',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Tytuł',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      type: 'string',
      title: 'Telefon',
      description: 'Numer telefonu kontaktowego',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'address',
      type: 'string',
      title: 'Adres',
      description: 'Adres fizyczny firmy',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      type: 'string',
      title: 'Email',
      description: 'Adres email kontaktowy',
      validation: (Rule) => Rule.required().email(),
    }),
  ],
});
