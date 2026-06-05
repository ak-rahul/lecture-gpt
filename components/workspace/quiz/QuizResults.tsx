'use client'
import { motion } from 'framer-motion'
import { Trophy, RefreshCw, ArrowRight, Layers } from 'lucide-react'
import { ShinyButton } from '@/components/shared/ShinyButton'
import { useQuizStore } from '@/store/quiz.store'
import { useFlashcardStore } from '@/store/flashcard.store'

interface QuizResultsProps {
  onSwitchToFlashcards?: () => void
}

export function QuizResults({ onSwitchToFlashcards }: QuizResultsProps) {
  const { questions, answers, score, reset } = useQuizStore()
  const { cards } = useFlashcardStore()
  const total = questions.length
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0

  const getGrade = () => {
    if (percentage >= 90) return { label: 'Excellent!', color: 'text-emerald-400' }
    if (percentage >= 70) return { label: 'Good Job!', color: 'text-emerald-400' }
    if (percentage >= 50) return { label: 'Keep Going!', color: 'text-amber' }
    return { label: 'Keep Studying', color: 'text-red-400' }
  }

  const grade = getGrade()

  // Find topics of wrong answers
  const wrongTopics = questions
    .filter(q => {
      const ans = answers[q.id]
      return ans && !ans.isCorrect
    })
    .map(q => {
      const card = cards.find(c => c.front.toLowerCase().includes(q.question.split(' ').slice(0, 3).join(' ').toLowerCase()))
      return card?.topic || (q.question.length > 40 ? q.question.slice(0, 40) + '...' : q.question)
    })
    .filter((v, i, a) => a.indexOf(v) === i)
    .slice(0, 3)

  const circumference = 2 * Math.PI * 42

  return (
    <motion.div
      className="flex flex-col items-center py-10 px-6 max-w-md mx-auto space-y-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="p-4 rounded-2xl bg-surface-1 border border-border">
        <Trophy className="w-10 h-10 text-amber" />
      </div>

      <div className="text-center">
        <h2 className={`text-2xl font-bold mb-1 ${grade.color}`}>{grade.label}</h2>
        <p className="text-foreground-subtle text-sm">Quiz complete</p>
      </div>

      {/* Score ring */}
      <div className="relative w-28 h-28">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(0 0% 14%)" strokeWidth="8" />
          <motion.circle
            cx="50" cy="50" r="42" fill="none"
            stroke="hsl(var(--accent))"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference * (1 - percentage / 100) }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-foreground">{percentage}%</span>
          <span className="text-xs text-foreground-subtle tabular-nums">{score}/{total}</span>
        </div>
      </div>

      {/* Performance breakdown */}
      {wrongTopics.length > 0 && (
        <div className="w-full p-4 rounded-xl bg-surface-1 border border-border space-y-3">
          <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider">Concepts to Review</p>
          <ul className="space-y-1.5">
            {wrongTopics.map((topic, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-foreground-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400/60 flex-shrink-0" />
                {topic}
              </li>
            ))}
          </ul>
          {onSwitchToFlashcards && (
            <button
              onClick={onSwitchToFlashcards}
              className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors mt-2"
            >
              <Layers className="w-3 h-3" />
              Review flashcards <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      )}

      <div className="flex gap-3 w-full">
        <ShinyButton
          id="retake-quiz-button"
          onClick={reset}
          className="flex-1 flex items-center gap-2 justify-center"
        >
          <RefreshCw className="w-4 h-4" />
          Retake
        </ShinyButton>
      </div>
    </motion.div>
  )
}
