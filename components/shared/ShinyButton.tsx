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
        'relative overflow-hidden rounded-xl px-8 py-3 font-semibold text-white text-sm',
        'bg-violet-600 transition-colors duration-200',
        'before:absolute before:inset-0 before:-translate-x-full',
        'hover:before:translate-x-full before:duration-700 before:ease-out',
        'before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:before:translate-x-[-100%]',
        'hover:bg-violet-500',
        className
      )}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}
