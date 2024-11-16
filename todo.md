
# TODOs

- Replace tailwind-typography with custom styles
- Serve story thread index from `/chapter/tamryn` ?
- Fauna page as a tag collection rather than an article
- change 'heading' prop to string to allow override of embed headings

# Content Preprocessing

- Scrape markdown frontmatter for tags
- Tag similarity report
- Save relational graph of linked entries to sqlite so it can gather relevant pages for LLM edits

# Site template

- Add meta descriptions for existing page templates
- Implement sidebar presentation of embed items
- List of all tags in meta/tags

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
