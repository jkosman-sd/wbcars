import { DocumentIcon } from '@sanity/icons/Document';
import { defineField, defineType } from 'sanity';

const POLISH_DIACRITICS: Record<string, string> = {
  ą: 'a',
  ć: 'c',
  ę: 'e',
  ł: 'l',
  ń: 'n',
  ó: 'o',
  ś: 's',
  ź: 'z',
  ż: 'z',
};

const slugifyPolish = (input: string) =>
  input
    .toLowerCase()
    .replace(/[ąćęłńóśźż]/g, (char) => POLISH_DIACRITICS[char] ?? char)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96);

export const articleType = defineType({
  name: 'article',
  type: 'document',
  title: 'Poradnik',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'type',
      type: 'string',
      title: 'Typ poradnika',
      description:
        'How-To — instrukcja krok po kroku. Use Case — konkretna, prawdziwa (lub realistyczna) sytuacja z realizacji pokazująca, kiedy dana usługa się opłaca — nie ogólnikowe porównanie.',
      options: {
        list: [
          { title: 'How-To (jak to zrobić)', value: 'how-to' },
          { title: 'Use Case (kiedy warto)', value: 'use-case' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Tytuł',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Adres URL artykułu (np. /poradniki/jak-dbac-o-powloke-ceramiczna). Generowany bez polskich znaków.',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: slugifyPolish,
        isUnique: (slug, context) => context.defaultIsUnique(slug, context),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      title: 'Zajawka / Meta opis',
      description: 'Krótki opis używany na liście poradników oraz jako meta description (120-160 znaków).',
      rows: 3,
      validation: (Rule) => Rule.required().min(50).max(160),
    }),
    defineField({
      name: 'coverImage',
      type: 'responsiveImage',
      title: 'Obrazek wyróżniający',
    }),
    defineField({
      name: 'body',
      type: 'blockContentSection',
      title: 'Treść',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Data publikacji',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'updatedAt',
      type: 'datetime',
      title: 'Data ostatniej aktualizacji',
      description: 'Uzupełnij, jeśli artykuł został zaktualizowany po publikacji.',
    }),
    defineField({
      name: 'noIndex',
      type: 'boolean',
      title: 'No Index',
      description: 'Zaznacz, aby ukryć artykuł przed wyszukiwarkami',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'type',
      slug: 'slug.current',
    },
    prepare({ title, subtitle, slug }) {
      const isHowTo = subtitle === 'how-to';
      const typeLabel = isHowTo ? 'How-To' : subtitle === 'use-case' ? 'Use Case' : subtitle;
      const hubPath = isHowTo ? '/poradniki' : '/kiedy-warto';
      return {
        title: title || 'Bez tytułu',
        subtitle: slug ? `${typeLabel} · ${hubPath}/${slug}` : typeLabel,
      };
    },
  },
});
