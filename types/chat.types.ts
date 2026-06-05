export type MessageRole = 'user' | 'assistant' | 'system'

export interface Message {
  id: string
  role: MessageRole
  content: string
  timestamp: number
}

export interface StreamChunk {
  text: string
}

export interface ChatContext {
  lectureText: string
  documentTitle: string
}
