// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import alpinejs from '@astrojs/alpinejs';
import mdx      from '@astrojs/mdx';

import collectionLinks from './src/plugins/collection-links.ts';

export default defineConfig({
  vite: {
    resolve: {
      preserveSymlinks: true,
    }
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
    alpinejs()
  ],
  markdown: {
    remarkPlugins: [ collectionLinks ]
  }
});
