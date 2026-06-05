'use client'
import { useEffect, useState } from 'react'
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react'
import type { MindMapGraph as MindMapGraphType } from '@/types/mindmap.types'

interface NodePosition {
  id: string
  x: number
  y: number
  label: string
  description: string
  depth: number
}

interface MindMapGraphProps {
  graph: MindMapGraphType
}

const COLORS = {
  0: { fill: '#7c3aed', border: '#6d28d9', text: '#ffffff', size: 65 },
  1: { fill: '#4c1d95', border: '#5b21b6', text: '#e9d5ff', size: 50 },
  2: { fill: '#1e1b4b', border: '#312e81', text: '#c4b5fd', size: 38 },
}

export function MindMapGraph({ graph }: MindMapGraphProps) {
  const [scale, setScale] = useState(1)
  const [tooltip, setTooltip] = useState<{ node: NodePosition; x: number; y: number } | null>(null)
  const [positions, setPositions] = useState<NodePosition[]>([])

  useEffect(() => {
    if (!graph) return

    // No need to store allNodes separately
    const computed: NodePosition[] = []
    const centerX = 500
    const centerY = 400

    // Root
    computed.push({ id: graph.root.id, x: centerX, y: centerY, label: graph.root.label, description: graph.root.description, depth: 0 })

    // Depth 1 nodes
    const depth1Nodes = graph.nodes.filter(n => n.depth === 1)
    const d1Count = depth1Nodes.length
    depth1Nodes.forEach((node, i) => {
      const angle = (i / d1Count) * Math.PI * 2 - Math.PI / 2
      const radius = 200
      computed.push({
        id: node.id,
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        label: node.label,
        description: node.description,
        depth: 1,
      })
    })

    // Depth 2 nodes
    const depth2Nodes = graph.nodes.filter(n => n.depth === 2)
    depth2Nodes.forEach(node => {
      const parent = computed.find(p => p.id === node.parent)
      if (!parent) return
      const siblings = depth2Nodes.filter(n => n.parent === node.parent)
      const sibIndex = siblings.indexOf(node)
      const sibCount = siblings.length
      const parentAngle = Math.atan2(parent.y - centerY, parent.x - centerX)
      const angleOffset = (sibIndex - (sibCount - 1) / 2) * 0.5
      const radius = 130
      computed.push({
        id: node.id,
        x: parent.x + Math.cos(parentAngle + angleOffset) * radius,
        y: parent.y + Math.sin(parentAngle + angleOffset) * radius,
        label: node.label,
        description: node.description,
        depth: 2,
      })
    })

    setPositions(computed)
  }, [graph])

  const getPos = (id: string) => positions.find(p => p.id === id)

  return (
    <div className="relative w-full h-full bg-transparent rounded-xl overflow-hidden" style={{ minHeight: '500px' }}>
      {/* Zoom controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button
          id="mindmap-zoom-in"
          onClick={() => setScale(s => Math.min(s + 0.2, 2))}
          className="p-2 rounded-lg bg-white/[0.05] border border-white/10 text-zinc-400 hover:text-white transition-colors"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          id="mindmap-zoom-out"
          onClick={() => setScale(s => Math.max(s - 0.2, 0.4))}
          className="p-2 rounded-lg bg-white/[0.05] border border-white/10 text-zinc-400 hover:text-white transition-colors"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          id="mindmap-reset"
          onClick={() => setScale(1)}
          className="p-2 rounded-lg bg-white/[0.05] border border-white/10 text-zinc-400 hover:text-white transition-colors"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      <svg
        viewBox="0 0 1000 800"
        className="w-full h-full"
        style={{ transform: `scale(${scale})`, transformOrigin: 'center', transition: 'transform 0.3s ease' }}
      >
        {/* Edges */}
        {graph.edges.map(edge => {
          const from = getPos(edge.from)
          const to = getPos(edge.to)
          if (!from || !to) return null
          return (
            <line
              key={`${edge.from}-${edge.to}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="rgba(139, 92, 246, 0.3)"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
          )
        })}

        {/* Nodes */}
        {positions.map(node => {
          const colors = COLORS[node.depth as 0 | 1 | 2] || COLORS[2]
          return (
            <g
              key={node.id}
              id={`mindmap-node-${node.id}`}
              className="cursor-pointer"
              onMouseEnter={() => setTooltip({ node, x: node.x, y: node.y })}
              onMouseLeave={() => setTooltip(null)}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r={colors.size / 2}
                fill={colors.fill}
                stroke={colors.border}
                strokeWidth="2"
                className="transition-all duration-200 hover:filter hover:brightness-125"
              />
              <text
                x={node.x}
                y={node.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={colors.text}
                fontSize={node.depth === 0 ? 11 : node.depth === 1 ? 9 : 8}
                fontWeight={node.depth === 0 ? '700' : '500'}
                className="select-none pointer-events-none"
              >
                {node.label.length > 14 ? node.label.slice(0, 13) + '…' : node.label}
              </text>
            </g>
          )
        })}
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute z-20 max-w-[200px] px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-zinc-300 pointer-events-none"
          style={{ left: '50%', top: '10px', transform: 'translateX(-50%)' }}
        >
          <p className="font-semibold text-white mb-1">{tooltip.node.label}</p>
          <p>{tooltip.node.description}</p>
        </div>
      )}
    </div>
  )
}
