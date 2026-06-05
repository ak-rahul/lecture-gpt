'use client'
import { motion } from 'framer-motion'
import { MessageSquare, Layers, ClipboardCheck, GitBranch, Zap, Lock } from 'lucide-react'
import { GlassCard } from '@/components/shared/GlassCard'

const features = [
  {
    icon: MessageSquare,
    title: 'AI Q&A Tutor',
    description: 'Ask anything about your lecture. Get precise, contextual answers powered by Llama 3.1 at 800 tok/s.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
  },
  {
    icon: Layers,
    title: 'Smart Flashcards',
    description: 'Auto-generated cards with spaced repetition logic. 3D flip animation for immersive learning.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  {
    icon: ClipboardCheck,
    title: 'Auto Quiz Builder',
    description: 'MCQ and short-answer questions generated from your lecture. AI grades and gives feedback.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
  {
    icon: GitBranch,
    title: 'Concept Mind Map',
    description: 'Visual knowledge graph of your entire lecture. D3-powered interactive exploration.',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
  },
  {
    icon: Zap,
    title: 'Blazing Fast',
    description: 'Groq LPU delivers 300-800 tokens/second. Full study session ready in under 60 seconds.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
  },
  {
    icon: Lock,
    title: 'Private & Secure',
    description: 'No data stored on servers. All sessions saved locally in your browser. Your notes stay yours.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
  },
]

export function FeatureGrid() {
  return (
    <section id="features" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Everything you need to{' '}
            <span className="bg-gradient-to-r from-violet-400 to-purple-300 bg-clip-text text-transparent">
              ace your exams
            </span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            One upload. Four powerful study modes. Powered by the world&apos;s fastest inference engine.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <GlassCard className="h-full">
                <div className={`inline-flex p-2.5 rounded-xl ${feature.bg} border ${feature.border} mb-4`}>
                  <feature.icon className={`w-5 h-5 ${feature.color}`} />
                </div>
                <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{feature.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
