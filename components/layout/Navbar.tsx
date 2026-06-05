'use client'
import { motion } from 'framer-motion'
import { ExternalLink, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { GradientText } from '@/components/shared/GradientText'

export function Navbar() {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-black/40 backdrop-blur-xl"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-1.5 rounded-lg bg-violet-500/20 border border-violet-500/30 group-hover:bg-violet-500/30 transition-colors">
              <BookOpen className="w-4 h-4 text-violet-400" />
            </div>
            <span className="font-bold text-lg">
              <GradientText>LectureGPT</GradientText>
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-zinc-400 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-zinc-400 hover:text-white transition-colors">How It Works</a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs text-emerald-400 font-medium">Groq Powered</span>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
