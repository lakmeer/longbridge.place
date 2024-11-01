
//
// Collection Links
//
// Replace links in the form collection:entry#section
//

export default function CollectionLinks () {
  //@ts-ignore can't be bothered digging out this typedef
  return function visit (node) {
    if (node.type === 'link' && node.url.includes(':')) {
      node.url = '/' + node.url.replace(':', '/')
    } else if (node.children && node.children.length) {
      node.children.forEach(visit)
    }
  }
}

