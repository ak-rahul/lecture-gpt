'use client'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, FileText, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FileDropzoneProps {
  onFileSelect: (file: File) => void
  disabled?: boolean
}

export function FileDropzone({ onFileSelect, disabled }: FileDropzoneProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: import('react-dropzone').FileRejection[]) => {
    if (fileRejections.length > 0) {
      alert('File too large. Max 10MB.')
      return
    }
    const file = acceptedFiles[0]
    if (file) {
      setSelectedFile(file)
      onFileSelect(file)
    }
  }, [onFileSelect])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB limit
    disabled,
  })

  const clearFile = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedFile(null)
  }

  return (
    <div
      {...getRootProps()}
      className={cn(
        'relative border border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300',
        isDragActive
          ? 'border-accent bg-accent/5 border-solid'
          : 'border-border hover:border-border-strong hover:bg-surface-1',
        disabled && 'opacity-50 cursor-not-allowed',
        selectedFile && 'border-emerald-500/40 bg-surface-1 border-solid'
      )}
    >
      <input {...getInputProps()} id="pdf-file-input" />
      
      <AnimatePresence mode="wait">
        {selectedFile ? (
          <motion.div
            key="file"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <FileText className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
              <p className="font-medium text-white text-sm">{selectedFile.name}</p>
              <p className="text-xs text-zinc-400 mt-1">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            <button
              onClick={clearFile}
              className="text-xs text-zinc-500 hover:text-white flex items-center gap-1 transition-colors"
            >
              <X className="w-3 h-3" /> Remove
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center gap-3"
          >
            <motion.div
              className="p-4 rounded-xl bg-violet-500/10 border border-violet-500/20"
              animate={isDragActive ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Upload className="w-7 h-7 text-foreground-muted" />
            </motion.div>
            <div>
              <p className="font-medium text-foreground text-sm">
                {isDragActive ? 'Release to upload' : 'Drag & drop your PDF'}
              </p>
              <p className="text-xs text-foreground-subtle mt-1">or click to browse &middot; max 10MB</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
