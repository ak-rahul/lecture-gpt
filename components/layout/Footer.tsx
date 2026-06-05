import { BookOpen, Zap } from 'lucide-react'
import { GradientText } from '@/components/shared/GradientText'

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-black/20 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-violet-400" />
            <span className="text-sm font-semibold">
              <GradientText>LectureGPT</GradientText>
            </span>
          </div>
          <p className="text-sm text-zinc-500">
            Built with ❤ for{' '}
            <span className="text-violet-400 font-medium">QuAnHack 2026</span>
            {' '}·{' '}Powered by{' '}
            <span className="text-white font-medium">Groq</span>
            {' '}+{' '}
            <span className="text-white font-medium">Llama 3.3</span>
          </p>
          <div className="flex items-center gap-1 text-xs text-zinc-500">
            <Zap className="w-3 h-3 text-yellow-400" />
            <span>300–800 tok/s inference</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
