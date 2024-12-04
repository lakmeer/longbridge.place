
//
// Collation features for wiki sanity-checking and advanced features
//

import { globSync } from 'glob'

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

  return allCollections
}


// indexPages
//
// returns slugs of valid paths in /pages

export function indexPages ():string[] {
  return globSync('./src/pages/**/*.{mdx,astro}')
    .filter(p => !p.match(/\[\.\.\.slug\]/))
    .map((p) => p
      .replace('src/pages/', '')
      .replace('.mdx', '')
      .replace('.astro', '')
      .replace(/index$/, '')
    )
    .map(p => '/' + p)
}

