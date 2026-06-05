import type { LectureSession } from '@/types/session.types'

const SESSION_KEY = 'lecturegpt_sessions'
const MAX_SESSIONS = 5

export function getSessions(): Record<string, LectureSession> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function getSession(id: string): LectureSession | null {
  const sessions = getSessions()
  return sessions[id] ?? null
}

export function saveSession(session: LectureSession): void {
  if (typeof window === 'undefined') return
  try {
    const sessions = getSessions()
    sessions[session.id] = session
    
    const keys = Object.keys(sessions)
    if (keys.length > MAX_SESSIONS) {
      const oldest = keys.sort((a, b) => sessions[a].createdAt - sessions[b].createdAt)[0]
      delete sessions[oldest]
    }
    
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessions))
  } catch (e) {
    console.error('Failed to save session:', e)
  }
}

export function deleteSession(id: string): void {
  if (typeof window === 'undefined') return
  const sessions = getSessions()
  delete sessions[id]
  localStorage.setItem(SESSION_KEY, JSON.stringify(sessions))
}

export function getAllSessions(): LectureSession[] {
  const sessions = getSessions()
  return Object.values(sessions).sort((a, b) => b.createdAt - a.createdAt)
}
