import { defineCollection, z, reference } from 'astro:content';

// TODO: Custom validator for Longbridge dates
const longbridgeDate = z.string().or(z.number());

const lore = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});

const person = defineCollection({
  type: 'content',
  schema: z.object({
    names: z.string(),
    day_names: z.string(),
    gender: z.enum(['Male', 'Female', 'Nymi']),
    birthdate: longbridgeDate,
    residence: reference('location'),
    vocation: z.string(),
    headshot: reference('image'),
    tags: z.array(z.string()).optional(),
  }),
});

const location = defineCollection({ });
const notes = defineCollection({ });

// TODO: Validate that referenced files exist on build
const image = defineCollection({
  type: 'data',
  schema: z.object({
    filepath: z.string(),
    description: z.string(),
    width: z.number(),
    height: z.number(),
    format: z.string(),
    subject: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});

const meta = defineCollection({
  type: 'data'
});

export const collections = {
  lore,
  location,
  person,
  meta,
  image,
};
