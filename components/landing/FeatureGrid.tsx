'use client'
import { MessageSquare, Layers, FileQuestion, Network, Zap, Shield } from 'lucide-react'

const features = [
  { icon: MessageSquare, title: 'AI Q&A Tutor',       description: 'Ask anything about your lecture. Get streaming answers grounded in your content — never hallucinated facts.' },
  { icon: Layers,        title: 'Smart Flashcards',    description: 'Auto-generated with 3D flip animations and spaced-repetition tracking across three difficulty levels.' },
  { icon: FileQuestion,  title: 'Auto Quiz Builder',   description: '5 MCQs + 3 short-answer questions generated from your lecture with smart keyword scoring.' },
  { icon: Network,       title: 'Concept Mind Map',    description: 'Visual knowledge graph of your entire lecture. Zoom, pan, and explore interconnected concepts at a glance.' },
  { icon: Zap,           title: 'Blazing Fast',        description: '800+ tokens per second via Groq LPU' },
  { icon: Shield,        title: 'Private & Secure',    description: 'Sessions stay in your browser. Nothing leaves your device except API calls.' },
]

export function FeatureGrid() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground-subtle mb-3">What you get</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
            Everything you need to ace your exams
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div key={i} className="card h-full p-6 group">
              <div className="p-2.5 rounded-lg bg-surface-2 border border-border inline-flex mb-4 group-hover:border-accent/30 group-hover:bg-accent/8 transition-all duration-200">
                <feature.icon className="w-4 h-4 text-foreground-muted group-hover:text-accent transition-colors duration-200" />
              </div>
              <h3 className="font-semibold text-foreground mb-1.5 text-sm">{feature.title}</h3>
              <p className="text-sm text-foreground-muted leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
