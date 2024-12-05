
import 'colors'
import { indexPages, indexContentByCollection } from '../lib/collation.ts'

export function splitLink (src:string) {
  let [ coll, id ] = src.split(':')
  if (id.includes('#')) id = id.split('#')[0]
  return [ coll, id ]
}


//
// Link Checker
//
// Check MDX link urls against existing collection entries and emit warnings.
// If a bad link is found, url is set to the empty string so it can be visually
// styled with CSS. This is hacky but it lets us distinguish collection links
// from normal pages and check each of them specifically, compared to the rehype
// phase after they have all been homogenised.
//

export default function LinkChecker () {
  const allCollections = indexContentByCollection()
  const allPages       = indexPages()

  //@ts-ignore can't be bothered digging out this typedef
  return function visit (node) {

    if (node.type === 'link') {

      // External links
      if (node.url.startsWith('http')) {
        return
      }

      // Collection links
      if (node.url.includes(':')) {

        const [ collection, id ] = splitLink(node.url)

        if (collection === 'tag') return

        if (!allCollections[collection]) {
          console.warn(' LNK-CHK '.red.inverse, "Missing collection".red, collection)
          node.url = ""
          return
        }

        if (!allCollections[collection].includes(id)) {
          console.warn(' LNK-CHK '.yellow.inverse, "Missing entry".yellow, collection + ":" + id)
          node.url = ""
          return
        }
      }

      // Pages
      if (node.url.startsWith('/')) {
        if (!allPages.includes(node.url)) {
          console.warn(' LNK-CHK '.yellow.inverse, "Missing page".yellow, node.url)
          node.url = ""
          return
        }
      }

    } else if (node.children && node.children.length) {
      node.children.forEach(visit)
    }
  }
}
