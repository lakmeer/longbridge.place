
//
// Always Absolute
//
// Tweak wiki links to always refer to the top namespace
//

export default function alwaysAbsolute (options = {}) {
  return function visit (node) {
    if (node.type === 'link' && !node.url.startsWith('/')) {
      node.url = '/' + node.url
    } else if (node.children && node.children.length) {
      node.children.forEach(visit)
    }
  }
}

