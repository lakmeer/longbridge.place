import { defineCollection, z, reference } from 'astro:content'

// TODO: Custom validator for Longbridge dates
const longbridgeDate = z.string().or(z.number())
const tags = z.array(z.string()).optional()


//
// CONTENT COLLECTIONS
//

// Main Wiki articles
const lore = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tags: tags,
    type: z.string().optional(), // For concrete artifacts like 'Book', etc
  })
})

// Story chapters
const chapter = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    thread: reference('thread'),
    author: reference('author'),
    number: z.number().optional(),
    synopsis: z.string().optional(),
    pov_char: reference('person').or(z.string()).optional(),
    other_chars: z.array(reference('person').or(z.string())).optional(),
    locations: z.array(reference('location').or(z.string())).optional(),
    tags: tags.optional(),
  })
})

// Citizen profiles and story characters
const person = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    day_name: z.string(),
    names: z.string(),
    gender: z.enum(['Male', 'Female', 'Nymi', 'Luminari']).optional(),
    birthdate: longbridgeDate.optional(),
    residence: reference('location').or(z.string()).optional(),
    vocation: reference('lore').or(z.string()).optional(),
    headshot: reference('image'),
    affiliation: reference('lore').or(reference('location')).or(z.string()).optional(),
    tags: tags,
  }),
})

// Physical Places
const location = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    name: z.string(),
    type: z.enum(['Enclave', 'Building', 'Block']).optional(),
    address: z.string().optional(),
    coordinates: z.number().array().length(2).optional(),
    affiliation: reference('lore').or(reference('location')).or(z.string()).optional(),
    location: reference('location').or(z.string()).optional(), // Greater/parent location
    image: reference('image').optional(),
    tags: tags,
  })
})

// Meta-articles targeted at contributors
const meta = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tags: tags,
    type: z.string().optional(),
  })
})


//
// DATA COLLECTIONS
//

// Media: Images  TODO: Validate that referenced files exist on build
const image = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    filepath: z.string(),
    description: z.string(),
    width: z.number(),
    height: z.number(),
    format: z.string(),
    subject: z.string(),
    tags: tags,
  })
})

// Media: Videos
// Media: Audio
// Media: 3D Meshes
// Media: Gaussian Splats
// Media: Interactive Maps


// Misc data storage with no specific schmea
const misc = defineCollection({
  type: 'data'
})

// Storyline Threads
const thread = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    tags: tags,
    authors: z.array(reference('author').or(z.string())),
  })
})

// Content Authors
const author = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    headshot: reference('image').optional(),
  })
})


//
// Export and Utility Functions
//

export const collections = {
  lore,
  location,
  person,
  meta,
  misc,
  image,
  chapter,
  author,
  thread,
}

export type AnyCollectionKey = keyof typeof collections
export type AnyContentKey = 'lore' | 'location' | 'person' | 'chapter'

export function isValidCollection (coll:string): coll is AnyCollectionKey {
  return Object.keys(collections).includes(coll)
}

