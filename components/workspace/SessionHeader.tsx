import { FileText, Hash, BookOpen, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { AnimatedNumber } from '@/components/shared/AnimatedNumber'
import { truncate } from '@/lib/utils'
import type { LectureSession } from '@/types/session.types'

interface SessionHeaderProps {
  session: LectureSession
}

export function SessionHeader({ session }: SessionHeaderProps) {
  return (
    <div className="sticky top-0 z-40 border-b border-white/8 bg-black/50 backdrop-blur-xl">
      <div className="px-4 sm:px-6 py-3">
        <div className="flex items-center gap-4">
          {/* Back button */}
          <Link
            href="/"
            id="back-to-home"
            className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 transition-all flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          {/* Title */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-violet-400 flex-shrink-0" />
              <h1
                className="text-sm font-semibold text-white truncate"
                title={session.documentTitle}
              >
                {truncate(session.documentTitle, 50)}
              </h1>
            </div>
          </div>

          {/* Stats chips */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
              <BookOpen className="w-3 h-3 text-violet-400" />
              <span className="text-xs text-violet-300 font-medium">
                <AnimatedNumber value={session.stats.flashcardCount} suffix=" cards" />
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
              <Hash className="w-3 h-3 text-blue-400" />
              <span className="text-xs text-blue-300 font-medium">
                <AnimatedNumber value={session.stats.questionCount} suffix=" questions" />
              </span>
            </div>
            {session.stats.pageCount && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-800 border border-zinc-700">
                <FileText className="w-3 h-3 text-zinc-400" />
                <span className="text-xs text-zinc-400">{session.stats.pageCount}p</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
