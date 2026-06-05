import { create } from 'zustand'
import type { Message } from '@/types/chat.types'

interface ChatStore {
  messages: Message[]
  isStreaming: boolean
  addMessage: (message: Message) => void
  appendToLastMessage: (text: string) => void
  clearMessages: () => void
  setIsStreaming: (streaming: boolean) => void
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  isStreaming: false,
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  appendToLastMessage: (text) =>
    set((state) => {
      const messages = [...state.messages]
      if (messages.length === 0) return state
      const last = { ...messages[messages.length - 1] }
      last.content += text
      messages[messages.length - 1] = last
      return { messages }
    }),
  clearMessages: () => set({ messages: [] }),
  setIsStreaming: (streaming) => set({ isStreaming: streaming }),
}))
