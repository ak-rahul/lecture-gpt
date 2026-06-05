'use client'
import { AnimatePresence } from 'framer-motion'
import { ClipboardCheck } from 'lucide-react'
import { QuizQuestion } from './QuizQuestion'
import { QuizProgress } from './QuizProgress'
import { QuizResults } from './QuizResults'
import { EmptyState } from '@/components/shared/EmptyState'
import { useQuizStore } from '@/store/quiz.store'

export function QuizPanel() {
  const { questions, currentIndex, score, isComplete, next } = useQuizStore()

  if (questions.length === 0) {
    return (
      <EmptyState
        icon={ClipboardCheck}
        title="No quiz questions yet"
        description="Quiz questions will appear here after your lecture is processed."
      />
    )
  }

  if (isComplete) {
    return <QuizResults />
  }

  const currentQuestion = questions[currentIndex]

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      <QuizProgress current={currentIndex} total={questions.length} score={score} />
      <AnimatePresence mode="wait">
        {currentQuestion && (
          <QuizQuestion
            key={currentQuestion.id}
            question={currentQuestion}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
