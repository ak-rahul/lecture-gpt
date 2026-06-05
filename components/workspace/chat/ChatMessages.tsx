'use client'
import { useEffect, useRef } from 'react'
import { ChatMessage } from './ChatMessage'
import { LoadingDots } from '@/components/shared/LoadingDots'
import type { Message } from '@/types/chat.types'

interface ChatMessagesProps {
  messages: Message[]
  isStreaming: boolean
}

export function ChatMessages({ messages, isStreaming }: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isStreaming])

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map(message => (
        <ChatMessage key={message.id} message={message} />
      ))}
      {isStreaming && messages[messages.length - 1]?.content === '' && (
        <div className="flex gap-3">
          <div className="w-7 h-7 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center">
            <span className="text-xs">🤖</span>
          </div>
          <div className="px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/8 rounded-tl-sm">
            <LoadingDots />
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  )
}
