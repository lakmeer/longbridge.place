
//
// Collation features for wiki sanity-checking and advanced features
//

import { globSync } from 'glob'
import { radFileSync } from 'fs'

export type CollectionIndex = Record<string, string[]>
export type WikiLink = [ string, string ]


// indexContentByCollection
//
// Returns slugs of all content entries grouped by collection slug

export function indexContentByCollection ():CollectionIndex {
  const allCollections:CollectionIndex = {}

  globSync('./src/content/**/*.{mdx,yaml}')
    .forEach((path:string) => {
      const [ coll, slug ] = path
        .replace('src/content/', '')
        .replace('.mdx', '')
        .replace('.yaml', '')
        .split('/')

      if (!allCollections[coll]) allCollections[coll] = []
      allCollections[coll].push(slug)
    })

  return allCollections;
}


// collateTags
//
// Returns a list of all tags discovered in the content

export function collateTags ():string[] {
  globSync('./src/content/**/*.{mdx,yaml}')

  // TODO:

  return allTags.toSorted()
}


// collectEmbeds
//
// Scrapes markdown source to find all embedded Articles or Summaries

export function collectEmbeds (src:string):WikiLink[] {
  const allEmbeds:string[] = []
  const rx = /<Embed\.(Article|Summary) src="([^"]+)"/g

  let match:string[]
  while (match = rx.exec(src)) {
    allEmbeds.push(match[2].split(':'))
  }

  return allEmbeds
}


// collectLinks
//
// Scrapes markdown source to find all wiki link urls

export function collectLinks (src:string):WikiLink[] {
  const allLinks:string[] = []
  // links in the form [some markdown text](category:slug-wuth-hyphens/slashes/or#hashes)
  const rx = /\[([^\]]+)\]\(([^)]+)\)/g
  
  let match:string[]
  while (match = rx.exec(src)) {
    allLinks.push(match[2].split(':'))
  }

  return allLinks
}


