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
    setFeedback({ score: 1, message: `Sample answer: ${question.sample_answer}` })
    submitAnswer({
      questionId: question.id,
      answer: shortAnswer,
      score: 1,
      feedback: question.sample_answer,
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
      <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
            question.type === 'mcq'
              ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
              : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
          }`}>
            {question.type === 'mcq' ? 'Multiple Choice' : 'Short Answer'}
          </span>
        </div>
        <p className="text-white font-medium leading-relaxed">{question.question}</p>
      </div>

      {/* MCQ Options */}
      {question.type === 'mcq' && (
        <div className="space-y-2">
          {question.options.map((option, index) => {
            const isSelected = selectedOption === index
            const isCorrect = index === question.correct
            let optionStyle = 'border-white/10 text-zinc-300 hover:border-white/20 hover:bg-white/[0.02]'
            
            if (submitted) {
              if (isCorrect) optionStyle = 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300'
              else if (isSelected && !isCorrect) optionStyle = 'border-red-500/50 bg-red-500/10 text-red-300'
              else optionStyle = 'border-white/5 text-zinc-600 opacity-60'
            } else if (isSelected) {
              optionStyle = 'border-violet-500/50 bg-violet-500/10 text-violet-300'
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
            className="w-full p-4 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 resize-none disabled:opacity-60"
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
          className="w-full py-3 rounded-xl border border-white/10 text-white hover:bg-white/[0.04] transition-all flex items-center justify-center gap-2 font-medium"
        >
          Next Question
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </motion.div>
  )
}
