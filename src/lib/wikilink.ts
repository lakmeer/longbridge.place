
import { getEntry } from 'astro:content'
import type { AnyContentEntry, AnyContentKey } from '@/content/config.ts'


//
// WikiLink
//
// This format:   coll:slug#fragment?
//
// Used in raw markdown articles to specify particular content collections.
// Not used to data-type collections.
//

const RX_WIKILINK    = /\[([^\]]+)\]\((\w+:[-a-z]+)(#[-a-z]+)?\)/g
const RX_PARENS_ONLY = /\((\w+:[-a-z]+)(#[-a-z]+)?\)/

export default class WikiLink {

  coll: AnyContentKey
  slug: string
  fragment?: string

  constructor (coll:AnyContentKey, slug:string, fragment?:string) {
    this.coll = coll
    this.slug = slug
    this.fragment = fragment
  }

  toLink () {
    return `${this.coll}:${this.slug}`
  }

  toUrl () {
    return `/${this.coll}/${this.slug}`
  }

  sameAs (other:WikiLink) {
    return this.coll === other.coll && this.slug === other.slug
  }

  async resolve ():Promise<AnyContentEntry | undefined> {
    return await getEntry(this.coll, this.slug)
  }

  static split (src:string):WikiLink {
    const [ coll, rest ] = src.split(':')

    if (rest.includes('#')) {
      const [ slug, frag ] = rest.split('#')[0]
      return new WikiLink(coll as AnyContentKey, slug, frag)
    } else {
      return new WikiLink(coll as AnyContentKey, rest)
    }
  }

  static scrape (str:string):WikiLink[] {
    const links = str.match(RX_WIKILINK)

    if (!links) return [] as WikiLink[]

    return links.map(link => {
      return WikiLink.split(link.match(RX_PARENS_ONLY)![1])
    })
  }

  static fromEntry (entry:AnyContentEntry):WikiLink {
    return new WikiLink(entry.collection, entry.slug)
  }

  static fromAstroRef (ref:{ collection:AnyContentKey, slug:string }):WikiLink {
    return new WikiLink(ref.collection, ref.slug)
  }
}
