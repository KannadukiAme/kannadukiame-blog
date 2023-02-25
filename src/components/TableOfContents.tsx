import type { MarkdownHeading } from 'astro'

type TreeNode = MarkdownHeading & {
  children: TreeNode[]
}

function output(nodeTree: TreeNode[]) {
  return nodeTree.map((node) => (
    <>
      <li className="list-none">
        <a href={`#${node.slug}`}>{node.text}</a>
      </li>
      {node.children.length > 0 && <ul>{output(node.children)}</ul>}
    </>
  ))
}

type Props = {
  headings: MarkdownHeading[]
}

function findChildren(item: TreeNode, depth: number): TreeNode[] {
  if (depth === 1) {
    return item.children
  } else {
    return findChildren(item.children[item.children.length - 1], depth - 1)
  }
}

export default function TableOfContents({ headings }: Props) {
  const nodeTree: TreeNode[] = []
  headings.forEach((heading) => {
    if (nodeTree.length === 0) {
      nodeTree.push({ ...heading, children: [] })
    } else {
      if (nodeTree[nodeTree.length - 1].depth < heading.depth) {
        // 低级节点
        const item = findChildren(
          nodeTree[nodeTree.length - 1],
          heading.depth - nodeTree[nodeTree.length - 1].depth
        )
        item.push({ ...heading, children: [] })
      } else if (nodeTree[nodeTree.length - 1].depth === heading.depth) {
        // 同级节点
        nodeTree.push({ ...heading, children: [] })
      }
    }
  })

  return (
    <nav>
      <ul>{output(nodeTree)}</ul>
    </nav>
  )
}
