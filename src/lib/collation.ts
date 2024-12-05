
//
// Collation features for wiki sanity-checking and advanced features
//

import { globSync } from 'glob'

export type CollectionIndex = Record<string, string[]>


// indexContentByCollection
//
// Returns ids of all content entries grouped by collection id

export function indexContentByCollection ():CollectionIndex {
  const allCollections:CollectionIndex = {}

  globSync('./src/content/**/*.{mdx,yaml}')
    .forEach((path:string) => {
      const [ coll, id ] = path
        .replace('src/content/', '')
        .replace('.mdx', '')
        .replace('.yaml', '')
        .split('/')

      if (!allCollections[coll]) allCollections[coll] = []
      allCollections[coll].push(id)
    })

  return allCollections
}


// indexPages
//
// returns id of valid paths in /pages

export function indexPages ():string[] {
  return globSync('./src/pages/**/*.{mdx,astro}')
    .filter(p => !p.match(/\[\.\.\.id\]/))
    .map((p) => p
      .replace('src/pages/', '')
      .replace('.mdx', '')
      .replace('.astro', '')
      .replace(/index$/, '')
    )
    .map(p => '/' + p)
}

