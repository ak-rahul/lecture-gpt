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
        'relative overflow-hidden rounded-xl px-8 py-3 font-semibold text-primary-foreground text-sm',
        'bg-primary transition-all duration-300',
        'before:absolute before:inset-0 before:-translate-x-full',
        'hover:before:translate-x-full before:duration-1000 before:ease-fluid',
        'before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent',
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:before:translate-x-[-100%] disabled:hover:shadow-none disabled:hover:-translate-y-0',
        'hover:shadow-glow-sm',
        className
      )}
      whileHover={disabled ? {} : { y: -1 }}
      whileTap={disabled ? {} : { y: 1, scale: 0.98 }}
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}
