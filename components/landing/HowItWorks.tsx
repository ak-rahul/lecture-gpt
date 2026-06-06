'use client'
import { motion } from 'framer-motion'
import { Upload, Brain, BookOpen } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Upload,
    title: 'Upload Your Lecture',
    description: 'Drop a PDF or paste a YouTube URL. Supports lecture notes, textbook chapters, research papers — anything up to 10MB.',
  },
  {
    number: '02',
    icon: Brain,
    title: 'AI Analyzes & Structures',
    description: "Groq's Llama 3.3 70B processes your content, extracting key concepts, facts, and relationships in seconds.",
  },
  {
    number: '03',
    icon: BookOpen,
    title: 'Study Across 4 Modes',
    description: 'Chat tutor, flashcards, quiz, and mind map — all auto-generated and ready immediately.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-14">
          <p className="text-xs text-zinc-500 uppercase tracking-widest font-medium mb-3">How it works</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            From upload to study session
            <br />
            <span className="text-orange-400">in under 60 seconds</span>
          </h2>
        </div>

        <div className="space-y-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              className="relative flex gap-6 pb-10 last:pb-0"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
            >
              {/* Left column */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-9 h-9 rounded-lg" style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="text-xs font-bold font-mono text-zinc-500">{step.number}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px flex-1 mt-3" style={{ background: '#1e1e1e' }} />
                )}
              </div>

              {/* Content */}
              <div className="pt-1.5 pb-2">
                <h3 className="font-semibold text-white mb-2 text-base">{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#888' }}>{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
