'use client'
import { motion } from 'framer-motion'
import { MessageSquare, Layers, FileQuestion, Network, Zap, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

function SpotlightCard({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    e.currentTarget.style.setProperty('--mouse-x', `${x}%`)
    e.currentTarget.style.setProperty('--mouse-y', `${y}%`)
  }

  return (
    <motion.div
      className={cn('card-spotlight p-6 transition-all duration-300 hover:shadow-card-hover', className)}
      onMouseMove={handleMouseMove}
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

function ChatDecoration() {
  return (
    <div className="flex flex-col gap-1.5 mt-4 opacity-50 pointer-events-none select-none">
      <div className="flex gap-1.5 items-end">
        <div className="w-5 h-5 rounded-full bg-primary/20 border border-primary/30 flex-shrink-0" />
        <div className="h-6 w-28 rounded-xl rounded-bl-sm bg-surface-3 border border-border" />
      </div>
      <div className="flex gap-1.5 items-center justify-end">
        <div className="h-5 w-20 rounded-xl rounded-br-sm bg-primary/10 border border-primary/20" />
      </div>
      <div className="flex gap-1.5 items-center">
        <div className="flex gap-1 px-3 py-2 rounded-xl bg-surface-3 border border-border">
          <span className="w-1.5 h-1.5 rounded-full bg-foreground-subtle typing-dot" />
          <span className="w-1.5 h-1.5 rounded-full bg-foreground-subtle typing-dot" />
          <span className="w-1.5 h-1.5 rounded-full bg-foreground-subtle typing-dot" />
        </div>
      </div>
    </div>
  )
}

function FlashcardDecoration() {
  return (
    <div className="mt-4 relative h-14 opacity-60 pointer-events-none">
      <div className="absolute inset-0 rounded-xl bg-surface-3 border border-border rotate-2" />
      <div className="absolute inset-0 rounded-xl bg-surface-2 border border-primary/20 flex items-center justify-center">
        <span className="text-xs text-foreground-subtle font-mono">Q: What is...?</span>
      </div>
    </div>
  )
}

function MindMapDecoration() {
  return (
    <div className="mt-4 opacity-40 pointer-events-none">
      <svg width="100%" height="52" viewBox="0 0 220 52">
        <circle cx="110" cy="26" r="11" fill="none" stroke="hsl(245 85% 62%)" strokeWidth="1.5" />
        <line x1="121" y1="26" x2="156" y2="13" stroke="hsl(0 0% 22%)" strokeWidth="1" />
        <circle cx="163" cy="11" r="7" fill="none" stroke="hsl(0 0% 22%)" strokeWidth="1" />
        <line x1="121" y1="26" x2="156" y2="39" stroke="hsl(0 0% 22%)" strokeWidth="1" />
        <circle cx="163" cy="41" r="7" fill="none" stroke="hsl(0 0% 22%)" strokeWidth="1" />
        <line x1="99" y1="26" x2="64" y2="13" stroke="hsl(0 0% 22%)" strokeWidth="1" />
        <circle cx="57" cy="11" r="7" fill="none" stroke="hsl(0 0% 22%)" strokeWidth="1" />
        <line x1="99" y1="26" x2="64" y2="39" stroke="hsl(0 0% 22%)" strokeWidth="1" />
        <circle cx="57" cy="41" r="7" fill="none" stroke="hsl(0 0% 22%)" strokeWidth="1" />
      </svg>
    </div>
  )
}

export function FeatureGrid() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground-subtle mb-3">What you get</p>
          <h2 className="text-section-title font-bold text-foreground">
            Everything you need to{' '}
            <span className="gradient-text-primary">master any lecture</span>
          </h2>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          {/* AI Q&A — col-span-2 row-span-2 */}
          <SpotlightCard className="lg:col-span-2 lg:row-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <MessageSquare className="w-4 h-4 text-primary" />
              </div>
            </div>
            <h3 className="font-semibold text-foreground mb-1.5">AI Q&A Tutor</h3>
            <p className="text-sm text-foreground-muted leading-relaxed">
              Ask anything about your lecture. Get streaming answers grounded in your content — never hallucinated facts.
            </p>
            <ChatDecoration />
          </SpotlightCard>

          {/* Flashcards — col-span-2 row-span-2 */}
          <SpotlightCard className="lg:col-span-2 lg:row-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-lg bg-amber/10">
                <Layers className="w-4 h-4 text-amber" />
              </div>
            </div>
            <h3 className="font-semibold text-foreground mb-1.5">Smart Flashcards</h3>
            <p className="text-sm text-foreground-muted leading-relaxed">
              Auto-generated with 3D flip animations and spaced-repetition tracking across three difficulty levels.
            </p>
            <FlashcardDecoration />
          </SpotlightCard>

          {/* Speed stat */}
          <SpotlightCard className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-amber" />
              <span className="text-xs font-semibold text-foreground-subtle uppercase tracking-wider">Speed</span>
            </div>
            <p className="text-3xl font-black text-foreground tabular-nums">800+</p>
            <p className="text-sm text-foreground-subtle mt-0.5">tokens per second via Groq LPU</p>
          </SpotlightCard>

          {/* Private */}
          <SpotlightCard className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-semibold text-foreground-subtle uppercase tracking-wider">Privacy</span>
            </div>
            <p className="text-base font-semibold text-foreground">No account needed</p>
            <p className="text-sm text-foreground-subtle mt-1">Sessions stay in your browser. Nothing leaves your device except API calls.</p>
          </SpotlightCard>

          {/* Quiz — col-span-2 */}
          <SpotlightCard className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-lg bg-emerald-400/10">
                <FileQuestion className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
            <h3 className="font-semibold text-foreground mb-1.5">Auto Quiz Builder</h3>
            <p className="text-sm text-foreground-muted leading-relaxed">
              5 MCQs + 3 short-answer questions generated from your lecture with smart keyword scoring.
            </p>
          </SpotlightCard>

          {/* Mind Map — col-span-4 */}
          <SpotlightCard className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-lg bg-violet-500/10">
                <Network className="w-4 h-4 text-violet-400" />
              </div>
            </div>
            <h3 className="font-semibold text-foreground mb-1.5">Concept Mind Map</h3>
            <p className="text-sm text-foreground-muted leading-relaxed">
              Visual knowledge graph of your entire lecture. Zoom, pan, and explore interconnected concepts at a glance.
            </p>
            <MindMapDecoration />
          </SpotlightCard>
        </div>
      </div>
    </section>
  )
}
