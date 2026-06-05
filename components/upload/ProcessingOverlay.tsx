'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { FileText, Network, CheckCircle } from 'lucide-react'
import type { ProcessingStage } from '@/types/session.types'
import { cn } from '@/lib/utils'

interface ProcessingOverlayProps {
  stage: ProcessingStage
  message: string
}

export function ProcessingOverlay({ stage, message }: ProcessingOverlayProps) {
  const visible = stage === 'parsing' || stage === 'generating' || stage === 'done'

  const Icon = stage === 'parsing' ? FileText : stage === 'generating' ? Network : CheckCircle
  const isActive = stage === 'parsing' || stage === 'generating'
  const isDone = stage === 'done'

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="text-center px-8 py-10 rounded-2xl card max-w-xs w-full mx-4 shadow-float flex flex-col items-center"
          >
            {/* Icon section */}
            {isDone ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 12, stiffness: 400 }}
                className="relative inline-flex items-center justify-center mb-6 w-16 h-16"
              >
                <svg width="64" height="64" viewBox="0 0 64 64">
                  <motion.circle
                    cx="32" cy="32" r="30"
                    fill="none"
                    stroke="hsl(142 71% 45%)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeDasharray="188"
                    initial={{ strokeDashoffset: 188 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                </svg>
                <CheckCircle className="absolute inset-0 m-auto w-6 h-6 text-emerald-400" />
              </motion.div>
            ) : (
              <div className="relative inline-flex items-center justify-center mb-6 w-16 h-16">
                <div className="absolute inset-0 rounded-full border border-border" />
                <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="30" fill="none" stroke="hsl(var(--accent))" strokeWidth="1.5"
                          strokeDasharray="40 150" strokeLinecap="round" />
                </svg>
                <Icon className="w-6 h-6 text-foreground-muted relative z-10" />
              </div>
            )}

            {/* Title */}
            <h2 className="text-lg font-semibold text-foreground mb-1">
              {stage === 'done' ? 'Ready!' : 'Working on it'}
            </h2>

            {/* Status text */}
            <div className={cn("flex items-center justify-center gap-2 text-foreground-muted text-sm mb-6", isDone && "text-emerald-400")}>
              {message || (stage === 'parsing' ? 'Reading your lecture...' : stage === 'generating' ? 'Building your study session...' : 'Opening your session...')}
            </div>

            {/* Progress dots */}
            <div className="flex gap-1">
              <span className={cn("w-1.5 h-1.5 rounded-full", isDone ? 'bg-emerald-400' : isActive ? 'bg-accent animate-pulse' : 'bg-border')} />
              <span className={cn("w-1.5 h-1.5 rounded-full", isDone ? 'bg-emerald-400' : stage === 'generating' ? 'bg-accent animate-pulse' : 'bg-border')} style={{ animationDelay: '150ms' }} />
              <span className={cn("w-1.5 h-1.5 rounded-full", isDone ? 'bg-emerald-400' : 'bg-border')} style={{ animationDelay: '300ms' }} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
