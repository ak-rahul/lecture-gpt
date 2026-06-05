import { create } from 'zustand'
import type { LectureSession, ProcessingStage } from '@/types/session.types'

interface SessionStore {
  currentSession: LectureSession | null
  isLoading: boolean
  processingStage: ProcessingStage
  processingMessage: string
  setCurrentSession: (session: LectureSession | null) => void
  setIsLoading: (loading: boolean) => void
  setProcessingStage: (stage: ProcessingStage, message?: string) => void
  clearSession: () => void
}

export const useSessionStore = create<SessionStore>((set) => ({
  currentSession: null,
  isLoading: false,
  processingStage: 'idle',
  processingMessage: '',
  setCurrentSession: (session) => set({ currentSession: session }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setProcessingStage: (stage, message = '') => set({ processingStage: stage, processingMessage: message }),
  clearSession: () => set({ currentSession: null, processingStage: 'idle', processingMessage: '' }),
}))
