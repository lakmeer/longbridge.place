
import { getEntry, getCollection, type CollectionEntry } from 'astro:content'
import { collectEmbeds, collectLinks } from '@/lib/collections'

export function absolutePath (path:string) {
  return '/' + path.replace(/^\//, '')
}

export async function resolve (ref:string | { collection:string, slug:string }) {
  console.log('🟡', ref)
  if (typeof ref === 'string') {
    if (ref.includes(':')) {
      const [ collection, slug ] = ref.split(':')
      return resolve({ collection, slug })
    } else {
      return ref
    }
  } else {
    return await getEntry(ref.collection, ref.slug)
  }
}

export function entryUrl (entry:CollectionEntry) {
  return `/${entry.collection}/${entry.slug}`
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
  const unique = []
  for (const a of items) {
    let found = false
    for (const b of unique) {
      if (fn(a,b)) { found = true; break }
    }
    if (!found) unique.push(a)
  }
  return unique
}

export function withSameTags (tags:string[]) {
  return ({ data }) => data.tags.some((tag) => tags.includes(tag))
}

export function sameEntry (a:CollectionEntry) {
  return (b:CollectionEntry) => a.collection === b.collection && a.slug === b.slug
}

export async function resolveWikiLinks (links:WikiLink[]) {
  return await Promise.all(links.map(([ cat, slug ]) => getEntry(cat, slug)))
}

export async function getRelatedEntries (entry:CollectionEntry) {
  const tags     = entry.data.tags
  const embedded = await resolveWikiLinks(collectEmbeds(entry.body))
  const linked   = await resolveWikiLinks(collectLinks(entry.body))

  let related = (await getCollection('lore', withSameTags(tags)))
    .filter((e) => e.data.title !== entry.data.title) // filter out this entry
    .concat(linked).filter(Boolean)                   // Add linked entries
    .filter((a) => embedded.findIndex(sameEntry(a)) === -1)
    .toSorted((a, b) => a.data.title.localeCompare(b.data.title))

  return dedupe(related, (a, b) => a.data.title === b.data.title)
}

export function runMatches<T> (rx:RegExp, str:string):T[] {
  const all:T[] = []

  let match:RegExpMatchArray | null
  while (match = rx.exec(str)) {
    //@ts-ignore
    all.push(match[2].split(':'))
  }

  return all
}

import type { AnyCollectionKey } from '@/content/config.ts'

export function launderWikiLink (src:string):[AnyCollectionKey, string] {
  const [ coll, slug ] = src.split(':')

  return [ coll as unknown as AnyCollectionKey, slug ]
}

