import { MarkdownRenderer } from '@/components/shared/MarkdownRenderer'
import type { Message } from '@/types/chat.types'

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[75%] px-4 py-2.5 rounded-2xl rounded-br-sm bg-surface-2 border border-border text-sm text-foreground">
          {message.content}
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-3">
      {/* LG monogram mark */}
      <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center mt-0.5">
        <span className="text-[9px] font-black text-primary tracking-widest">LG</span>
      </div>
      <div className="flex-1 border-l-2 border-primary/25 pl-4 min-w-0">
        <MarkdownRenderer content={message.content} />
      </div>
    </div>
  )
}
