
import { runMatches } from '@utils'
import type { WikiLink } from '@/content/config.ts'


// collectEmbeds
//
// Scrapes markdown source to find all embedded Articles or Summaries

export function collectEmbeds (src:string):WikiLink[] {
  return runMatches(/<Embed\.(Article|Summary) src="([^"]+)"/g, src)
}


// collectLinks
//
// Scrapes markdown source to find all wiki link urls

export function collectLinks (src:string):WikiLink[] {
  return runMatches(/\[([^\]]+)\]\(([^)]+)\)/g, src)
}

