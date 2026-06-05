import { NextRequest, NextResponse } from 'next/server'
import { groq, MODELS } from '@/lib/groq'
import { chatSystemPrompt } from '@/lib/prompts'
import { chunkText, MAX_CHARS_FOR_CHAT } from '@/lib/text-chunker'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(req: NextRequest) {
  try {
    const { messages, lectureText, documentTitle } = await req.json()

    if (!messages || !lectureText) {
      return NextResponse.json({ error: 'Messages and lectureText are required' }, { status: 400 })
    }

    const safeText = chunkText(lectureText, MAX_CHARS_FOR_CHAT)
    const systemPrompt = chatSystemPrompt(safeText, documentTitle || 'Lecture Document')

    const stream = await groq.chat.completions.create({
      model: MODELS.FAST,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
      ],
      stream: true,
      max_tokens: 1024,
      temperature: 0.3,
    })

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content || ''
            if (text) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`))
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
        } catch (err) {
          controller.error(err)
        }
      },
    })

    return new NextResponse(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json(
      { error: 'Chat failed. Please try again.' },
      { status: 500 }
    )
  }
}
