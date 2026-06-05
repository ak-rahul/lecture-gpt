import { motion } from 'framer-motion'
import { User, Bot } from 'lucide-react'
import { MarkdownRenderer } from '@/components/shared/MarkdownRenderer'
import type { Message } from '@/types/chat.types'

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <motion.div
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Avatar */}
      <div className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center mt-0.5 ${
        isUser ? 'bg-violet-500/20 border border-violet-500/30' : 'bg-zinc-800 border border-zinc-700'
      }`}>
        {isUser ? (
          <User className="w-3.5 h-3.5 text-violet-400" />
        ) : (
          <Bot className="w-3.5 h-3.5 text-zinc-400" />
        )}
      </div>

      {/* Bubble */}
      <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
        isUser
          ? 'bg-violet-600/20 border border-violet-500/30 rounded-tr-sm'
          : 'bg-white/[0.04] border border-white/8 rounded-tl-sm'
      }`}>
        {isUser ? (
          <p className="text-sm text-white leading-relaxed">{message.content}</p>
        ) : (
          <MarkdownRenderer content={message.content} />
        )}
      </div>
    </motion.div>
  )
}
