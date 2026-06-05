'use client'
import { useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Cpu, LayoutGrid, FileText, Link2 } from 'lucide-react'
import { FileDropzone } from '@/components/upload/FileDropzone'
import { ProcessingOverlay } from '@/components/upload/ProcessingOverlay'
import { ShinyButton } from '@/components/shared/ShinyButton'
import { AnimatedNumber } from '@/components/shared/AnimatedNumber'
import { useSessionStore } from '@/store/session.store'
import { isValidYouTubeUrl, cn } from '@/lib/utils'
import { generateId } from '@/lib/utils'
import { cleanText, countWords, chunkText, MAX_CHARS_FOR_GENERATION } from '@/lib/text-chunker'
import type { LectureSession } from '@/types/session.types'
import { saveSession } from '@/lib/session-storage'

const stats = [
  { value: 60, suffix: 's', label: 'Processing time', icon: Zap },
  { value: 800, suffix: '+', label: 'Tokens / second', icon: Cpu },
  { value: 4, suffix: '', label: 'Study modes', icon: LayoutGrid },
]

function UploadCard() {
  const router = useRouter()
  const { setCurrentSession, setProcessingStage } = useSessionStore()
  const [activeTab, setActiveTab] = useState<'pdf' | 'youtube'>('pdf')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleGenerate = useCallback(async () => {
    if (isLoading) return
    if (activeTab === 'pdf' && !selectedFile) return
    if (activeTab === 'youtube' && !youtubeUrl.trim()) return

    setIsLoading(true)

    // 60-second timeout guard
    timeoutRef.current = setTimeout(() => {
      setProcessingStage('error', 'Request timed out. Please try again.')
      setIsLoading(false)
    }, 60000)

    try {
      setProcessingStage('parsing', 'Reading your lecture...')

      let rawText = ''
      let pageCount: number | undefined
      let documentTitle = 'Untitled Document'

      if (activeTab === 'pdf' && selectedFile) {
        const formData = new FormData()
        formData.append('file', selectedFile)
        const res = await fetch('/api/parse-pdf', { method: 'POST', body: formData })
        if (!res.ok) throw new Error('PDF parsing failed')
        const data = await res.json()
        rawText = cleanText(data.text)
        pageCount = data.pageCount
        documentTitle = selectedFile.name.replace('.pdf', '')
      } else {
        throw new Error('YouTube transcripts are not fully implemented in this MVP yet. Please upload a PDF.')
        // const res = await fetch('/api/fetch-transcript', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ url: youtubeUrl }),
        // })
        // if (!res.ok) throw new Error('Transcript fetch failed')
        // const data = await res.json()
        rawText = cleanText(data.text)
        documentTitle = data.title || 'YouTube Lecture'
      }

      if (!rawText || rawText.length < 100) {
        throw new Error('Not enough text extracted')
      }

      setProcessingStage('generating', 'Building your study session...')

      const textForGeneration = chunkText(rawText, MAX_CHARS_FOR_GENERATION)

      const [flashRes, quizRes, mindRes] = await Promise.all([
        fetch('/api/generate/flashcards', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: textForGeneration }),
        }),
        fetch('/api/generate/questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: textForGeneration }),
        }),
        fetch('/api/generate/mindmap', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: textForGeneration }),
        }),
      ])

      const [flashData, quizData, mindData] = await Promise.all([
        flashRes.json(),
        quizRes.json(),
        mindRes.json(),
      ])

      const sessionId = generateId()
      const session: LectureSession = {
        id: sessionId,
        createdAt: Date.now(),
        documentTitle,
        sourceType: activeTab,
        rawText,
        textSnippet: rawText.slice(0, 300),
        flashcards: flashData.flashcards || [],
        questions: quizData.questions || [],
        mindmapData: mindData,
        chatHistory: [],
        stats: {
          pageCount,
          wordCount: countWords(rawText),
          flashcardCount: (flashData.flashcards || []).length,
          questionCount: (quizData.questions || []).length,
        },
      }

      saveSession(session)
      setCurrentSession(session)

      if (timeoutRef.current) clearTimeout(timeoutRef.current)

      setProcessingStage('done', '')
      // Show done state for 800ms before routing (BUG FIX 4)
      await new Promise(resolve => setTimeout(resolve, 800))
      router.push(`/study/${sessionId}`)
    } catch (err) {
      console.error(err)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      setProcessingStage('error', 'Something went wrong. Please try again.')
      setIsLoading(false)
    }
  }, [activeTab, selectedFile, youtubeUrl, isLoading, router, setCurrentSession, setProcessingStage])

  const canGenerate = activeTab === 'pdf' ? !!selectedFile : isValidYouTubeUrl(youtubeUrl)

  return (
    <div className={`card-bordered rounded-2xl p-6 w-full max-w-lg mx-auto ${
      selectedFile || (activeTab === 'youtube' && youtubeUrl) ? 'gradient-border' : ''
    }`}>
      {/* Pill tab switcher */}
      <div className="flex items-center p-1 rounded-xl bg-surface-2 border border-border mb-5">
        {(['pdf', 'youtube'] as const).map(tab => (
          <button
            key={tab}
            id={`upload-tab-${tab}`}
            onClick={() => setActiveTab(tab)}
            data-selected={activeTab === tab}
            className={cn("relative flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors duration-200")}
          >
            {activeTab === tab && (
              <motion.div
                layoutId="upload-tab-bg"
                className="absolute inset-0 rounded-lg bg-surface-3 border border-border-strong"
                transition={{ type: 'spring', bounce: 0.15, duration: 0.35 }}
              />
            )}
            <span className="relative z-10">{tab === 'pdf' ? <FileText className="w-3.5 h-3.5 inline mr-1.5" /> : <Link2 className="w-3.5 h-3.5 inline mr-1.5" />}{tab === 'pdf' ? 'PDF' : 'YouTube'}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'pdf' ? (
          <motion.div key="pdf" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <FileDropzone
              onFileSelect={setSelectedFile}
            />
          </motion.div>
        ) : (
          <motion.div key="yt" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <input
              type="url"
              value={youtubeUrl}
              onChange={e => setYoutubeUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              className="w-full px-4 py-3 rounded-xl bg-surface-1 border border-border text-sm text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-primary/50 transition-colors"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Generate button */}
      <div className="mt-4 space-y-2">
        <ShinyButton
          id="generate-session-button"
          onClick={handleGenerate}
          disabled={!canGenerate || isLoading}
          className="w-full py-3"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <motion.span
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              />
              Processing...
            </span>
          ) : (
            <span>Generate Study Session →</span>
          )}
        </ShinyButton>
        {selectedFile && (
          <p className="text-xs text-foreground-subtle text-center">
            {selectedFile.name}
          </p>
        )}
        <p className="text-xs text-foreground-subtle text-center">No account needed · Free to use</p>
      </div>
    </div>
  )
}

export function HeroSection() {
  const { processingStage, processingMessage } = useSessionStore()

  return (
    <section className="aurora-bg grid-overlay noise-overlay min-h-screen flex flex-col items-center justify-center pt-14 pb-16 px-4">
      <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto w-full">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="badge-glow mb-8"
        >
          <span className="text-primary">✦</span>
          Built for QuAnHack 2026
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="text-center mb-4"
        >
          <h1 className="text-hero font-display italic text-foreground mb-2">
            Turn Any Lecture Into Your
          </h1>
          <h1 className="text-hero font-bold gradient-text-mixed">
            Study Brain
          </h1>
        </motion.div>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14 }}
          className="text-foreground-muted text-base text-center mb-10 max-w-md"
        >
          Upload a PDF or YouTube lecture. Get flashcards, quizzes, a concept map, and an AI tutor — all in under 60 seconds.
        </motion.p>

        {/* Upload card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full mb-10"
        >
          <UploadCard />
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-3 flex-wrap justify-center"
        >
          {stats.map(stat => (
            <div key={stat.label} className="flex flex-col items-center gap-1 px-5 py-3 rounded-xl bg-surface-1 border border-border min-w-[80px]">
              <stat.icon className="w-3.5 h-3.5 text-foreground-muted" />
              <span className="text-xl font-bold text-foreground tabular-nums">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-[11px] text-foreground-subtle uppercase tracking-wider text-center">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <ProcessingOverlay stage={processingStage} message={processingMessage} />
    </section>
  )
}
