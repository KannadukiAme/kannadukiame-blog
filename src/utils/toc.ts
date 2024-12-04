import type { MarkdownHeading } from 'astro'

export type TOC = MarkdownHeading & {
  children: TOC[]
}

function findChildren(item: TOC, depth: number): TOC[] {
  if (depth === 1) {
    return item.children
  } else {
    return findChildren(item.children[item.children.length - 1], depth - 1)
  }
}

/**
 * 
 * @param headings [ { text: 'h1', depth: 1 }, { text: 'h2', depth: 2 } ]
 * @returns [ { text: 'h1', depth: 1, children: [ { text: 'h2', depth: 2, children: [] } ] } ]
 */
export function getToc(headings: MarkdownHeading[]) {
  const toc: TOC[] = []

  headings.forEach((heading) => {
    if (toc.length === 0) {
      toc.push({ ...heading, children: [] })
    } else {
      if (toc[toc.length - 1].depth < heading.depth) {
        // 低级节点
        const item = findChildren(
          toc[toc.length - 1],
          heading.depth - toc[toc.length - 1].depth
        )
        item.push({ ...heading, children: [] })
      } else if (toc[toc.length - 1].depth === heading.depth) {
        // 同级节点
        toc.push({ ...heading, children: [] })
      }
    }
  })

  return toc
}