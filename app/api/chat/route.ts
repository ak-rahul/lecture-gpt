import { NextRequest, NextResponse } from 'next/server'
import { streamCompletion } from '@/lib/ai-provider'
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

    const textStream = await streamCompletion({
      messages,
      systemPrompt,
      model: 'fast',
      maxTokens: 1024,
      temperature: 0.3,
    })

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const text of textStream) {
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
