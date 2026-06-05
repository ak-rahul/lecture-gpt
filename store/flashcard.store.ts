import { create } from 'zustand'
import type { Flashcard } from '@/types/flashcard.types'

interface FlashcardStore {
  cards: Flashcard[]
  currentIndex: number
  isFlipped: boolean
  knownIds: Set<string>
  unknownIds: Set<string>
  setCards: (cards: Flashcard[]) => void
  next: () => void
  prev: () => void
  flip: () => void
  markKnown: () => void
  markUnknown: () => void
  reset: () => void
  shuffle: () => void
}

export const useFlashcardStore = create<FlashcardStore>((set, get) => ({
  cards: [],
  currentIndex: 0,
  isFlipped: false,
  knownIds: new Set(),
  unknownIds: new Set(),
  setCards: (cards) => set({ cards, currentIndex: 0, isFlipped: false, knownIds: new Set(), unknownIds: new Set() }),
  next: () => {
    const { cards, currentIndex } = get()
    if (currentIndex < cards.length - 1) {
      set({ currentIndex: currentIndex + 1, isFlipped: false })
    }
  },
  prev: () => {
    const { currentIndex } = get()
    if (currentIndex > 0) {
      set({ currentIndex: currentIndex - 1, isFlipped: false })
    }
  },
  flip: () => set((state) => ({ isFlipped: !state.isFlipped })),
  markKnown: () => {
    const { cards, currentIndex, knownIds, unknownIds } = get()
    const card = cards[currentIndex]
    if (!card) return
    const newKnown = new Set(knownIds)
    const newUnknown = new Set(unknownIds)
    newKnown.add(card.id)
    newUnknown.delete(card.id)
    set({ knownIds: newKnown, unknownIds: newUnknown })
    if (currentIndex < cards.length - 1) set({ currentIndex: currentIndex + 1, isFlipped: false })
  },
  markUnknown: () => {
    const { cards, currentIndex, knownIds, unknownIds } = get()
    const card = cards[currentIndex]
    if (!card) return
    const newKnown = new Set(knownIds)
    const newUnknown = new Set(unknownIds)
    newUnknown.add(card.id)
    newKnown.delete(card.id)
    set({ knownIds: newKnown, unknownIds: newUnknown })
    if (currentIndex < cards.length - 1) set({ currentIndex: currentIndex + 1, isFlipped: false })
  },
  reset: () => set({ currentIndex: 0, isFlipped: false, knownIds: new Set(), unknownIds: new Set() }),
  shuffle: () => {
    const { cards } = get()
    const shuffled = [...cards].sort(() => Math.random() - 0.5)
    set({ cards: shuffled, currentIndex: 0, isFlipped: false })
  },
}))
