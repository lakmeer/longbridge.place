
import { getEntry } from 'astro:content'
import type { AnyContentEntry, AnyContentKey } from '@/content.config.ts'


//
// WikiLink
//
// This format:   coll:id#fragment?
//
// Used in raw markdown articles to specify particular content collections.
// Not used to data-type collections.
//

const RX_WIKILINK    = /\[([^\]]+)\]\((\w+:[-a-z]+)(#[-a-z]+)?\)/g
const RX_PARENS_ONLY = /\((\w+:[-a-z]+)(#[-a-z]+)?\)/


export default class WikiLink {

  id: string
  coll: AnyContentKey
  fragment?: string

  constructor (coll:AnyContentKey, id:string, fragment?:string) {
    this.id = id
    this.coll = coll
    this.fragment = fragment
  }

  toLink () {
    return `${this.coll}:${this.id}`
  }

  toUrl () {
    return `/${this.coll}/${this.id}`
  }

  sameAs (other:WikiLink) {
    return this.coll === other.coll && this.id === other.id
  }

  async resolve ():Promise<AnyContentEntry | undefined> {
    return await getEntry(this.coll, this.id)
  }

  static split (src:string):WikiLink {
    const [ coll, rest ] = src.split(':')

    if (rest.includes('#')) {
      const [ id, frag ] = rest.split('#')[0]
      return new WikiLink(coll as AnyContentKey, id, frag)
    } else {
      return new WikiLink(coll as AnyContentKey, rest)
    }
  }

  static scrape (str?:string):WikiLink[] {
    if (!str) return []

    const links = str.match(RX_WIKILINK)

    if (!links) return [] as WikiLink[]

    return links.map(link => {
      return WikiLink.split(link.match(RX_PARENS_ONLY)![1])
    })
  }

  static fromEntry (entry:AnyContentEntry):WikiLink {
    return new WikiLink(entry.collection, entry.id)
  }

  static fromAstroRef (ref:{ collection:AnyContentKey, id:string }):WikiLink {
    return new WikiLink(ref.collection, ref.id)
  }
}
