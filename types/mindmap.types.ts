export interface MindMapNode {
  id: string
  label: string
  description: string
  parent?: string
  depth: number
}

export interface MindMapEdge {
  from: string
  to: string
  label?: string
}

export interface MindMapGraph {
  root: MindMapNode
  nodes: MindMapNode[]
  edges: MindMapEdge[]
}
