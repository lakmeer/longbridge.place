
import { getEntry } from 'astro:content'

export function absolutePath (path: string) {
  return '/' + path.replace(/^\//, '')
}

export async function resolve (ref: string | { collection: string, slug: string }) {
  if (typeof ref === 'string') {
    return ref
  } else {
    return await getEntry(ref.collection, ref.slug)
  }
}

export function entryUrl (entry: CollectionEntry) {
  return `/${entry.collection}/${entry.slug}`
}
