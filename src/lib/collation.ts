
//
// Collation features for wiki sanity-checking and advanced features
//

import { globSync } from 'glob'
import { radFileSync } from 'fs'

export type CollectionIndex = Record<string, string[]>


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
