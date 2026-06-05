'use client'
import { motion } from 'framer-motion'

const DEFAULT_PROMPTS = [
  'Summarize the key concepts in this lecture',
  'What are the most important points I should remember?',
  'Explain this topic as if I am a beginner',
  'What are common exam questions on this topic?',
]

interface SuggestedPromptsProps {
  onSelect: (prompt: string) => void
  documentTitle?: string
}

export function SuggestedPrompts({ onSelect, documentTitle }: SuggestedPromptsProps) {
  return (
    <motion.div
      className="space-y-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <p className="text-xs text-zinc-500 text-center">Suggested questions about {documentTitle || 'your lecture'}</p>
      <div className="flex flex-wrap gap-2 justify-center">
        {DEFAULT_PROMPTS.map(prompt => (
          <button
            key={prompt}
            id={`suggested-prompt-${prompt.slice(0, 20).replace(/\s+/g, '-').toLowerCase()}`}
            onClick={() => onSelect(prompt)}
            className="px-3 py-1.5 rounded-full text-xs border border-white/10 text-zinc-400 hover:text-white hover:border-violet-500/50 hover:bg-violet-500/10 transition-all duration-200"
          >
            {prompt}
          </button>
        ))}
      </div>
    </motion.div>
  )
}
