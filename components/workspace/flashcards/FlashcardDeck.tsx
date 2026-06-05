'use client'
import { ChevronLeft, ChevronRight, Shuffle, RefreshCw } from 'lucide-react'
import { motion } from 'framer-motion'
import { FlashcardItem } from './FlashcardItem'
import { useFlashcardStore } from '@/store/flashcard.store'

export function FlashcardDeck() {
  const { cards, currentIndex, isFlipped, next, prev, flip, shuffle, reset } = useFlashcardStore()
  const card = cards[currentIndex]

  if (!card) return null

  return (
    <div className="space-y-6">
      {/* Navigation header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            id="flashcard-prev"
            onClick={prev}
            disabled={currentIndex === 0}
            className="p-2 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm text-zinc-500 font-mono px-3">
            {currentIndex + 1} / {cards.length}
          </span>
          <button
            id="flashcard-next"
            onClick={next}
            disabled={currentIndex === cards.length - 1}
            className="p-2 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            id="flashcard-shuffle"
            onClick={shuffle}
            className="p-2 rounded-lg border border-white/10 text-zinc-500 hover:text-violet-400 hover:border-violet-500/30 transition-all"
            title="Shuffle cards"
          >
            <Shuffle className="w-3.5 h-3.5" />
          </button>
          <button
            id="flashcard-reset"
            onClick={reset}
            className="p-2 rounded-lg border border-white/10 text-zinc-500 hover:text-zinc-300 hover:border-white/20 transition-all"
            title="Reset progress"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full bg-violet-500 rounded-full"
          animate={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Card */}
      <FlashcardItem card={card} isFlipped={isFlipped} onClick={flip} />
    </div>
  )
}
