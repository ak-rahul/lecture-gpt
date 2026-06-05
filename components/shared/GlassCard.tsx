import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  id?: string
  variant?: 'default' | 'inset'
}

export function GlassCard({ children, className, hover = true, id, variant = 'default' }: GlassCardProps) {
  return (
    <div
      id={id}
      className={cn(
        variant === 'inset' ? 'card-inset' : 'card',
        'p-6',
        hover && 'transition-all duration-200',
        className
      )}
    >
      {children}
    </div>
  )
}
