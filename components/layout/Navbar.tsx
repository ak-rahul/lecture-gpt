'use client'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 h-14 flex items-center border-b border-border-muted bg-background/80 backdrop-blur-2xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full flex items-center justify-between">

        {/* Wordmark — no icon, no gradient */}
        <Link href="/" className="flex items-center gap-1.5 group">
          <span className="font-bold text-base tracking-tight text-white">
            Lecture<span className="text-accent">GPT</span>
          </span>
        </Link>

        {/* Right */}
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/ak-rahul/lecture-gpt"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View source on GitHub"
            className="p-2 rounded-lg text-foreground-muted hover:text-foreground hover:bg-surface-1 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <div className="h-4 w-px bg-border mx-1" />
          <div className="badge badge-neutral">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ animation: 'pulse-dot 2s ease-in-out infinite' }} />
            NVIDIA NIM
          </div>
        </div>
      </div>
    </nav>
  )
}
