'use client'
import { useRouter } from 'next/navigation'
import { ArrowLeft, FileText, BookOpen } from 'lucide-react'
import { useFlashcardStore } from '@/store/flashcard.store'
import type { LectureSession } from '@/types/session.types'
import { formatWordCount } from '@/lib/utils'

interface SessionHeaderProps {
  session: LectureSession
}

export function SessionHeader({ session }: SessionHeaderProps) {
  const router = useRouter()
  const { cards, knownIds } = useFlashcardStore()

  const knownCount = knownIds.size
  const totalCards = cards.length
  const progress = totalCards > 0 ? Math.round((knownCount / totalCards) * 100) : 0
  const circumference = 2 * Math.PI * 9

  return (
    <div className="border-b border-border bg-background/95 backdrop-blur-sm">
      {/* Top row */}
      <div className="flex items-center gap-3 px-4 py-3">
        <button
          onClick={() => router.push('/')}
          aria-label="Back to home"
          className="p-2 rounded-lg hover:bg-surface-1 text-foreground-muted hover:text-foreground transition-all flex-shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="p-1.5 rounded-md bg-surface-2 flex-shrink-0">
            <FileText className="w-3.5 h-3.5 text-foreground-muted" />
          </div>
          <h1 className="text-sm font-semibold text-foreground truncate">{session.documentTitle}</h1>
          <span className={`flex-shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded uppercase tracking-wide ${
            session.sourceType === 'pdf'
              ? 'bg-primary/10 text-primary border border-primary/20'
              : 'bg-red-500/10 text-red-400 border border-red-500/20'
          }`}>
            {session.sourceType === 'pdf' ? 'PDF' : 'YT'}
          </span>
        </div>

        {/* Flashcard progress ring */}
        {totalCards > 0 && (
          <div className="flex items-center gap-2 flex-shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" className="-rotate-90">
              <circle cx="12" cy="12" r="9" fill="none" stroke="hsl(0 0% 14%)" strokeWidth="2" />
              <circle
                cx="12" cy="12" r="9" fill="none"
                stroke="hsl(245 85% 62%)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - progress / 100)}
                className="transition-all duration-500"
              />
            </svg>
            <span className="text-xs text-foreground-muted tabular-nums">{knownCount}/{totalCards}</span>
          </div>
        )}

        {/* Ghost export button */}
        <button
          aria-label="Export session"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs text-foreground-muted hover:text-foreground hover:border-border-strong transition-all"
        >
          <BookOpen className="w-3.5 h-3.5" />
          Export
        </button>
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-4 px-4 pb-2.5 overflow-x-auto scrollbar-none">
        {[
          { label: 'Words', value: formatWordCount(session.stats.wordCount) },
          session.stats.pageCount ? { label: 'Pages', value: session.stats.pageCount.toString() } : null,
          { label: 'Flashcards', value: session.stats.flashcardCount.toString() },
          { label: 'Questions', value: session.stats.questionCount.toString() },
        ].filter(Boolean).map(stat => (
          <div key={stat!.label} className="flex items-center gap-1.5 flex-shrink-0">
            <span className="text-[11px] text-foreground-subtle">{stat!.label}</span>
            <span className="text-[11px] font-semibold text-foreground-muted tabular-nums">{stat!.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
