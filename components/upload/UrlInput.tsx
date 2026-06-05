'use client'
import { useState } from 'react'
import { Play, CheckCircle, AlertCircle } from 'lucide-react'
import { isValidYouTubeUrl } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface UrlInputProps {
  onUrlChange: (url: string, isValid: boolean) => void
  disabled?: boolean
}

export function UrlInput({ onUrlChange, disabled }: UrlInputProps) {
  const [url, setUrl] = useState('')
  const [touched, setTouched] = useState(false)

  const isValid = isValidYouTubeUrl(url)
  const showError = touched && url.length > 0 && !isValid

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setUrl(val)
    onUrlChange(val, isValidYouTubeUrl(val))
  }

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <Play className="w-4 h-4 text-red-400" />
        </div>
        <input
          id="youtube-url-input"
          type="url"
          value={url}
          onChange={handleChange}
          onBlur={() => setTouched(true)}
          placeholder="https://www.youtube.com/watch?v=..."
          disabled={disabled}
          className={cn(
            'w-full pl-10 pr-10 py-3 rounded-xl text-sm',
            'bg-white/[0.03] border transition-all duration-200',
            'text-white placeholder:text-zinc-600',
            'focus:outline-none focus:ring-2 focus:ring-violet-500/50',
            isValid && url ? 'border-emerald-500/50' : showError ? 'border-red-500/50' : 'border-white/10 hover:border-white/20',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        />
        {url && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {isValid ? (
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400" />
            )}
          </div>
        )}
      </div>
      {showError && (
        <p className="text-xs text-red-400">Please enter a valid YouTube URL</p>
      )}
      <p className="text-xs text-zinc-500">
        Supports youtube.com/watch and youtu.be short links
      </p>
    </div>
  )
}
