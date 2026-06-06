import { NextRequest, NextResponse } from 'next/server'
import { generateCompletion } from '@/lib/ai-provider'
import { mindmapPrompt } from '@/lib/prompts'
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
    const prompt = mindmapPrompt(safeText)

    const content = await generateCompletion({
      prompt,
      model: 'smart',
      maxTokens: 2048,
      temperature: 0.3,
      jsonMode: true,
    })

    const parsed = JSON.parse(content)
    return NextResponse.json(parsed)
  } catch (error) {
    console.error('Mind map generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate mind map. Please try again.' },
      { status: 500 }
    )
  }
}
