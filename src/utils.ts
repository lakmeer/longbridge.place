
import { getCollection } from 'astro:content'
import type { AnyContentEntry, AnyEntry } from '@/content/config.ts'

import WikiLink from './lib/wikilink.ts'

export function absolutePath (path:string) {
  return '/' + path.replace(/^\//, '')
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
  return (b:AnyContentEntry) => a.collection === b.collection && a.id === b.id
}

export async function getRelatedEntries (entry:AnyContentEntry) {
  const tags     = entry.data.tags ?? []
  //const embedded = await resolveWikiLinks(collectEmbeds(entry.body))
  const linked   = await Promise.all(WikiLink.scrape(entry.body).map(wl => wl.resolve()))

  let related = (await getCollection('lore', withSameTags(tags)))
    .filter((e) => e.data.title !== entry.data.title) // filter out this entry
    //@ts-ignore cbf
    .concat(linked).filter(Boolean)                   // Add linked entries
    //@ts-ignore cbf
    //.filter((a) => embedded.findIndex(sameEntry(a)) === -1)
    .toSorted((a, b) => a.data.title.localeCompare(b.data.title))

  return dedupe(related, (a, b) => a.data.title === b.data.title)
}

export function runMatches (rx:RegExp, str:string):WikiLink[] {
  const all:WikiLink[] = []

  let match:RegExpMatchArray | null
  while (match = rx.exec(str)) {
    all.push(WikiLink.split(match[2]!))
  }

  return all
}

export function uid ():string {
  return Math.round(Math.random()*1e6).toFixed()
}

export function entryUrl (entry:AnyEntry):string {
  return `/${entry.collection}/${entry.id}`
}

export function lev (s:string, t:string):number {
  if (!s.length) return t.length
  if (!t.length) return s.length

  const arr:number[][] = []

  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i]
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] = i === 0 ? j :
        Math.min(arr[i - 1][j] + 1, arr[i][j - 1] + 1, arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1))
    }
  }
  return arr[t.length][s.length]
}

export function closestLev (target:string, list:string[]):[ string, number ] {
  const ranks   = list.map(link => ({ link: link, dist: lev(link, target) }))
  const closest = ranks.toSorted((a, b) => a.dist - b.dist)[0]
  return [ closest.link, closest.dist/(Math.max(target.length, closest.link.length)) ]
}

export function json (it:any, format = false):string {
  return JSON.stringify(it, null, format ? 2 : 0)
}

export function collateByKey<T> (things:T[], fn:(it:T) => string):Record<string, T[]> {
  const obj = {}
  things.forEach((it:T) => {
    const key = fn(it)
    if (!obj[key]) obj[key] = []
    obj[key] = obj[key].concat(it)
  })
  return obj
}

export function titlecase (str:string):string {
  return str
    .split(" ")
    .filter(Boolean)
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(" ")
}

export async function objMap<T>(obj:Record<string, T>, fn:(key:string, val:T) => void) {
  const out = {}
  await Object.keys(obj).map((key) => out[key] = fn(key, obj[key]))
  return out
}

export async function asyncObjMap<T>(obj:Record<string, T>, fn:(key:string, val:T) => Promise<void>) {
  const out = {}
  await Promise.all(Object.keys(obj).map(async (key) => out[key] = await fn(key, obj[key])))
  return out
}

