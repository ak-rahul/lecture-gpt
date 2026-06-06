'use client'
import { useCallback } from 'react'
import { ChatMessages } from './ChatMessages'
import { ChatInput } from './ChatInput'
import { SuggestedPrompts } from './SuggestedPrompts'
import { useChatStore } from '@/store/chat.store'
import { useGroqStream } from '@/hooks/useGroqStream'
import { saveSession } from '@/lib/session-storage'
import { useSessionStore } from '@/store/session.store'
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
      const truncatedText = session.rawText.slice(0, 15000)
      await streamResponse(
        [...messages, userMessage],
        truncatedText,
        session.documentTitle
      )
      // Persist chat history
      const currentSession = useSessionStore.getState().currentSession
      if (currentSession) {
        const updatedSession = {
          ...currentSession,
          chatHistory: useChatStore.getState().messages,
        }
        saveSession(updatedSession)
      }
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
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
               style={{ background: '#f97316' }}>
            LG
          </div>
          <p className="text-sm font-medium text-white mt-3 max-w-xs text-center truncate">
            {session.documentTitle.slice(0, 50)}{session.documentTitle.length > 50 ? '...' : ''}
          </p>
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
