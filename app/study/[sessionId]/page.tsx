'use client'
import { useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { SessionHeader } from '@/components/workspace/SessionHeader'
import { TabNavigation, type WorkspaceTab } from '@/components/workspace/TabNavigation'
import { ChatPanel } from '@/components/workspace/chat/ChatPanel'
import { FlashcardPanel } from '@/components/workspace/flashcards/FlashcardPanel'
import { QuizPanel } from '@/components/workspace/quiz/QuizPanel'
import { MindMapPanel } from '@/components/workspace/mindmap/MindMapPanel'
import { useSession } from '@/hooks/useSession'
import { useFlashcardStore } from '@/store/flashcard.store'
import { useQuizStore } from '@/store/quiz.store'
import { Loader2 } from 'lucide-react'

interface StudyPageProps {
  params: Promise<{ sessionId: string }>
}

export default function StudyPage({ params }: StudyPageProps) {
  const { sessionId } = use(params)
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<WorkspaceTab>('chat')
  const { session } = useSession(sessionId)

  // Hydrate stores when session loads
  const { setCards } = useFlashcardStore()
  const { setQuestions } = useQuizStore()

  useEffect(() => {
    if (session) {
      if (session.flashcards?.length) setCards(session.flashcards)
      if (session.questions?.length) setQuestions(session.questions)
    }
  }, [session, setCards, setQuestions])

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
        <p className="text-zinc-400 text-sm">Loading your session...</p>
        <button
          onClick={() => router.push('/')}
          className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors mt-2"
        >
          Session not found? Go back home
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <SessionHeader session={session} />

      {/* Tab Navigation */}
      <div className="border-b border-white/8 bg-black/20">
        <div className="max-w-6xl mx-auto px-4">
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-6xl mx-auto h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="h-full"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'chat' && (
                <div className="flex flex-col h-full" style={{ minHeight: 'calc(100vh - 130px)' }}>
                  <ChatPanel session={session} />
                </div>
              )}
              {activeTab === 'flashcards' && (
                <div className="overflow-y-auto py-2" style={{ maxHeight: 'calc(100vh - 130px)' }}>
                  <FlashcardPanel />
                </div>
              )}
              {activeTab === 'quiz' && (
                <div className="overflow-y-auto py-2" style={{ maxHeight: 'calc(100vh - 130px)' }}>
                  <QuizPanel />
                </div>
              )}
              {activeTab === 'mindmap' && (
                <div style={{ height: 'calc(100vh - 130px)' }}>
                  <MindMapPanel mindmapData={session.mindmapData} />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
