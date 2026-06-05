export type QuestionType = 'mcq' | 'short_answer'

export interface MCQQuestion {
  id: string
  type: 'mcq'
  question: string
  options: string[]
  correct: number
  explanation: string
}

export interface ShortAnswerQuestion {
  id: string
  type: 'short_answer'
  question: string
  sample_answer: string
  key_points: string[]
}

export type Question = MCQQuestion | ShortAnswerQuestion

export interface UserAnswer {
  questionId: string
  answer: string | number
  isCorrect?: boolean
  score?: number
  feedback?: string
}

export interface QuizResult {
  score: number
  total: number
  percentage: number
  answers: UserAnswer[]
}
