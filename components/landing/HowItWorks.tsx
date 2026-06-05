'use client'
import { motion } from 'framer-motion'
import { Upload, Brain, LayoutGrid } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Upload,
    title: 'Upload Your Lecture',
    description: 'Drop a PDF or paste a YouTube URL. Our parser extracts the full text — up to 40,000 words — in seconds.',
    color: 'text-primary',
    borderColor: 'border-primary/40',
  },
  {
    number: '02',
    icon: Brain,
    title: 'AI Analyzes & Structures',
    description: "Groq's Llama 3.3 70B runs three tasks simultaneously: generating flashcards, building a quiz, and mapping concepts into a knowledge graph.",
    color: 'text-amber',
    borderColor: 'border-amber/40',
  },
  {
    number: '03',
    icon: LayoutGrid,
    title: 'Study Across 4 Modes',
    description: 'Switch between AI Chat Tutor, spaced-repetition Flashcards, an adaptive Quiz, and a visual Concept Mind Map — all from one session.',
    color: 'text-emerald-400',
    borderColor: 'border-emerald-400/40',
  },
]

export function HowItWorks() {
  return (
    <section className="py-24 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground-subtle mb-3">How it works</p>
          <h2 className="text-section-title font-bold text-foreground">
            From upload to study session
            <br />
            <span className="gradient-text-primary">in under 60 seconds</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connector line */}
          <div className="absolute left-[0.55rem] top-2 bottom-2 w-px bg-gradient-to-b from-primary/30 via-border to-transparent hidden sm:block" />

          <div className="space-y-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="group relative flex gap-6 pb-12 last:pb-0"
              >
                {/* Step dot */}
                <div className="relative z-10 flex-shrink-0 pt-1.5">
                  <div className={`w-[1.1rem] h-[1.1rem] rounded-full border-2 bg-background transition-colors duration-300 ${
                    i === 0 ? 'border-primary' : 'border-border group-hover:border-border-strong'
                  }`} />
                </div>

                {/* Content */}
                <div className={`flex-1 pb-4 pl-2 border-l-2 transition-all duration-300 ${
                  i === 0 ? step.borderColor : `border-transparent group-hover:${step.borderColor}`
                }`}>
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-5xl font-black text-border select-none leading-none mt-0.5">{step.number}</span>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <step.icon className={`w-4 h-4 ${step.color}`} />
                        <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
                      </div>
                      <p className="text-sm text-foreground-muted leading-relaxed max-w-lg">{step.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
