'use client'
import { motion } from 'framer-motion'
import { Upload, Brain, BookOpen } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Upload,
    title: 'Upload Your Lecture',
    description: 'Drop a PDF or paste a YouTube URL. We support lecture notes, textbook chapters, research papers — anything.',
    color: 'text-violet-400',
    glow: 'shadow-violet-500/20',
  },
  {
    number: '02',
    icon: Brain,
    title: 'AI Analyzes & Structures',
    description: 'Groq\'s Llama 3.3 70B processes your content at 800 tok/s, extracting key concepts, facts, and relationships.',
    color: 'text-blue-400',
    glow: 'shadow-blue-500/20',
  },
  {
    number: '03',
    icon: BookOpen,
    title: 'Study Across 4 Modes',
    description: 'Chat, flashcards, quiz, and mind map — all auto-generated and ready for immediate use. Study smarter, not harder.',
    color: 'text-emerald-400',
    glow: 'shadow-emerald-500/20',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">How it works</h2>
          <p className="text-zinc-400 text-lg">Three steps. Under 60 seconds.</p>
        </motion.div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-12 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px bg-gradient-to-r from-violet-500/0 via-violet-500/50 to-violet-500/0" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <div className={`relative mb-6 p-4 rounded-2xl bg-white/[0.03] border border-white/10 shadow-lg ${step.glow}`}>
                  <span className="absolute -top-3 -left-2 text-xs font-bold text-zinc-500 font-mono">{step.number}</span>
                  <step.icon className={`w-7 h-7 ${step.color}`} />
                </div>
                <h3 className="font-semibold text-white text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
