import { NextRequest, NextResponse } from 'next/server'
import { cleanText, extractTitle, countWords } from '@/lib/text-chunker'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'File must be a PDF' }, { status: 400 })
    }

    const MAX_SIZE = 10 * 1024 * 1024 // 10MB
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'File too large. Maximum size is 10MB.' }, { status: 413 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const { PDFParse } = await import('pdf-parse')
    const parser = new PDFParse({ data: buffer })
    
    const info = await parser.getInfo()
    const result = await parser.getText()
    await parser.destroy()

    const rawText = cleanText(result.text)
    const title = extractTitle(rawText) || file.name.replace('.pdf', '')
    const wordCount = countWords(rawText)

    return NextResponse.json({
      text: rawText,
      pageCount: info.total,
      wordCount,
      title,
    })
  } catch (error) {
    console.error('PDF parse error:', error)
    return NextResponse.json(
      { error: 'Failed to parse PDF. The file may be corrupted or password-protected.' },
      { status: 422 }
    )
  }
}
