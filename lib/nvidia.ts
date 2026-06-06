import OpenAI from 'openai'

export const nvidia = new OpenAI({
  baseURL: 'https://integrate.api.nvidia.com/v1',
  apiKey: process.env.NVIDIA_NIM_API_KEY || '',
})

export const NVIDIA_MODELS = {
  FAST: 'meta/llama-3.1-8b-instruct',
  SMART: 'meta/llama-3.3-70b-instruct',
} as const

export async function nvidiaWithRetry<T>(fn: () => Promise<T>, retries = 3): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn()
    } catch (err: unknown) {
      const error = err as { status?: number }
      if (error?.status === 429 && i < retries - 1) {
        await new Promise(r => setTimeout(r, (i + 1) * 2000))
        continue
      }
      throw err
    }
  }
  throw new Error('Max retries exceeded')
}
