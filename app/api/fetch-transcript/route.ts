import { NextResponse } from 'next/server'
import { YoutubeTranscript } from 'youtube-transcript'

export async function POST(req: Request) {
  try {
    const { url } = await req.json()

    if (!url) {
      return NextResponse.json({ error: 'Missing YouTube URL' }, { status: 400 })
    }

    const transcriptItems = await YoutubeTranscript.fetchTranscript(url)
    const text = transcriptItems.map(item => item.text).join(' ')
    
    // We try to extract a pseudo title if possible, or leave it generic since youtube-transcript doesn't fetch metadata natively
    const videoIdMatch = url.match(/[?&]v=([^&]+)/) || url.match(/youtu\.be\/([^?]+)/)
    const title = videoIdMatch ? `YouTube Video (${videoIdMatch[1]})` : 'YouTube Lecture'

    return NextResponse.json({ text, title })
  } catch (error: any) {
    console.error('Error fetching transcript:', error)
    return NextResponse.json(
      { error: 'Failed to fetch transcript. The video might not have closed captions enabled.' },
      { status: 500 }
    )
  }
}
