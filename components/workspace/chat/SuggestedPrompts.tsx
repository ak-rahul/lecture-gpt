'use client'
import { HelpCircle, BookOpen, Lightbulb, ListChecks } from 'lucide-react'

const prompts = [
  {
    icon: HelpCircle,
    label: 'Key concepts',
    full: 'What are the most important concepts covered in this lecture?',
  },
  {
    icon: BookOpen,
    label: 'Summarize',
    full: 'Give me a concise summary of this lecture in 5 bullet points.',
  },
  {
    icon: Lightbulb,
    label: 'Real-world use',
    full: 'How are the concepts in this lecture applied in the real world?',
  },
  {
    icon: ListChecks,
    label: 'Study tips',
    full: 'What should I focus on most when studying this material for an exam?',
  },
]

interface SuggestedPromptsProps {
  onSelect: (prompt: string) => void
  documentTitle: string
}

export function SuggestedPrompts({ onSelect, documentTitle }: SuggestedPromptsProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8 px-4 flex-1">
      {/* Document title */}
      <div className="mb-6 text-center">
        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-3">
          <span className="text-base font-black text-primary leading-none tracking-widest">LG</span>
        </div>
        <p className="text-sm font-medium text-foreground">{documentTitle}</p>
        <p className="text-xs text-foreground-subtle mt-1">Ask me anything about this lecture</p>
      </div>

      {/* 2x2 prompt grid */}
      <div className="grid grid-cols-2 gap-2 w-full max-w-sm">
        {prompts.map(prompt => (
          <button
            key={prompt.label}
            onClick={() => onSelect(prompt.full)}
            className="flex flex-col items-start gap-2 p-3 rounded-xl bg-surface-1 border border-border hover:border-border-strong hover:bg-surface-2 transition-all duration-200 text-left group"
          >
            <prompt.icon className="w-4 h-4 text-foreground-subtle group-hover:text-primary transition-colors" />
            <span className="text-xs font-medium text-foreground-muted group-hover:text-foreground transition-colors">
              {prompt.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
