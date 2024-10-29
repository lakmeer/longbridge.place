
//
// Link Checker
//
// Check MDX link urls against existing colelction entries and emit warnings.
//

import 'colors'
import { globSync } from 'glob'

// Since we can't use astro:content outside of the engine

const allCollections:Record<string, string[]> = {}

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

console.log(allCollections)

// TODO: Collate tags, or collect collated tags from storage

export default function linkChecker (options = {}) {
  return function visit (node) {
    if (node.type === 'link' && node.url.includes(':')) {

      const [ collection, slug ] = node.url.split(':')

      if (collection === 'tag') return

      if (!allCollections[collection]) {
        return console.warn(' WARN '.yellow.inverse, "Unknown collection:".yellow, collection)
      }

      if (!allCollections[collection].includes(slug)) {
        return console.warn(' WARN '.yellow.inverse, "Unknown entry:".yellow, collection + ":" + slug)
      }

    } else if (node.children && node.children.length) {
      node.children.forEach(visit)
    }
  }
}

