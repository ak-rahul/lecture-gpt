'use client'
import { Layers, CheckCircle, XCircle } from 'lucide-react'
import { FlashcardDeck } from './FlashcardDeck'
import { FlashcardStats } from './FlashcardStats'
import { EmptyState } from '@/components/shared/EmptyState'
import { useFlashcardStore } from '@/store/flashcard.store'

export function FlashcardPanel() {
  const { cards, knownIds, unknownIds, markKnown, markUnknown } = useFlashcardStore()

  if (cards.length === 0) {
    return (
      <EmptyState
        icon={Layers}
        title="No flashcards yet"
        description="Flashcards will appear here after your lecture is processed."
      />
    )
  }

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      <FlashcardStats
        total={cards.length}
        known={knownIds.size}
        unknown={unknownIds.size}
      />

      <FlashcardDeck />

      {/* Action buttons */}
      <div className="flex gap-3">
        <button
          id="mark-unknown-button"
          onClick={markUnknown}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-all"
        >
          <XCircle className="w-4 h-4" />
          <span className="text-sm font-medium">Still Learning</span>
        </button>
        <button
          id="mark-known-button"
          onClick={markKnown}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10 transition-all"
        >
          <CheckCircle className="w-4 h-4" />
          <span className="text-sm font-medium">Got it!</span>
        </button>
      </div>
    </div>
  )
}
