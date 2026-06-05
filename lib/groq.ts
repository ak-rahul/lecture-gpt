import Groq from 'groq-sdk'

export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export const MODELS = {
  FAST: 'llama-3.1-8b-instant',
  SMART: 'llama-3.3-70b-versatile',
} as const

export const MODEL_LIMITS = {
  [MODELS.FAST]: { contextWindow: 128_000, tpm: 20_000, rpm: 30 },
  [MODELS.SMART]: { contextWindow: 131_072, tpm: 6_000, rpm: 30 },
} as const

export async function groqWithRetry<T>(fn: () => Promise<T>, retries = 3): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn()
    } catch (err: unknown) {
      const error = err as { status?: number; message?: string }
      if (error?.status === 429 && i < retries - 1) {
        await new Promise(r => setTimeout(r, Math.pow(2, i) * 500))
        continue
      }
      throw err
    }
  }
  throw new Error('Max retries exceeded')
}
