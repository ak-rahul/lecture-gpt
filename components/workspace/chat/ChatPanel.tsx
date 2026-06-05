'use client'
import { useCallback } from 'react'
import { MessageSquare } from 'lucide-react'
import { ChatMessages } from './ChatMessages'
import { ChatInput } from './ChatInput'
import { SuggestedPrompts } from './SuggestedPrompts'
import { EmptyState } from '@/components/shared/EmptyState'
import { useChatStore } from '@/store/chat.store'
import { useGroqStream } from '@/hooks/useGroqStream'
import { saveSession } from '@/lib/session-storage'
import type { LectureSession } from '@/types/session.types'

interface ChatPanelProps {
  session: LectureSession
}

export function ChatPanel({ session }: ChatPanelProps) {
  const { messages, addMessage, isStreaming } = useChatStore()
  const { streamResponse } = useGroqStream()

  const handleSend = useCallback(async (content: string) => {
    const userMessage = {
      id: crypto.randomUUID(),
      role: 'user' as const,
      content,
      timestamp: Date.now(),
    }
    addMessage(userMessage)

    try {
      await streamResponse(
        [...messages, userMessage],
        session.rawText,
        session.documentTitle
      )
      // Persist chat history
      const updatedSession = {
        ...session,
        chatHistory: useChatStore.getState().messages,
      }
      saveSession(updatedSession)
    } catch {
      addMessage({
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: Date.now(),
      })
    }
  }, [messages, session, addMessage, streamResponse])

  return (
    <div className="flex flex-col h-full">
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <EmptyState
            icon={MessageSquare}
            title="Start a conversation"
            description={`Ask me anything about "${session.documentTitle}". I'll answer based on the lecture content.`}
          />
          <SuggestedPrompts
            onSelect={handleSend}
            documentTitle={session.documentTitle}
          />
        </div>
      ) : (
        <ChatMessages messages={messages} isStreaming={isStreaming} />
      )}
      <ChatInput
        onSend={handleSend}
        isStreaming={isStreaming}
        disabled={false}
      />
    </div>
  )
}
