import { NextRequest, NextResponse } from 'next/server'
import { groq, MODELS, groqWithRetry } from '@/lib/groq'
import { flashcardPrompt } from '@/lib/prompts'
import { chunkText } from '@/lib/text-chunker'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(req: NextRequest) {
  try {
    const { text, count = 15 } = await req.json()

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 })
    }

    const safeText = chunkText(text)
    const prompt = flashcardPrompt(safeText, count)

    const completion = await groqWithRetry(() =>
      groq.chat.completions.create({
        model: MODELS.SMART,
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
        temperature: 0.5,
        max_tokens: 4096,
      })
    )

    const content = completion.choices[0]?.message?.content
    if (!content) throw new Error('No content returned')

    const parsed = JSON.parse(content)
    return NextResponse.json(parsed)
  } catch (error) {
    console.error('Flashcard generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate flashcards. Please try again.' },
      { status: 500 }
    )
  }
}
