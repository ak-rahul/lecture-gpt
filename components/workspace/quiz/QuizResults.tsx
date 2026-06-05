'use client'
import { motion } from 'framer-motion'
import { Trophy, RefreshCw, Star } from 'lucide-react'
import { ShinyButton } from '@/components/shared/ShinyButton'
import { useQuizStore } from '@/store/quiz.store'

export function QuizResults() {
  const { questions, score, reset } = useQuizStore()
  const total = questions.length
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0

  const getGrade = () => {
    if (percentage >= 90) return { label: 'Excellent!', color: 'text-emerald-400', stars: 3 }
    if (percentage >= 70) return { label: 'Good job!', color: 'text-blue-400', stars: 2 }
    if (percentage >= 50) return { label: 'Keep going!', color: 'text-yellow-400', stars: 1 }
    return { label: 'Keep studying!', color: 'text-red-400', stars: 0 }
  }

  const grade = getGrade()

  return (
    <motion.div
      className="flex flex-col items-center py-12 px-6 text-center space-y-6 max-w-md mx-auto"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="p-5 rounded-2xl bg-violet-500/10 border border-violet-500/20">
        <Trophy className="w-12 h-12 text-violet-400" />
      </div>

      <div>
        <h2 className={`text-3xl font-bold mb-1 ${grade.color}`}>{grade.label}</h2>
        <p className="text-zinc-400 text-sm">Quiz complete</p>
      </div>

      {/* Score circle */}
      <div className="relative w-32 h-32">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
          <motion.circle
            cx="50" cy="50" r="42" fill="none"
            stroke="#8b5cf6"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 42}`}
            initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - percentage / 100) }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-white">{percentage}%</span>
          <span className="text-xs text-zinc-500">{score}/{total}</span>
        </div>
      </div>

      {/* Stars */}
      <div className="flex gap-1">
        {[0, 1, 2].map(i => (
          <Star
            key={i}
            className={`w-6 h-6 ${i < grade.stars ? 'text-yellow-400 fill-yellow-400' : 'text-zinc-700'}`}
          />
        ))}
      </div>

      <ShinyButton
        id="retake-quiz-button"
        onClick={reset}
        className="flex items-center gap-2"
      >
        <RefreshCw className="w-4 h-4" />
        Retake Quiz
      </ShinyButton>
    </motion.div>
  )
}
