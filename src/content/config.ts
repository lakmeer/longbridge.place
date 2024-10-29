import { defineCollection, z, reference } from 'astro:content'

// TODO: Custom validator for Longbridge dates
const longbridgeDate = z.string().or(z.number())
const tags = z.array(z.string()).optional()

const lore = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tags: tags,
    type: z.string().optional(), // For concrete artifacts like 'Book', etc
  })
})

const person = defineCollection({
  type: 'content',
  schema: z.object({
    names: z.string(),
    day_name: z.string(),
    gender: z.enum(['Male', 'Female', 'Nymi', 'Luminari']),
    birthdate: longbridgeDate,
    residence: reference('location'),
    vocation: z.string(),
    headshot: reference('image'),
    affiliation: reference('lore').or(reference('location')).or(z.string()).optional(),
    tags: tags,
  }),
})

const location = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    type: z.enum(['Enclave', 'Building', 'Block']).optional(),
    address: z.string().optional(),
    affiliation: reference('lore').or(reference('location')).or(z.string()).optional(),
    location: reference('location').or(z.string()).optional(), // Greater location
    image: reference('image').optional(),
    tags: tags,
  })
})

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
    tags: tags,
  })
})

const meta = defineCollection({
  type: 'data'
})

const notes = defineCollection({ })

export const collections = {
  lore,
  location,
  person,
  meta,
  image,
}
