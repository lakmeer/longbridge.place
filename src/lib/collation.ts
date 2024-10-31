
//
// Collation features for wiki sanity-checking and advanced features
//

import { globSync } from 'glob'
//import { readFileSync } from 'fs'

import { runMatches } from '@utils'

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

  return [] // allTags.toSorted()
}


// collectEmbeds
//
// Scrapes markdown source to find all embedded Articles or Summaries

export function collectEmbeds (src:string):WikiLink[] {
  return runMatches(/<Embed\.(Article|Summary) src="([^"]+)"/g, src)
}


// collectLinks
//
// Scrapes markdown source to find all wiki link urls

export function collectLinks (src:string):WikiLink[] {
  return runMatches(/\[([^\]]+)\]\(([^)]+)\)/g, src)
}


