
import { getEntry, getCollection, type CollectionEntry } from 'astro:content'
import { collectEmbeds, collectLinks } from '@/lib/collections'
import type { AnyContentEntry, WikiLink, AnyContentKey, AnyEntry } from '@/content/config.ts'

export function absolutePath (path:string) {
  return '/' + path.replace(/^\//, '')
}

export async function resolve (ref:string | { collection:AnyContentKey, slug:string }) {
  if (typeof ref === 'string') {
    if (ref.includes(':')) {
      const [ collection, slug ] = launderWikiLink(ref)
      return resolve({ collection, slug })
    } else {
      return ref
    }
  } else {
    return await getEntry(ref.collection, ref.slug)
  }
}

export function pluck<T> (items:T[], key: string) {
  if (key.includes('.')) {
    const [ k, ...next ] = key.split('.')
    return pluck(items.map((item) => item[k]), next.join('.'))
  } else {
    return items.map((item) => item[key])
  }
}

export function dedupe<T> (items:T[], fn = (a:T, b:T):Boolean => a === b):T[] {
  const unique = [] as T[]
  for (const a of items) {
    let found = false
    for (const b of unique) {
      if (fn(a, b)) { found = true; break }
    }
    if (!found) unique.push(a)
  }
  return unique
}

export function withSameTags (tags:string[]) {
  return ({ data }) => data.tags.some((tag) => tags.includes(tag))
}

export function sameEntry (a:AnyContentEntry) {
  return (b:AnyContentEntry) => a.collection === b.collection && a.slug === b.slug
}

export async function resolveWikiLinks (links:WikiLink[]) {
  return await Promise.all(links.map(([ cat, slug ]) => getEntry(cat, slug)))
}

export async function getRelatedEntries (entry:AnyContentEntry) {
  const tags     = entry.data.tags ?? []
  const embedded = await resolveWikiLinks(collectEmbeds(entry.body))
  const linked   = await resolveWikiLinks(collectLinks(entry.body))

  let related = (await getCollection('lore', withSameTags(tags)))
    .filter((e) => e.data.title !== entry.data.title) // filter out this entry
    //@ts-ignore cbf
    .concat(linked).filter(Boolean)                   // Add linked entries
    //@ts-ignore cbf
    .filter((a) => embedded.findIndex(sameEntry(a)) === -1)
    .toSorted((a, b) => a.data.title.localeCompare(b.data.title))

  return dedupe(related, (a, b) => a.data.title === b.data.title)
}

export function runMatches (rx:RegExp, str:string):WikiLink[] {
  const all:WikiLink[] = []

  let match:RegExpMatchArray | null
  while (match = rx.exec(str)) {
    all.push(launderWikiLink(match[2]))
  }

  return all
}

export function launderWikiLink (src:string):WikiLink {
  let [ coll, slug ] = src.split(':')
  if (slug.includes('#')) slug = slug.split('#')[0]
  return [ coll as unknown as AnyContentKey, slug ]
}

export function uid ():string {
  return Math.round(Math.random()*1e6).toFixed()
}

export function objMap<T, U> (obj:T, fn:(key:keyof T, value:T[keyof T])=>U):Record<keyof T, U> {
  const mapped:Record<keyof T, U> = {}
  for (const key in obj) {
    mapped[key] = fn(key, obj[key])
  }
  return mapped
}

export function entryUrl (entry:AnyEntry):string {
  if (entry.slug) {
    return `/${entry.collection}/${entry.slug}`
  }

  return `/${entry.collection}/${entry.id}`
}

