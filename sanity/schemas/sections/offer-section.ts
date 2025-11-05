import { defineField, defineType } from 'sanity';

export const offerSection = defineType({
  name: 'offerSection',
  type: 'object',
  title: 'Offer Section',
  fields: [
    defineField({
      name: 'packages',
      type: 'array',
      title: 'Pakiety',
      description: 'Lista pakietów usług (maksymalnie 3)',
      validation: (Rule) => Rule.required().min(1).max(3),
      of: [
        {
          type: 'object',
          title: 'Pakiet',
          fields: [
            defineField({
              name: 'number',
              type: 'string',
              title: 'Numer',
              description: 'Np. ".01", ".02", ".03"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'subtitle',
              type: 'string',
              title: 'Podtytuł',
              description: 'Np. "Pakiet"',
              initialValue: 'Pakiet',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              type: 'string',
              title: 'Tytuł',
              description: 'Np. "OPTIMUM", "FULL FRONT"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              type: 'text',
              title: 'Opis',
              description: 'Opis usług zawartych w pakiecie',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'price',
              type: 'number',
              title: 'Cena',
              description: 'Cena w zł (tylko liczba, np. 100)',
              validation: (Rule) => Rule.required().min(0),
            }),
            defineField({
              name: 'image',
              type: 'responsiveImage',
              title: 'Obrazek samochodu',
              description: 'Obrazek z podświetlonymi częściami dla tego pakietu',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'number',
              media: 'image',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'additionalOption',
      type: 'object',
      title: 'Opcja dodatkowa',
      description: 'Np. "Powłoka ceramiczna"',
      fields: [
        defineField({
          name: 'label',
          type: 'string',
          title: 'Etykieta',
          description: 'Np. "Zabezpieczenie powłoką ceramiczną"',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'price',
          type: 'number',
          title: 'Cena',
          description: 'Cena w zł (tylko liczba, np. 100)',
          validation: (Rule) => Rule.required().min(0),
        }),
      ],
    }),
    defineField({
      name: 'defaultOpenPackage',
      type: 'number',
      title: 'Domyślnie otwarty pakiet',
      description: 'Indeks pakietu otwartego domyślnie (0 = pierwszy, 1 = drugi, 2 = trzeci)',
      validation: (Rule) => Rule.min(0).max(2),
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      packages: 'packages',
    },
    prepare({ packages }) {
      return {
        title: 'Offer Section',
        subtitle: `${packages?.length || 0} pakietów`,
      };
    },
  },
});
