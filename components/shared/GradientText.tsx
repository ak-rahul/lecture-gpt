import { cn } from '@/lib/utils'

type GradientVariant = 'accent' | 'white'

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  variant?: GradientVariant
}

export function GradientText({ children, className, variant = 'accent' }: GradientTextProps) {
  return (
    <span className={cn(
      variant === 'accent' ? 'text-gradient' : 'text-gradient-white',
      className
    )}>
      {children}
    </span>
  )
}
