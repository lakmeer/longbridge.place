
//
// Contains tools for processing or modifying raw markdown
//

export function stripLinks (src:string) {
  const rx = /\[([^\]]+)\]\([-a-z]+:[-a-z]+\)/g
  return src.replaceAll(rx, (_, capture) => capture)
}

export function firstChunk (src:string) {
  return src.split(/\n\s*\n/)[0]
}
