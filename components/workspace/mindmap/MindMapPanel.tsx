import { GitBranch } from 'lucide-react'
import { MindMapGraph } from './MindMapGraph'
import { EmptyState } from '@/components/shared/EmptyState'
import type { MindMapGraph as MindMapGraphType } from '@/types/mindmap.types'

interface MindMapPanelProps {
  mindmapData: MindMapGraphType | null
}

export function MindMapPanel({ mindmapData }: MindMapPanelProps) {
  if (!mindmapData || !mindmapData.root) {
    return (
      <EmptyState
        icon={GitBranch}
        title="No mind map yet"
        description="Your concept mind map will appear here after your lecture is processed."
      />
    )
  }

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="mb-3 flex items-center gap-2">
        <h3 className="text-sm font-semibold text-white">{mindmapData.root.label}</h3>
        <span className="text-xs text-zinc-500">{mindmapData.nodes.length + 1} concepts</span>
      </div>
      <div className="flex-1 rounded-xl bg-white/[0.02] border border-white/8 overflow-hidden">
        <MindMapGraph graph={mindmapData} />
      </div>
      <p className="text-xs text-zinc-600 text-center mt-2">Hover over nodes to see descriptions · Use zoom controls to navigate</p>
    </div>
  )
}
