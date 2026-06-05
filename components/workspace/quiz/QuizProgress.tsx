import { motion } from 'framer-motion'

interface QuizProgressProps {
  current: number
  total: number
  score: number
}

export function QuizProgress({ current, total, score }: QuizProgressProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-zinc-400">Question {current + 1} of {total}</span>
        <span className="text-accent font-medium">Score: {score}</span>
      </div>
      <div className="h-1 rounded-full bg-surface-2 overflow-hidden">
        <motion.div
          className="h-full bg-accent rounded-full"
          animate={{ width: `${((current) / total) * 100}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
