
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
// TODO: Scrape fragemnts also
//

const RX_WIKILINK = /\[([^\]]+)\]\((\w+:\w+)\)/g

export default class WikiLink {

  coll: AnyContentKey
  slug: string
  fragment?: string

  constructor (public coll:string, public slug:string, public fragment?:string) {
  }

  toLink () {
    return `${this.coll}:${this.slug}`
  }

  toUrl () {
    return `/${this.coll}/${this.slug}`
  }

  async resolve<T> ():Promise<T[]> {
    return await getEntry(this.coll, this.slug)
  }

  static split (src:string) {
    const [ coll, rest ] = src.split(':')
    if (rest.includes('#')) {
      const [ slug, frag ] = rest.split('#')[0]
      return new WikiLink(coll, slug, frag)
    } else {
      return new WikiLink(coll, rest)
    }
  }

  static scrape (str:string):WikiLink[] {
    const links = str.match(RX_WIKILINK)
    if (!links) return [] as WikiLink[]
    return links.map(link => WikiLink.split(link.match(/\[([^\]]+)\]\((\w+:\w+)\)/)[2]))
  }

  static fromEntry (entry:AnyContentEntry):WikiLink {
    return new WikiLink(entry.collection, entry.slug)
  }

}
