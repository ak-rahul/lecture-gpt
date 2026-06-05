export type ProcessingStage = 'idle' | 'parsing' | 'generating' | 'done' | 'error'
export type SourceType = 'pdf' | 'youtube'

export interface LectureSession {
  id: string
  createdAt: number
  documentTitle: string
  sourceType: SourceType
  rawText: string
  textSnippet: string
  flashcards: import('./flashcard.types').Flashcard[]
  questions: import('./quiz.types').Question[]
  mindmapData: import('./mindmap.types').MindMapGraph
  chatHistory: import('./chat.types').Message[]
  stats: {
    pageCount?: number
    wordCount: number
    flashcardCount: number
    questionCount: number
  }
}

export interface ProcessingStatus {
  stage: ProcessingStage
  message: string
  progress: number
}
