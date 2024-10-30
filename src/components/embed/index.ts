
//
// Embedders
//
// These components are auto-imported into MDX documents and made available
// to create multimedia hyperlinks within the MDX body. Use:
//
//   <Embed.Article src="lore:the-bridgehand" heading />
//
// and so on.
//
// Most embedders takea 'src' prop which is a valid collection url, and a
// 'heading' prop which is a boolean, and defaults to false, which will render
// an H2 heading for this embed with a link to the source entry.
//

export { default as Article } from './Article.astro'
export { default as Person  } from './Person.astro'
export { default as Summary } from './Summary.astro'
export { default as Deflist } from './Deflist.astro'
export { default as Todo    } from './Todo.astro'

