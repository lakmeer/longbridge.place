# longbridge.place

Catalog of all raw content for the Longbridge project.

# Content Conventions

- Collections are named the same as the route they are served from
- Collection names are in the singular (person vs people)
- Chapters are organised into threads
  - Since Astro can't type schemas of nested collections, thread reference is a prop of the frontmatter
  - Threads are data objects
- Chapter collection is subfolders for each thread


## Content Types

### People `/person`

Citizen character profiles.

#### Frontmatter Schema

    names: All of the Character's Names
    day_name: Character's Day Name
    gender: Character's Gender
    birthdate: Year or date in system format
    media:
      - link to media item (image:id)
    location:
      - list of locations
    tags:
      - tag-id


### Entries `/entry`

Storyline chapters/subchapters.

#### Frontmatter Schema

    title: Chapter Title
    thread: Name of this storyline
    author: Link to Author entry (meta:author/loremaster-xxx)
    synopsis: 1-sentance summary of events in the chapter
    pov_char: Link to Protagonist's profile (person:handelyn-second-seer-insatiable-tamryn)
    other_chars:
      - Links to other characters appearing or mentioned (person:handelyn-first-ria), or
      - Just the name (for minor characters without profiles)
    tags:
      - tag-id
    related:
      - lore-id


### Lore `/lore`

Lore wiki articles. Can link to and embed each other, and embed media items.

#### Frontmatter Schema

    title: text
    tags:
      - tag-id
    related:
      - lore-id


#### Guidelines

- Lore articles should not include their own main heading in the acutal body.
- Lore articles should start with a one-ish paragraph overview that can be used
  as a fair summary of the entire article contents. This will be used to create
  embedded sections in relevant articles, search results, and tooltips for
  links. Embedding this way will take all contant before the first subheading
  inside the article to use as the summary. Using as tooltip will take just the
  first paragraph. TODO: May promote this to an explicit field in the frontmatter.
- Related articles will be generated from matching tags and internal links.


## Media & Data Types

### Images

Images to complement articles

#### Schema

    filepath: path inside `/public` folder
    description: used as alt text when rendering context doesn't override it
    subject:
      - link to other collection entries
      - just a string
    width: number
    height: number
    format: jpg, png, webp, etc

- Will be checked against filesystem at build time.
  - TODO: This ^


### `/video/`
#### Frontmatter Schema
- TBD

### `/models/`
3D Meshes
#### Frontmatter Schema
- TBD

### `/splats/`
Gaussian scenes
#### Frontmatter Schema
- TBD

### `/maps/`
2D pannable maps
#### Frontmatter Schema
- TBD

### Meta
Meta content relating to the project itself, such as notes, user profiles, admins etc.
Includes helper pages like tags overview, missing article links, and so on
No fixed schema.

### Notes
Short tooltip notes that can pop up in other content. 

### Tables
Tabular data. Can be embedded into lore articles.

