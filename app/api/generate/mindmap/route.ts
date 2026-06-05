import { NextRequest, NextResponse } from 'next/server'
import { groq, MODELS, groqWithRetry } from '@/lib/groq'
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

    const completion = await groqWithRetry(() =>
      groq.chat.completions.create({
        model: MODELS.SMART,
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
        temperature: 0.3,
        max_tokens: 2048,
      })
    )

    const content = completion.choices[0]?.message?.content
    if (!content) throw new Error('No content returned')

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
