'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { ZoomIn, ZoomOut, RefreshCw } from 'lucide-react'
import { EmptyState } from '@/components/shared/EmptyState'
import { Network } from 'lucide-react'
import type { MindMapGraph as MindMapGraphType, MindMapNode } from '@/types/mindmap.types'

interface NodePosition {
  x: number
  y: number
  width: number
  height: number
}

interface MindMapGraphProps {
  graph: MindMapGraphType
}

const NODE_W_ROOT = 160
const NODE_H_ROOT = 48
const NODE_W_1 = 140
const NODE_H_1 = 40
const NODE_W_2 = 120
const NODE_H_2 = 34
const CANVAS_W = 1100
const CANVAS_H = 800

function computePositions(graph: MindMapGraphType): Record<string, NodePosition> {
  const positions: Record<string, NodePosition> = {}
  const cx = CANVAS_W / 2
  const cy = CANVAS_H / 2

  // Root at center
  positions[graph.root.id] = { x: cx, y: cy, width: NODE_W_ROOT, height: NODE_H_ROOT }

  const depth1 = graph.nodes.filter(n => n.depth === 1)
  const depth2 = graph.nodes.filter(n => n.depth === 2)

  // Position depth-1 in a circle around root
  const r1 = 220
  depth1.forEach((node, i) => {
    const angle = (i / depth1.length) * Math.PI * 2 - Math.PI / 2
    positions[node.id] = {
      x: cx + Math.cos(angle) * r1,
      y: cy + Math.sin(angle) * r1,
      width: NODE_W_1,
      height: NODE_H_1,
    }
  })

  // Position depth-2 in a circle around their parent
  const r2 = 120
  depth1.forEach((parent, pi) => {
    const children = depth2.filter(n => n.parent === parent.id)
    const parentPos = positions[parent.id]
    if (!parentPos) return
    const parentAngle = (pi / depth1.length) * Math.PI * 2 - Math.PI / 2
    children.forEach((child, ci) => {
      const spreadAngle = (children.length === 1 ? 0 : (ci / (children.length - 1) - 0.5) * (Math.PI * 0.6))
      const angle = parentAngle + spreadAngle
      positions[child.id] = {
        x: parentPos.x + Math.cos(angle) * r2,
        y: parentPos.y + Math.sin(angle) * r2,
        width: NODE_W_2,
        height: NODE_H_2,
      }
    })
  })

  // Fallback for nodes without computed positions
  graph.nodes.forEach((node, i) => {
    if (!positions[node.id]) {
      positions[node.id] = { x: 100 + i * 80, y: 100, width: NODE_W_2, height: NODE_H_2 }
    }
  })

  return positions
}

function bezierPath(x1: number, y1: number, x2: number, y2: number): string {
  const dx = x2 - x1
  const dy = y2 - y1
  const cx1 = x1 + dx * 0.4
  const cy1 = y1 + dy * 0.1
  const cx2 = x2 - dx * 0.4
  const cy2 = y2 - dy * 0.1
  return `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`
}

export function MindMapGraph({ graph }: MindMapGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [positions, setPositions] = useState<Record<string, NodePosition>>({})
  const [hoveredNode, setHoveredNode] = useState<MindMapNode | null>(null)
  const [tooltip, setTooltip] = useState<{ x: number; y: number } | null>(null)
  const [scale, setScale] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const isDragging = useRef(false)
  const lastMouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (graph?.nodes) {
      setPositions(computePositions(graph))
    }
  }, [graph])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true
    lastMouse.current = { x: e.clientX, y: e.clientY }
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return
    const dx = e.clientX - lastMouse.current.x
    const dy = e.clientY - lastMouse.current.y
    lastMouse.current = { x: e.clientX, y: e.clientY }
    setPan(prev => ({ x: prev.x + dx, y: prev.y + dy }))
  }, [])

  const handleMouseUp = useCallback(() => {
    isDragging.current = false
  }, [])

  // BUG FIX 3: Position tooltip near hovered node in SVG space
  const handleNodeHover = useCallback((node: MindMapNode, pos: NodePosition, svgEl: SVGSVGElement) => {
    setHoveredNode(node)
    const rect = svgEl.getBoundingClientRect()
    const viewBoxW = CANVAS_W
    const viewBoxH = CANVAS_H
    const scaleX = rect.width / viewBoxW
    const scaleY = rect.height / viewBoxH
    const screenX = (pos.x * scale + pan.x) * scaleX + rect.left
    const screenY = (pos.y * scale + pan.y) * scaleY + rect.top
    // Store relative to container
    if (containerRef.current) {
      const cRect = containerRef.current.getBoundingClientRect()
      setTooltip({
        x: screenX - cRect.left,
        y: screenY - cRect.top - pos.height * scaleY - 40,
      })
    }
  }, [scale, pan])

  const zoom = (delta: number) => {
    setScale(s => Math.min(Math.max(s + delta, 0.4), 2.5))
  }

  const resetView = () => {
    setScale(1)
    setPan({ x: 0, y: 0 })
  }

  if (!graph || !graph.nodes || graph.nodes.length === 0) {
    return (
      <EmptyState
        icon={Network}
        title="No mind map available"
        description="The concept map could not be generated for this lecture."
      />
    )
  }

  const allNodes = [graph.root, ...graph.nodes]

  return (
    <div className="relative flex flex-col h-full" ref={containerRef}>
      {/* Controls */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 p-1 rounded-xl bg-surface-1 border border-border">
        <button
          onClick={() => zoom(0.15)}
          aria-label="Zoom in"
          className="p-2 rounded-lg hover:bg-surface-2 text-foreground-muted hover:text-foreground transition-colors"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => zoom(-0.15)}
          aria-label="Zoom out"
          className="p-2 rounded-lg hover:bg-surface-2 text-foreground-muted hover:text-foreground transition-colors"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        <div className="w-px h-4 bg-border" />
        <button
          onClick={resetView}
          aria-label="Reset view"
          className="p-2 rounded-lg hover:bg-surface-2 text-foreground-muted hover:text-foreground transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Tooltip — BUG FIX: positioned near node */}
      {hoveredNode && tooltip && (
        <div
          className="absolute z-30 max-w-[200px] px-3 py-2 rounded-xl bg-surface-3 border border-border text-xs text-foreground-muted pointer-events-none shadow-float"
          style={{ left: tooltip.x, top: tooltip.y, transform: 'translateX(-50%)' }}
        >
          <p className="font-semibold text-foreground mb-0.5">{hoveredNode.label}</p>
          {hoveredNode.description && <p className="leading-relaxed">{hoveredNode.description}</p>}
        </div>
      )}

      {/* SVG canvas */}
      <div
        className="flex-1 overflow-hidden bg-surface-1/40 rounded-xl border border-border cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => { handleMouseUp(); setHoveredNode(null); setTooltip(null) }}
      >
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
          preserveAspectRatio="xMidYMid meet"
          style={{ display: 'block' }}
        >
          <g transform={`translate(${pan.x}, ${pan.y}) scale(${scale})`}>
            {/* Edges */}
            {graph.edges.map((edge, i) => {
              const from = positions[edge.from]
              const to = positions[edge.to]
              if (!from || !to) return null
              return (
                <path
                  key={i}
                  d={bezierPath(from.x, from.y, to.x, to.y)}
                  fill="none"
                  stroke="hsl(0 0% 22%)"
                  strokeWidth={1}
                  strokeOpacity={0.7}
                />
              )
            })}

            {/* Nodes */}
            {allNodes.map(node => {
              const pos = positions[node.id]
              if (!pos) return null
              const isRoot = node.id === graph.root.id
              const isHovered = hoveredNode?.id === node.id
              const hw = pos.width / 2
              const hh = pos.height / 2
              const rx = isRoot ? 24 : node.depth === 1 ? 14 : 10

              return (
                <g
                  key={node.id}
                  transform={`translate(${pos.x - hw}, ${pos.y - hh})`}
                  onMouseEnter={() => svgRef.current && handleNodeHover(node, pos, svgRef.current)}
                  onMouseLeave={() => { setHoveredNode(null); setTooltip(null) }}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Node rect */}
                  <rect
                    width={pos.width}
                    height={pos.height}
                    rx={rx}
                    fill={
                      isRoot ? 'url(#rootGrad)'
                        : node.depth === 1 ? 'hsl(0 0% 13.5%)'
                        : 'hsl(0 0% 10%)'
                    }
                    stroke={
                      isRoot ? 'rgba(91,91,214,0.6)'
                        : isHovered ? 'hsl(0 0% 22%)'
                        : node.depth === 1 ? 'rgba(91,91,214,0.2)'
                        : 'hsl(0 0% 14%)'
                    }
                    strokeWidth={isRoot ? 1.5 : 1}
                    style={{ transition: 'all 0.15s' }}
                    transform={isHovered ? `scale(1.06) translate(-${pos.width * 0.03}, -${pos.height * 0.03})` : undefined}
                  />

                  {/* Node text */}
                  <text
                    x={pos.width / 2}
                    y={pos.height / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={isRoot ? 13 : node.depth === 1 ? 11 : 10}
                    fontWeight={isRoot ? '700' : node.depth === 1 ? '500' : '400'}
                    fill={
                      isRoot ? 'white'
                        : node.depth === 1 ? 'hsl(245 85% 78%)'
                        : 'hsl(0 0% 60%)'
                    }
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                  >
                    {node.label.length > 18 ? node.label.slice(0, 17) + '…' : node.label}
                  </text>
                </g>
              )
            })}

            {/* Defs */}
            <defs>
              <linearGradient id="rootGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(245 85% 58%)" />
                <stop offset="100%" stopColor="hsl(262 70% 50%)" />
              </linearGradient>
            </defs>
          </g>
        </svg>
      </div>

      <p className="text-[11px] text-foreground-subtle text-center mt-2">
        Scroll to zoom · Drag to pan · Hover for details
      </p>
    </div>
  )
}
