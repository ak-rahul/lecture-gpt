'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Play } from 'lucide-react'
import { FileDropzone } from './FileDropzone'
import { UrlInput } from './UrlInput'
import { cn } from '@/lib/utils'

const types = [
  { id: 'pdf', label: 'PDF Upload', icon: FileText },
  { id: 'youtube', label: 'YouTube URL', icon: Play },
]

interface UploadTabsProps {
  onFileSelect: (file: File) => void
  onUrlChange: (url: string, isValid: boolean) => void
  disabled?: boolean
}

export function UploadTabs({ onFileSelect, onUrlChange, disabled }: UploadTabsProps) {
  const [activeTab, setActiveTab] = useState<'pdf' | 'youtube'>('pdf')

  return (
    <div className="space-y-4">
      {/* Tab switcher */}
      <div className="flex p-1 rounded-xl bg-white/[0.03] border border-white/10">
        {types.map(tab => (
          <button
            key={tab.id}
            id={`upload-tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id as 'pdf' | 'youtube')}
            disabled={disabled}
            className={cn(
              'relative flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200',
              activeTab === tab.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
            )}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="upload-tab-active"
                className="absolute inset-0 rounded-lg bg-white/[0.07] border border-white/10"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              />
            )}
            <tab.icon className="w-3.5 h-3.5 relative z-10" />
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === 'pdf' ? (
          <FileDropzone onFileSelect={onFileSelect} disabled={disabled} />
        ) : (
          <div className="p-6 border border-dashed border-white/20 rounded-2xl">
            <UrlInput onUrlChange={onUrlChange} disabled={disabled} />
          </div>
        )}
      </motion.div>
    </div>
  )
}
