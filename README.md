# longbridge.place

Catalog of all raw content for the Longbridge project.


## Content Types

### People `/person`
Citizen character profiles.

#### Frontmatter Schema

    names: All of the Character's Names
    day_name: Character's Day Name
    gender: Character's Gender
    birthdate: Year or date in system format
    media:
      - link to media item (image:slug)
    location:
      - list of locations
    tags:
      - tag-slug

### Entries `/entry`
Storyline chapters/subchapters.

#### Frontmatter Schema

    title: Chapter Title
    author: Link to Author entry (meta:author/loremaster-xxx)
    synopsis: 1-sentance summary of events in the chapter
    pov_char: Link to Protagonist's profile (person:handelyn-second-seer-insatiable-tamryn)
    other_chars:
      - Links to other characters appearing or mentioned (person:handelyn-first-ria), or
      - Just the name (for minor characters without profiles)
    tags:
      - tag-slug
    related:
      - lore-slug

### Lore `/lore`
Lore wiki articles. Can link to and embed each other, and embed media items.

#### Frontmatter Schema

    title: text
    tags:
      - tag-slug
    related:
      - lore-slug

#### Guidelines

- Lore articles should NOT include their own main heading in the acutal body.
- Lore articles should start with a one-ish paragraph overview that can be used
  as a fair summary of the entire article contents. This will be used to create
  embedded sections in relevant articles, and tooltips for links. Embedding this
  way will take all contant before the first subheading inside the article to use
  as the summary. Using as tooltip will take just the first paragraph.

  TODO: May promote this to an explicit field in the frontmatter.

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
#### Frontmatter Schema
- TBD

### `/splats/`
#### Frontmatter Schema
- TBD

### `/maps/`
#### Frontmatter Schema
- TBD

Images, videos, 3d meshes, splats, TIs, etc to complement articles

### Meta
Meta content relating to the project itself, such as notes, user profiles, admins etc.
No fixed schema.

### Notes
Short tooltip notes that can pop up in other content. 

### Tables
Tabular data. Can be embedded into lore articles.

