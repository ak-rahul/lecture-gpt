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
    // MCQ: 1 point for correct. Short answer: score is 0, 1, or 2 (map to 0, 0.5, 1)
    const points = answer.isCorrect === true
      ? 1
      : answer.score === 2 ? 1 : answer.score === 1 ? 0.5 : 0
    set({ answers: newAnswers, score: score + points })
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
