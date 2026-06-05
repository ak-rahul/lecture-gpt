'use client'
import { motion } from 'framer-motion'
import { MessageSquare, Layers, ClipboardCheck, GitBranch } from 'lucide-react'
import { cn } from '@/lib/utils'

export type WorkspaceTab = 'chat' | 'flashcards' | 'quiz' | 'mindmap'

const tabs = [
  { id: 'chat' as WorkspaceTab, label: 'Chat', icon: MessageSquare },
  { id: 'flashcards' as WorkspaceTab, label: 'Flashcards', icon: Layers },
  { id: 'quiz' as WorkspaceTab, label: 'Quiz', icon: ClipboardCheck },
  { id: 'mindmap' as WorkspaceTab, label: 'Mind Map', icon: GitBranch },
]

interface TabNavigationProps {
  activeTab: WorkspaceTab
  onTabChange: (tab: WorkspaceTab) => void
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="flex border-b border-white/8">
      {tabs.map(tab => (
        <button
          key={tab.id}
          id={`workspace-tab-${tab.id}`}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'relative flex items-center gap-2 px-5 py-3.5 text-sm font-medium transition-colors',
            activeTab === tab.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
          )}
        >
          <tab.icon className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{tab.label}</span>
          {activeTab === tab.id && (
            <motion.div
              layoutId="workspace-tab-indicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-500 rounded-full"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
            />
          )}
        </button>
      ))}
    </div>
  )
}
