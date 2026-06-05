export type Difficulty = 'easy' | 'medium' | 'hard'

export interface Flashcard {
  id: string
  front: string
  back: string
  topic: string
  difficulty: Difficulty
}

export interface Deck {
  cards: Flashcard[]
  title: string
  createdAt: number
}
