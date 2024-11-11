
//
// Collation features for wiki sanity-checking and advanced features
//

import { globSync } from 'glob'
import { readFileSync } from 'fs'

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


// tagSimilarity
//
// Returns top ten most misilar tag pairs by levenshtein distance, with a
// special exemption for tags beginning with 'the-'

function lev (s, t) {
  if (!s.length) return t.length
  if (!t.length) return s.length
  const arr = []
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i]
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] = i === 0 ? j :
        Math.min(arr[i - 1][j] + 1, arr[i][j - 1] + 1, arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1))
    }
  }
  return arr[t.length][s.length]
}

export function tagSimilarity ():string[] {
  globSync('./src/content/**/*.{mdx,yaml}')
    .map((path:string) => readFileSync(path, 'utf8'))
    .forEach((content:string) => {
      console.log(content)
  })

  // TODO:

  return []
}
