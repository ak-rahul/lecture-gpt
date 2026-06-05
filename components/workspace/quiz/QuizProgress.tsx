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
        <span className="text-violet-400 font-medium">Score: {score}</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full bg-violet-500 rounded-full"
          animate={{ width: `${((current) / total) * 100}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
