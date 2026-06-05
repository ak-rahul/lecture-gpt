'use client'
import { cn } from '@/lib/utils'
import type { Flashcard } from '@/types/flashcard.types'

interface FlashcardItemProps {
  card: Flashcard
  isFlipped: boolean
  onFlip?: () => void
  onClick?: () => void
  current?: number
  total?: number
}

const difficultyConfig = {
  easy:   { label: 'Easy',   class: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  medium: { label: 'Medium', class: 'bg-amber/10 text-amber border-amber/20' },
  hard:   { label: 'Hard',   class: 'bg-red-500/10 text-red-400 border-red-500/20' },
}

export function FlashcardItem({ card, isFlipped, onFlip, onClick, current, total }: FlashcardItemProps) {
  const diff = difficultyConfig[card.difficulty]

  return (
    <div className="flashcard-scene w-full cursor-pointer" onClick={onClick || onFlip} role="button" tabIndex={0}
      onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); if (onClick) onClick(); else if (onFlip) onFlip(); } }}
      aria-label={isFlipped ? 'Flip card to front' : 'Flip card to see answer'}
    >
      <div className={`flashcard-inner w-full min-h-[240px] relative ${isFlipped ? 'flipped' : ''}`}>
        {/* Front */}
        <div className="flashcard-face absolute inset-0 rounded-2xl bg-surface-1 border border-border p-6 flex flex-col">
          {/* Top indicators */}
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs text-foreground-subtle tabular-nums">
              {current !== undefined && total !== undefined ? `${current} / ${total}` : ''}
            </span>
            <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded-full border', diff.class)}>
              {diff.label}
            </span>
          </div>

          {/* Accent bar */}
          <div className="w-10 h-0.5 bg-gradient-to-r from-primary to-transparent rounded-full mb-5" />

          {/* Question */}
          <div className="flex-1 flex items-center justify-center">
            <p className="text-base font-medium text-foreground text-center leading-relaxed">{card.front}</p>
          </div>

          {/* Hint */}
          <div className="mt-4 flex items-center justify-center gap-1.5">
            <kbd className="text-[10px] px-1.5 py-0.5 rounded border border-border bg-surface-2 text-foreground-subtle font-mono">Space</kbd>
            <span className="text-[10px] text-foreground-subtle">to flip</span>
          </div>
        </div>

        {/* Back */}
        <div className="flashcard-face flashcard-back absolute inset-0 rounded-2xl bg-surface-2 border border-primary/20 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs text-foreground-subtle tabular-nums">{current} / {total}</span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary">
              Answer
            </span>
          </div>

          <div className="w-10 h-0.5 bg-gradient-to-r from-primary to-transparent rounded-full mb-5" />

          <div className="flex-1 flex items-start justify-center">
            <p className="text-sm text-foreground leading-relaxed text-center">{card.back}</p>
          </div>

          <div className="mt-4">
            <p className="text-[11px] text-foreground-subtle text-center">
              Topic: <span className="text-foreground-muted">{card.topic}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
