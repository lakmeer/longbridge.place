// @ts-check
import { defineConfig } from 'astro/config'

import tailwind from '@astrojs/tailwind'
import alpinejs from '@astrojs/alpinejs'
import mdx      from '@astrojs/mdx'
import auto     from 'astro-auto-import'

import CollectionLinks  from './src/plugins/collection-links.ts'
import LinkChecker      from './src/plugins/link-checker.ts'

import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'hybrid',

  vite: {
    resolve: {
      preserveSymlinks: true,
    }
  },

  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    auto({
      imports: [
        { './src/components/embed/index': 'Embed' },
      ]
    }),
    mdx(),
    alpinejs()
  ],

  markdown: {
    remarkPlugins: [ LinkChecker, CollectionLinks ],
  },

  adapter: vercel()
})
