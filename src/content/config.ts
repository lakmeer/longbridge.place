import { defineCollection } from 'astro:content';

const lore    = defineCollection({ });
const entries = defineCollection({ });
const meta    = defineCollection({ });
const notes   = defineCollection({ });

export const collections = {
  lore,
  entries,
  meta,
  notes,
};
