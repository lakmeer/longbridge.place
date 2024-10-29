# longbridge.place

Catalog of all raw content for the Longbridge project.


## Content Types

### People `/person`
Citizen character profiles.

#### Frontmatter Schema

    names: All of the Character's Names
    day_names: Character's Day Names
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
    author: Link to Author entry (meta:author:loremaster-xxx)
    synopsis: 1-sentance summary of events in the chapter
    pov_char: Link to Protagonist's profile (person:handelyn-second-seer-insatiable-tamryn)
    other_chars:
      - Link to other characters appearing or mentioned (profile:handelyn-first-ria)
    tags:
      - tag-slug
    related:
      - lore-slug
---
synopsis: Instatible Tamryn partakes in a seeing ceremony, and takes a risk.
pov_char: Handelyn Second Seer Insatiable Tamryn
other_chars: 
 - Handelin First Seer Ria
 - Unnamed Cult of the Hand members
locations:
 - Ceremonial Hall, Main Village, Cult of the Hand, Bridgehand, Beyond 11-firthan
tags:
 - seeing-tea
 - cult-of-the-hand
 - the-bridgehand
 - seeing-ceremony
 - worship-poem
---


### Lore `/lore`
Lore wiki articles. Can link to and embed each other, and embed media items.

#### Frontmatter Schema

    title: text
    tags:
      - tag-slug
    related:
      - lore-slug

#### Guidelines

- Lore articles should NOT include their own main heading - this will be added.
- Lore articles should start with one to three-ish paragraph that can be used
  as a fair summary of the entire article contents. Articles embedded into
  other articles will use this to create embedded sections in relevant
  articles. Embedding this way will take all contant before the first
  subheading inside the article to use as the summary. It can contain any media
  and so on.



### Maps
Interactive 2D maps, can add a location marker when embedded by a lore article.

### Media `/media`
#### `/media/image/`
#### `/media/video/`
#### `/media/images/`
#### `/media/images/`
#### `/media/images/`

Images, videos, 3d meshes, splats, TIs, etc to complement articles

### Meta
Meta content relating to the project itself, such as notes, user profiles, admins etc

### Notes
Short tooltip notes that can pop up in other content. 

### Tables
Tabular data. Can be embedded into lore articles.



