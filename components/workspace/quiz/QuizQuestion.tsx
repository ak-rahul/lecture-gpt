'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, ChevronRight } from 'lucide-react'
import { ShinyButton } from '@/components/shared/ShinyButton'
import { useQuizStore } from '@/store/quiz.store'
import { cn } from '@/lib/utils'
import type { Question } from '@/types/quiz.types'

interface QuizQuestionProps {
  question: Question
  onNext: () => void
}

export function QuizQuestion({ question, onNext }: QuizQuestionProps) {
  const { submitAnswer } = useQuizStore()
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [shortAnswer, setShortAnswer] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [feedback, setFeedback] = useState<{ score: number; message: string } | null>(null)

  const handleMCQSelect = (index: number) => {
    if (submitted) return
    setSelectedOption(index)
  }

  const handleMCQSubmit = () => {
    if (selectedOption === null || question.type !== 'mcq') return
    const isCorrect = selectedOption === question.correct
    submitAnswer({
      questionId: question.id,
      answer: selectedOption,
      isCorrect,
    })
    setFeedback({
      score: isCorrect ? 1 : 0,
      message: isCorrect ? 'Correct! ' + question.explanation : 'Incorrect. ' + question.explanation,
    })
    setSubmitted(true)
  }

  const handleShortAnswerSubmit = async () => {
    if (!shortAnswer.trim() || question.type !== 'short_answer') return
    setSubmitted(true)

    // Keyword-based scoring against key_points array
    const answer = shortAnswer.toLowerCase()
    const keyPoints: string[] = question.key_points || []
    const matched = keyPoints.filter(kp =>
      kp.toLowerCase().split(' ').some(word => word.length > 3 && answer.includes(word))
    )
    const scoreRatio = keyPoints.length > 0 ? matched.length / keyPoints.length : 0.5
    const score = scoreRatio >= 0.6 ? 2 : scoreRatio >= 0.3 ? 1 : 0

    const feedbackMessages = {
      2: `Great answer! You covered the key points.`,
      1: `Partially correct. Sample answer: ${question.sample_answer}`,
      0: `Not quite. Sample answer: ${question.sample_answer}`,
    }

    setFeedback({ score, message: feedbackMessages[score as 0 | 1 | 2] })
    submitAnswer({
      questionId: question.id,
      answer: shortAnswer,
      score,
      feedback: feedbackMessages[score as 0 | 1 | 2],
    })
  }

  const handleNext = () => {
    setSelectedOption(null)
    setShortAnswer('')
    setSubmitted(false)
    setFeedback(null)
    onNext()
  }

  return (
    <motion.div
      key={question.id}
      className="space-y-5"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Question */}
      <div className="p-5 rounded-2xl bg-surface-1 border border-border">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] px-2 py-0.5 rounded-full border bg-surface-2 border-border text-foreground-subtle uppercase tracking-wider font-semibold">
            {question.type === 'mcq' ? 'Multiple Choice' : 'Short Answer'}
          </span>
        </div>
        <p className="text-foreground font-medium leading-relaxed">{question.question}</p>
      </div>

      {/* MCQ Options */}
      {question.type === 'mcq' && (
        <div className="space-y-2">
          {question.options.map((option, index) => {
            const isSelected = selectedOption === index
            const isCorrect = index === question.correct
            let optionStyle = 'border-border bg-surface-1 text-foreground-muted hover:border-border-strong hover:bg-surface-2 hover:text-foreground'
            
            if (submitted) {
              if (isCorrect) optionStyle = 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
              else if (isSelected && !isCorrect) optionStyle = 'border-red-500/50 bg-red-500/10 text-red-400'
              else optionStyle = 'border-border bg-surface-1 text-foreground-subtle opacity-60'
            } else if (isSelected) {
              optionStyle = 'border-accent/50 bg-accent/10 text-accent'
            }

            return (
              <button
                key={index}
                id={`quiz-option-${index}`}
                onClick={() => handleMCQSelect(index)}
                disabled={submitted}
                className={cn(
                  'w-full text-left p-4 rounded-xl border transition-all duration-200',
                  'flex items-center gap-3',
                  optionStyle,
                  !submitted && 'cursor-pointer'
                )}
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-sm">{option}</span>
                {submitted && isCorrect && <CheckCircle className="ml-auto w-4 h-4 text-emerald-400" />}
                {submitted && isSelected && !isCorrect && <XCircle className="ml-auto w-4 h-4 text-red-400" />}
              </button>
            )
          })}
        </div>
      )}

      {/* Short Answer */}
      {question.type === 'short_answer' && (
        <div className="space-y-3">
          <textarea
            id="short-answer-input"
            value={shortAnswer}
            onChange={e => setShortAnswer(e.target.value)}
            placeholder="Type your answer here..."
            disabled={submitted}
            rows={4}
            className="w-full p-4 rounded-xl bg-surface-1 border border-border text-foreground placeholder:text-foreground-subtle text-sm focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent/50 resize-none disabled:opacity-50"
          />
        </div>
      )}

      {/* Feedback */}
      <AnimatePresence>
        {submitted && feedback && (
          <motion.div
            className={cn(
              'p-4 rounded-xl border text-sm leading-relaxed',
              feedback.score > 0
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                : 'bg-red-500/10 border-red-500/20 text-red-300'
            )}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {feedback.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action buttons */}
      {!submitted ? (
        <ShinyButton
          id="quiz-submit-button"
          onClick={question.type === 'mcq' ? handleMCQSubmit : handleShortAnswerSubmit}
          disabled={question.type === 'mcq' ? selectedOption === null : !shortAnswer.trim()}
          className="w-full py-3"
        >
          Submit Answer
        </ShinyButton>
      ) : (
        <button
          id="quiz-next-button"
          onClick={handleNext}
          className="w-full py-3 rounded-xl border border-border text-foreground hover:bg-surface-2 hover:border-border-strong transition-all flex items-center justify-center gap-2 font-medium"
        >
          Next Question
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </motion.div>
  )
}
