
# TODOs

- Replace tailwind-typography with custom styles
- Serve story thread index from `/chapter/tamryn` ?
- change 'heading' prop ro string to allow override of embed headings

# Content Preprocessing

- Collect all slugs
- Scrape markdown body for links
- Scrape markdown frontmatter for tags
- Collate all tags with slugs of tagged content, and save to a file or sqlite
- Examine slugs in body links and report missing files
- Save relational graph of linked entries to sqlite so it can gather relevant pages for LLM edits

# Site template

- implement sidebar presentation of embed items
- list of all tags

## Markdown Extras

- Markdown extension for deflists

# Embeds

- Remove 'Embed.' namespace

## More types

- Set of summaries with a given tag

## Glossary popups

- create glossary content collection

      word: string
      defn: string
      link: wikilink

- create [gloss:] preprocess plugin
- move small stub articles into glossary
- show js popup with glossary entry that links thru to full article
- copy glossary from doc
- add idioms to this collection

# More Content types

- Events?
- Deities?
