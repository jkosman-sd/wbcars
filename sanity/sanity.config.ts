import { settingsStructure, singletonPlugin } from '@sanity/plugins/singleton-plugin';
import { apiVersion, dataset, PREVIEW_MODE_ROUTE, projectId } from '@sanity/sanity.api';
import { settingsType } from '@sanity/schemas/settings';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { presentationTool } from 'sanity/presentation';
import { structureTool } from 'sanity/structure';
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash';

import { schemaTypes } from './schemas';

const title = process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE;

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title,
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({
      structure: settingsStructure([settingsType]),
    }),
    presentationTool({
      previewUrl: { previewMode: { enable: PREVIEW_MODE_ROUTE } },
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin({ types: [settingsType.name] }),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    ...(process.env.NODE_ENV !== 'production' ? [visionTool({ defaultApiVersion: apiVersion })] : []),
  ],
});
