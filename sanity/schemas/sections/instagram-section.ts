import { defineField, defineType } from 'sanity';

export const instagramSection = defineType({
  name: 'instagramSection',
  type: 'object',
  title: 'Instagram Section',
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Nagłówek',
      description: 'Tytuł sekcji, np. "Śledź nas na Instagramie"',
    }),
    defineField({
      name: 'profileHandle',
      type: 'string',
      title: 'Nazwa profilu',
      description: 'Nazwa profilu Instagram bez @, np. "wbcars_pl"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'postCount',
      type: 'number',
      title: 'Liczba postów',
      description: 'Ile ostatnich postów wyświetlić (1-12)',
      initialValue: 3,
      validation: (Rule) => Rule.required().min(1).max(12).integer(),
    }),
    defineField({
      name: 'showFollowButton',
      type: 'boolean',
      title: 'Pokaż przycisk obserwowania',
      description: 'Czy wyświetlić przycisk z linkiem do profilu',
      initialValue: true,
    }),
  ],
  preview: {
    select: { heading: 'heading', profileHandle: 'profileHandle' },
    prepare({ heading, profileHandle }) {
      return {
        title: heading || 'Instagram Section',
        subtitle: profileHandle ? `@${profileHandle}` : undefined,
      };
    },
  },
});
