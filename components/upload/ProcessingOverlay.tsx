'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { FileText, Layers, FileQuestion, Network, CheckCircle } from 'lucide-react'
import type { ProcessingStage } from '@/types/session.types'

interface ProcessingOverlayProps {
  stage: ProcessingStage
  message: string
}

const orbConfig = [
  { icon: Layers, color: 'bg-primary/15 border-primary/30 text-primary', delay: 0, angle: 0 },
  { icon: FileQuestion, color: 'bg-amber/15 border-amber/30 text-amber', delay: 1, angle: 120 },
  { icon: Network, color: 'bg-teal-500/15 border-teal-500/30 text-teal-400', delay: 2, angle: 240 },
]

export function ProcessingOverlay({ stage, message }: ProcessingOverlayProps) {
  const visible = stage === 'parsing' || stage === 'generating' || stage === 'done'

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
            className="gradient-border rounded-2xl p-8 max-w-sm w-full mx-4 flex flex-col items-center gap-6 bg-surface-1"
          >
            {/* Stage 1: Parsing */}
            {stage === 'parsing' && (
              <>
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="p-4 rounded-2xl bg-surface-2 border border-border"
                >
                  <FileText className="w-8 h-8 text-foreground-muted" />
                </motion.div>
                <div className="text-center">
                  <p className="font-semibold text-foreground mb-1">{message || 'Reading your lecture...'}</p>
                  <p className="text-sm text-foreground-subtle">Extracting text from your document</p>
                </div>
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-foreground-subtle typing-dot" />
                  <span className="w-1.5 h-1.5 rounded-full bg-foreground-subtle typing-dot" />
                  <span className="w-1.5 h-1.5 rounded-full bg-foreground-subtle typing-dot" />
                </div>
              </>
            )}

            {/* Stage 2: Generating */}
            {stage === 'generating' && (
              <>
                {/* Orbiting icons */}
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <div className="absolute w-8 h-8 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center z-10">
                    <Network className="w-4 h-4 text-primary" />
                  </div>
                  {orbConfig.map((orb, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: orb.delay * 0.3,
                      }}
                      style={{ transformOrigin: 'center' }}
                    >
                      <motion.div
                        className={`p-2 rounded-xl border ${orb.color}`}
                        style={{ transform: `rotate(${orb.angle}deg) translateX(42px) rotate(-${orb.angle}deg)` }}
                        animate={{ rotate: [0, -360] }}
                        transition={{
                          duration: 3 + i * 0.5,
                          repeat: Infinity,
                          ease: 'linear',
                          delay: orb.delay * 0.3,
                        }}
                      >
                        <orb.icon className="w-4 h-4" />
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
                <div className="text-center">
                  <p className="font-semibold text-foreground mb-1">{message || 'Building your study session...'}</p>
                  <p className="text-sm text-foreground-subtle">Generating flashcards, quiz & mind map in parallel</p>
                </div>
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary typing-dot" />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary typing-dot" />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary typing-dot" />
                </div>
              </>
            )}

            {/* Stage 3: Done */}
            {stage === 'done' && (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 12, stiffness: 400 }}
                  className="relative"
                >
                  <svg width="64" height="64" viewBox="0 0 64 64">
                    <motion.circle
                      cx="32" cy="32" r="28"
                      fill="none"
                      stroke="hsl(142 71% 45%)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeDasharray="176"
                      initial={{ strokeDashoffset: 176 }}
                      animate={{ strokeDashoffset: 0 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                  </svg>
                  <CheckCircle className="absolute inset-0 m-auto w-8 h-8 text-emerald-400" />
                </motion.div>
                <div className="text-center">
                  <p className="font-semibold text-emerald-400 mb-1">Ready!</p>
                  <p className="text-sm text-foreground-subtle">Opening your study session...</p>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
