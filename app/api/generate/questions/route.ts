import { NextRequest, NextResponse } from 'next/server'
import { generateCompletion } from '@/lib/ai-provider'
import { quizPrompt } from '@/lib/prompts'
import { chunkText } from '@/lib/text-chunker'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json()

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 })
    }

    const safeText = chunkText(text)
    const prompt = quizPrompt(safeText)

    const content = await generateCompletion({
      prompt,
      model: 'smart',
      maxTokens: 4096,
      temperature: 0.5,
      jsonMode: true,
    })

    const parsed = JSON.parse(content)
    return NextResponse.json(parsed)
  } catch (error) {
    console.error('Question generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate questions. Please try again.' },
      { status: 500 }
    )
  }
}
