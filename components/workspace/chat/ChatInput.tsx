'use client'
import { useState, useRef, KeyboardEvent } from 'react'
import { Send } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ChatInputProps {
  onSend: (message: string) => void
  isStreaming: boolean
  disabled?: boolean
}

export function ChatInput({ onSend, isStreaming, disabled }: ChatInputProps) {
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSend = () => {
    const trimmed = value.trim()
    if (!trimmed || isStreaming) return
    onSend(trimmed)
    setValue('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px'
    }
  }

  return (
    <div className="p-4 border-t border-white/8">
      <div className="flex gap-3 items-end">
        <textarea
          ref={textareaRef}
          id="chat-input"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          placeholder="Ask anything about your lecture... (Enter to send)"
          disabled={disabled || isStreaming}
          rows={1}
          className={cn(
            'flex-1 resize-none rounded-xl bg-surface-1 border border-border',
            'px-4 py-3 text-sm text-foreground placeholder:text-foreground-subtle',
            'focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent/50',
            'disabled:opacity-40 transition-all duration-200',
            'min-h-[44px] max-h-[200px]'
          )}
        />
        <motion.button
          id="chat-send-button"
          onClick={handleSend}
          disabled={!value.trim() || isStreaming || disabled}
          className={cn(
            'p-3 rounded-xl flex-shrink-0 transition-all duration-200',
            value.trim() && !isStreaming
              ? 'bg-accent hover:bg-accent-hover text-white'
              : 'bg-surface-1 border border-border text-foreground-subtle cursor-not-allowed'
          )}
          whileHover={value.trim() && !isStreaming ? { scale: 1.05 } : {}}
          whileTap={value.trim() && !isStreaming ? { scale: 0.95 } : {}}
        >
          <Send className="w-4 h-4" />
        </motion.button>
      </div>
      <p className="text-xs text-zinc-700 mt-2 text-center">Shift+Enter for new line</p>
    </div>
  )
}
