import { useState, useCallback } from 'react'
import { useChatStore } from '@/store/chat.store'
import type { Message } from '@/types/chat.types'

export function useGroqStream() {
  const [isStreaming, setIsStreaming] = useState(false)
  const { addMessage, appendToLastMessage, setIsStreaming: setStoreStreaming } = useChatStore()

  const streamResponse = useCallback(async (
    messages: Message[],
    lectureText: string,
    documentTitle: string
  ) => {
    setIsStreaming(true)
    setStoreStreaming(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({
          messages: messages.map(m => ({ role: m.role, content: m.content })),
          lectureText,
          documentTitle,
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      if (!res.ok) throw new Error('Chat request failed')

      // Add empty assistant message to fill
      addMessage({
        id: crypto.randomUUID(),
        role: 'assistant',
        content: '',
        timestamp: Date.now(),
      })

      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n\n')
        buffer = lines.pop() || ''
        for (const line of lines) {
          if (line.startsWith('data: ') && line !== 'data: [DONE]') {
            try {
              const { text } = JSON.parse(line.slice(6))
              if (text) appendToLastMessage(text)
            } catch {}
          }
        }
      }
    } catch (err) {
      console.error('Stream error:', err)
      throw err
    } finally {
      setIsStreaming(false)
      setStoreStreaming(false)
    }
  }, [addMessage, appendToLastMessage, setStoreStreaming])

  return { streamResponse, isStreaming }
}
