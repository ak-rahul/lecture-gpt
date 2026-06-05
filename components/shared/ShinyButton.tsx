'use client'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ShinyButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit'
  id?: string
}

export function ShinyButton({ children, onClick, className, disabled, type = 'button', id }: ShinyButtonProps) {
  return (
    <motion.button
      id={id}
      type={type}
      disabled={disabled}
      className={cn(
        'relative overflow-hidden rounded-xl px-8 py-3 text-sm btn-primary',
        className
      )}
      whileHover={disabled ? {} : { y: -1 }}
      whileTap={disabled ? {} : { y: 0, scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      onClick={onClick}
    >
      {/* Slow shimmer sweep */}
      <motion.span
        className="absolute inset-0 pointer-events-none"
        initial={{ x: '-100%' }}
        whileHover={{ x: '200%' }}
        transition={{ duration: 1.0, ease: [0.4, 0, 0.2, 1] }}
      >
        <span className="block h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
      </motion.span>
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </motion.button>
  )
}
