import { useEffect, useCallback } from 'react'
import { useSessionStore } from '@/store/session.store'
import { useFlashcardStore } from '@/store/flashcard.store'
import { useQuizStore } from '@/store/quiz.store'
import { useChatStore } from '@/store/chat.store'
import { getSession, saveSession } from '@/lib/session-storage'
import type { LectureSession } from '@/types/session.types'

export function useSession(sessionId: string | null) {
  const { currentSession, setCurrentSession } = useSessionStore()
  const { setCards } = useFlashcardStore()
  const { setQuestions } = useQuizStore()
  const { clearMessages, addMessage } = useChatStore()

  const loadSession = useCallback((id: string) => {
    const session = getSession(id)
    if (session) {
      setCurrentSession(session)
      setCards(session.flashcards || [])
      setQuestions(session.questions || [])
      clearMessages()
      // BUG FIX 5: Restore chat history on session load
      if (session.chatHistory && session.chatHistory.length > 0) {
        session.chatHistory.forEach(msg => addMessage(msg))
      }
      return session
    }
    return null
  }, [setCurrentSession, setCards, setQuestions, clearMessages, addMessage])

  useEffect(() => {
    if (sessionId) loadSession(sessionId)
  }, [sessionId, loadSession])

  const updateSession = useCallback((updates: Partial<LectureSession>) => {
    if (!currentSession) return
    const updated = { ...currentSession, ...updates }
    setCurrentSession(updated)
    saveSession(updated)
  }, [currentSession, setCurrentSession])

  return { session: currentSession, loadSession, updateSession }
}
