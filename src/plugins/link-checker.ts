
import 'colors'
import { indexContentByCollection } from '../lib/collation.ts'


//
// Link Checker
//
// Check MDX link urls against existing collection entries and emit warnings.
//

export default function LinkChecker () {
  const allCollections = indexContentByCollection()

  //@ts-ignore can't be bothered digging out this typedef
  return function visit (node) {
    if (node.type === 'link' && node.url.includes(':')) {

      const [ collection, slug ] = node.url.split(':')

      if (collection === 'tag') return

      if (!allCollections[collection]) {
        return console.warn(' LNK-CHK '.red.inverse, "Unknown collection".red, collection)
      }

      if (!allCollections[collection].includes(slug)) {
        return console.warn(' LNK-CHK '.yellow.inverse, "Unknown entry".yellow, collection + ":" + slug)
      }

    } else if (node.children && node.children.length) {
      node.children.forEach(visit)
    }
  }
}
