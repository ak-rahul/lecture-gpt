'use client'
import { motion } from 'framer-motion'
import { MessageSquare, Layers, FileQuestion, Network } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useFlashcardStore } from '@/store/flashcard.store'
import { useQuizStore } from '@/store/quiz.store'

export type WorkspaceTab = 'chat' | 'flashcards' | 'quiz' | 'mindmap'

interface TabNavigationProps {
  activeTab: WorkspaceTab
  onTabChange: (tab: WorkspaceTab) => void
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const { cards } = useFlashcardStore()
  const { questions } = useQuizStore()

  const tabs: { id: WorkspaceTab; label: string; icon: React.ElementType; count?: number }[] = [
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'flashcards', label: 'Flashcards', icon: Layers, count: cards.length || undefined },
    { id: 'quiz', label: 'Quiz', icon: FileQuestion, count: questions.length || undefined },
    { id: 'mindmap', label: 'Mind Map', icon: Network },
  ]

  return (
    <div className="flex justify-center px-4 py-3 border-b border-border">
      <div className="flex items-center p-1 rounded-xl bg-surface-1 border border-border gap-0.5">
        {tabs.map(tab => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            onClick={() => onTabChange(tab.id)}
            aria-selected={activeTab === tab.id}
            role="tab"
            className={cn(
              'relative flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-colors duration-150 z-10',
              activeTab === tab.id ? 'text-foreground' : 'text-foreground-muted hover:text-foreground'
            )}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="tab-pill"
                className="absolute inset-0 rounded-lg bg-surface-3 border border-border-strong"
                transition={{ type: 'spring', bounce: 0.15, duration: 0.35 }}
              />
            )}
            <tab.icon className="w-3.5 h-3.5 relative z-10 flex-shrink-0" />
            <span className="relative z-10 hidden sm:inline">{tab.label}</span>
            {tab.count !== undefined && (
              <span className="relative z-10 hidden sm:inline text-[10px] px-1.5 py-0.5 rounded-full bg-surface-1 border border-border text-foreground-subtle tabular-nums">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
