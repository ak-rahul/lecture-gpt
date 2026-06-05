import { create } from 'zustand'
import type { Question, UserAnswer } from '@/types/quiz.types'

interface QuizStore {
  questions: Question[]
  currentIndex: number
  answers: Record<string, UserAnswer>
  score: number
  isComplete: boolean
  setQuestions: (questions: Question[]) => void
  submitAnswer: (answer: UserAnswer) => void
  next: () => void
  reset: () => void
}

export const useQuizStore = create<QuizStore>((set, get) => ({
  questions: [],
  currentIndex: 0,
  answers: {},
  score: 0,
  isComplete: false,
  setQuestions: (questions) => set({ questions, currentIndex: 0, answers: {}, score: 0, isComplete: false }),
  submitAnswer: (answer) => {
    const { answers, score } = get()
    const newAnswers = { ...answers, [answer.questionId]: answer }
    const newScore = answer.isCorrect ? score + 1 : (answer.score !== undefined ? score + answer.score / 2 : score)
    set({ answers: newAnswers, score: newScore })
  },
  next: () => {
    const { currentIndex, questions } = get()
    if (currentIndex >= questions.length - 1) {
      set({ isComplete: true })
    } else {
      set({ currentIndex: currentIndex + 1 })
    }
  },
  reset: () => set({ currentIndex: 0, answers: {}, score: 0, isComplete: false }),
}))
