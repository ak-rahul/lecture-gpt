'use client'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { Flashcard } from '@/types/flashcard.types'

const DIFFICULTY_COLORS = {
  easy: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  hard: 'bg-red-500/10 text-red-400 border-red-500/20',
}

interface FlashcardItemProps {
  card: Flashcard
  isFlipped: boolean
  onClick: () => void
}

export function FlashcardItem({ card, isFlipped, onClick }: FlashcardItemProps) {
  return (
    <div
      id="flashcard-item"
      className="flashcard-scene w-full cursor-pointer select-none"
      style={{ height: '280px' }}
      onClick={onClick}
    >
      <motion.div
        className="flashcard-inner w-full h-full relative"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
      >
        {/* Front */}
        <div
          className={cn(
            'flashcard-face absolute inset-0 flex flex-col items-center justify-center p-8',
            'rounded-2xl border border-white/10 bg-white/[0.04]',
            'text-center'
          )}
        >
          <div className={`px-2 py-0.5 rounded-full text-xs border mb-4 ${DIFFICULTY_COLORS[card.difficulty]}`}>
            {card.difficulty}
          </div>
          <p className="text-xs text-zinc-500 mb-3 font-medium uppercase tracking-wider">{card.topic}</p>
          <p className="text-lg font-medium text-white leading-relaxed">{card.front}</p>
          <p className="text-xs text-zinc-600 mt-6">Click to reveal answer</p>
        </div>

        {/* Back */}
        <div
          className={cn(
            'flashcard-face flashcard-back absolute inset-0 flex flex-col items-center justify-center p-8',
            'rounded-2xl border border-violet-500/20 bg-violet-950/20',
            'text-center'
          )}
        >
          <div className="w-8 h-0.5 bg-violet-500/40 rounded-full mb-5" />
          <p className="text-base text-zinc-200 leading-relaxed">{card.back}</p>
          <p className="text-xs text-zinc-600 mt-6">Click to flip back</p>
        </div>
      </motion.div>
    </div>
  )
}
