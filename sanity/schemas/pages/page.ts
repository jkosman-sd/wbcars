import { DocumentIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const pageType = defineType({
  name: 'page',
  type: 'document',
  title: 'Strona',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Tytuł strony',
      description: 'Tytuł strony wyświetlany w nagłówku i kartach przeglądarki',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Unikalny identyfikator URL strony',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (slug, context) => context.defaultIsUnique(slug, context),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'metadata',
      type: 'object',
      title: 'Metadata SEO',
      description: 'Metadata do optymalizacji SEO',
      fields: [
        defineField({
          name: 'metaTitle',
          type: 'string',
          title: 'Meta Tytuł',
          description: 'Tytuł wyświetlany w wynikach wyszukiwania (zalecane: 50-60 znaków)',
          validation: (Rule) => Rule.max(60),
        }),
        defineField({
          name: 'metaDescription',
          type: 'text',
          title: 'Meta Opis',
          description: 'Opis wyświetlany w wynikach wyszukiwania (zalecane: 150-160 znaków)',
          rows: 3,
          validation: (Rule) => Rule.max(160),
        }),
        defineField({
          name: 'keywords',
          type: 'array',
          title: 'Słowa kluczowe',
          description: 'Słowa kluczowe SEO',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags',
          },
        }),
        defineField({
          name: 'ogImage',
          type: 'image',
          title: 'Open Graph Image',
          description: 'Obrazek wyświetlany przy udostępnianiu w mediach społecznościowych',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Tekst alternatywny',
            }),
          ],
        }),
        defineField({
          name: 'noIndex',
          type: 'boolean',
          title: 'No Index',
          description: 'Zaznacz, aby ukryć stronę przed wyszukiwarkami',
          initialValue: false,
        }),
      ],
    }),
    defineField({
      name: 'sections',
      type: 'array',
      title: 'Sekcje',
      description: 'Lista sekcji budujących zawartość strony',
      of: [
        { type: 'heroSection' },
        { type: 'imageSection' },
        { type: 'contactSection' },
        { type: 'subheadingSection' },
        { type: 'carouselSection' },
        { type: 'offerSection' },
        // Możesz tutaj dodać więcej typów sekcji w przyszłości
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare({ title, slug }) {
      return {
        title: title || 'Bez tytułu',
        subtitle: slug ? `/${slug}` : 'Brak sluga',
      };
    },
  },
});
