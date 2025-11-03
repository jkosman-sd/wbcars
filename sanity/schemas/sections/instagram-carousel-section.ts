import { defineField, defineType } from 'sanity';

export const instagramCarouselSection = defineType({
  name: 'instagramCarouselSection',
  type: 'object',
  title: 'Instagram Carousel Section',
  fields: [
    defineField({
      name: 'images',
      type: 'array',
      title: 'Instagram Images',
      description: 'Add up to 15 images for the Instagram carousel',
      validation: (Rule) => Rule.required().min(1).max(15),
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              description: 'Alternative text for accessibility',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'aspectRatio',
              type: 'string',
              title: 'Aspect Ratio',
              description: 'Image aspect ratio (fixed to 1:1 for Instagram)',
              initialValue: '1/1',
              readOnly: true,
              hidden: false,
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      images: 'images',
    },
    prepare({ images }) {
      const imageCount = images?.length || 0;
      return {
        title: `Instagram Carousel (${imageCount} ${imageCount === 1 ? 'image' : 'images'})`,
        subtitle: 'Instagram Carousel Section',
        media: images?.[0],
      };
    },
  },
});
