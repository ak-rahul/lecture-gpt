'use client'
import { useState } from 'react'
import { useRouter as useNextRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { ShinyButton } from '@/components/shared/ShinyButton'
import { GradientText } from '@/components/shared/GradientText'
import { GlassCard } from '@/components/shared/GlassCard'
import { UploadTabs } from '@/components/upload/UploadTabs'
import { ProcessingOverlay } from '@/components/upload/ProcessingOverlay'
import { useSessionStore } from '@/store/session.store'
import { saveSession } from '@/lib/session-storage'
import { countWords } from '@/lib/text-chunker'
import { toast } from 'sonner'
import type { LectureSession } from '@/types/session.types'
import type { MindMapGraph } from '@/types/mindmap.types'

export function HeroSection() {
  const router = useNextRouter()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isYoutubeValid, setIsYoutubeValid] = useState(false)
  const { processingStage, setProcessingStage } = useSessionStore()
  const isProcessing = processingStage === 'parsing' || processingStage === 'generating'

  const canGenerate = selectedFile !== null || isYoutubeValid
  const processingMessage = useSessionStore(s => s.processingMessage)

  async function handleGenerate() {
    if (!canGenerate || isProcessing) return

    try {
      let extractedText = ''
      let documentTitle = 'Untitled Document'
      let pageCount: number | undefined

      if (selectedFile) {
        setProcessingStage('parsing', 'Reading your PDF...')
        const formData = new FormData()
        formData.append('file', selectedFile)

        const parseRes = await fetch('/api/parse-pdf', {
          method: 'POST',
          body: formData,
        })

        if (!parseRes.ok) {
          const err = await parseRes.json()
          throw new Error(err.error || 'Failed to parse PDF')
        }

        const parsed = await parseRes.json()
        extractedText = parsed.text
        documentTitle = parsed.title || selectedFile.name.replace('.pdf', '')
        pageCount = parsed.pageCount
      } else if (isYoutubeValid) {
        toast.info('YouTube transcript extraction coming soon! Please use a PDF for now.')
        return
      }

      if (!extractedText.trim()) {
        throw new Error('No text could be extracted from the document')
      }

      setProcessingStage('generating', 'Generating flashcards, quiz & mind map...')

      const [flashcardsRes, questionsRes, mindmapRes] = await Promise.allSettled([
        fetch('/api/generate/flashcards', {
          method: 'POST',
          body: JSON.stringify({ text: extractedText, count: 15 }),
          headers: { 'Content-Type': 'application/json' },
        }),
        fetch('/api/generate/questions', {
          method: 'POST',
          body: JSON.stringify({ text: extractedText }),
          headers: { 'Content-Type': 'application/json' },
        }),
        fetch('/api/generate/mindmap', {
          method: 'POST',
          body: JSON.stringify({ text: extractedText }),
          headers: { 'Content-Type': 'application/json' },
        }),
      ])

      const flashcards = flashcardsRes.status === 'fulfilled' && flashcardsRes.value.ok
        ? (await flashcardsRes.value.json()).flashcards || []
        : []

      const questions = questionsRes.status === 'fulfilled' && questionsRes.value.ok
        ? (await questionsRes.value.json()).questions || []
        : []

      const mindmapData: MindMapGraph = mindmapRes.status === 'fulfilled' && mindmapRes.value.ok
        ? await mindmapRes.value.json()
        : { root: { id: 'n0', label: documentTitle, description: '', depth: 0 }, nodes: [], edges: [] }

      const sessionId = crypto.randomUUID()
      const session: LectureSession = {
        id: sessionId,
        createdAt: Date.now(),
        documentTitle,
        sourceType: selectedFile ? 'pdf' : 'youtube',
        rawText: extractedText,
        textSnippet: extractedText.slice(0, 200),
        flashcards,
        questions,
        mindmapData,
        chatHistory: [],
        stats: {
          pageCount,
          wordCount: countWords(extractedText),
          flashcardCount: flashcards.length,
          questionCount: questions.length,
        },
      }

      saveSession(session)
      setProcessingStage('done')
      router.push(`/study/${sessionId}`)
    } catch (error) {
      setProcessingStage('error')
      toast.error(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
      setTimeout(() => setProcessingStage('idle'), 2000)
    }
  }

  return (
    <>
      <ProcessingOverlay stage={processingStage} message={processingMessage} />
      
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-12 overflow-hidden animated-gradient-bg">
        {/* Dot grid */}
        <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
        
        {/* Center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-500/6 blur-[120px] pointer-events-none" />

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          <span className="text-sm text-violet-300 font-medium">Built for QuAnHack 2026</span>
        </motion.div>

        {/* Headline */}
        <motion.div
          className="text-center max-w-4xl mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight text-white">
            Turn Any Lecture Into Your{' '}
            <GradientText>Study Brain</GradientText>
          </h1>
        </motion.div>

        {/* Subheading */}
        <motion.p
          className="text-lg md:text-xl text-zinc-400 text-center max-w-2xl mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Upload a PDF or YouTube transcript. Get flashcards, a quiz, and an AI tutor — in under 60 seconds.
          Powered by Groq at{' '}
          <span className="text-white font-medium">800 tokens/second</span>.
        </motion.p>

        {/* Upload Card */}
        <motion.div
          className="w-full max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <GlassCard className="p-6" hover={false}>
            <UploadTabs
              onFileSelect={setSelectedFile}
              onUrlChange={(_url, valid) => {
                setIsYoutubeValid(valid)
              }}
              disabled={isProcessing}
            />

            <div className="mt-6">
              <ShinyButton
                id="generate-button"
                onClick={handleGenerate}
                disabled={!canGenerate || isProcessing}
                className="w-full py-3.5 text-base"
              >
                <span className="flex items-center justify-center gap-2">
                  {isProcessing ? 'Processing...' : 'Generate Study Session'}
                  {!isProcessing && <ArrowRight className="w-4 h-4" />}
                </span>
              </ShinyButton>
              <p className="text-center text-xs text-zinc-600 mt-3">
                No account needed · Free · Your data stays in your browser
              </p>
            </div>
          </GlassCard>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="flex items-center gap-8 mt-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {[
            { value: '60s', label: 'avg. processing time' },
            { value: '800', label: 'tokens/sec via Groq' },
            { value: '4', label: 'study modes' },
          ].map(stat => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white">{stat.value}</span>
              <span className="text-xs text-zinc-500">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </section>
    </>
  )
}
