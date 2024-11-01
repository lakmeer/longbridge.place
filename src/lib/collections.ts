
import { runMatches } from '@utils'

export type WikiLink = [ string, string ]


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

