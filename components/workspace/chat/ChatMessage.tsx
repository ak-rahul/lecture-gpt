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
        <div className="max-w-[75%] px-4 py-3 rounded-2xl rounded-tr-sm bg-surface-2 border border-border">
          <p className="text-sm text-foreground leading-relaxed">{message.content}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-3">
      {/* LG monogram mark */}
      <div className="flex-shrink-0 w-6 h-6 rounded-md bg-surface-2 border border-border flex items-center justify-center mt-0.5">
        <span className="text-[9px] font-bold text-foreground-subtle">AI</span>
      </div>
      <div className="flex-1 min-w-0">
        <MarkdownRenderer content={message.content} />
      </div>
    </div>
  )
}
