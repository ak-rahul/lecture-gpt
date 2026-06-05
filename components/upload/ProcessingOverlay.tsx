'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, FileText, CheckCircle } from 'lucide-react'
import { LoadingDots } from '@/components/shared/LoadingDots'
import { GradientText } from '@/components/shared/GradientText'
import type { ProcessingStage } from '@/types/session.types'

const stages = [
  { key: 'parsing', icon: FileText, label: 'Parsing document', color: 'text-blue-400' },
  { key: 'generating', icon: Brain, label: 'Generating study materials', color: 'text-violet-400' },
  { key: 'done', icon: CheckCircle, label: 'Almost there!', color: 'text-emerald-400' },
]

interface ProcessingOverlayProps {
  stage: ProcessingStage
  message?: string
}

export function ProcessingOverlay({ stage, message }: ProcessingOverlayProps) {
  const currentStage = stages.find(s => s.key === stage) || stages[0]
  const Icon = currentStage.icon

  return (
    <AnimatePresence>
      {(stage === 'parsing' || stage === 'generating') && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="text-center px-8 py-12 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl max-w-md w-full mx-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            {/* Icon */}
            <motion.div
              className="inline-flex p-5 rounded-2xl bg-violet-500/10 border border-violet-500/20 mb-6 pulse-glow"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Icon className={`w-10 h-10 ${currentStage.color}`} />
            </motion.div>

            <h2 className="text-2xl font-bold text-white mb-2">
              <GradientText>AI at work</GradientText>
            </h2>
            
            <div className="flex items-center justify-center gap-2 text-zinc-400 mb-8">
              <span>{message || currentStage.label}</span>
              <LoadingDots />
            </div>

            {/* Progress steps */}
            <div className="flex items-center justify-center gap-3">
              {stages.slice(0, 2).map((s, i) => {
                const isActive = s.key === stage
                const isDone = stages.findIndex(st => st.key === stage) > i
                return (
                  <div key={s.key} className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full transition-all duration-500 ${
                      isDone ? 'bg-emerald-400' : isActive ? 'bg-violet-400 animate-pulse' : 'bg-zinc-700'
                    }`} />
                    {i < 1 && <div className="w-12 h-px bg-zinc-700" />}
                  </div>
                )
              })}
            </div>

            <div className="mt-4 flex flex-col gap-2">
              {stages.slice(0, 2).map((s, i) => {
                const isActive = s.key === stage
                const isDone = stages.findIndex(st => st.key === stage) > i
                return (
                  <div key={s.key} className={`flex items-center gap-2 text-xs transition-all ${
                    isActive ? 'text-white' : isDone ? 'text-emerald-400' : 'text-zinc-600'
                  }`}>
                    <s.icon className="w-3 h-3" />
                    <span>{s.label}</span>
                    {isDone && <CheckCircle className="w-3 h-3 ml-auto" />}
                  </div>
                )
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
