
//
// Mark Missing Links
//
// Add CSS class to link node that reference missing articles
//

import { indexContentByCollection } from '../lib/collation.ts'

function isMissing (coll:string, slug:string) {
  if (!allContent[coll]) return true
  if (!allContent[coll].includes(slug)) return true
  return false
}

function addClass (node, cl:string) {
  if (node.properties?.class) {
    node.properties.class += cl
  } else {
    node.properties.class = cl
  }
}

const allContent = indexContentByCollection()

export default function MarkMissingLinks () {
  //@ts-ignore can't be bothered digging out this typedef
  return function visit (node) {
    if (node.tagName === 'a') {
      const [ coll, slug ] = node.properties.href.split('/').filter(Boolean)

      if (isMissing(coll, slug)) {
        addClass(node, 'bad-link')
      }
    } else if (node.children && node.children.length) {
      node.children.forEach(visit)
    }
  }
}

