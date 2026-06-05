import { cn } from '@/lib/utils'

type GradientVariant = 'primary' | 'mixed' | 'amber' | 'mono'

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  variant?: GradientVariant
}

export function GradientText({ children, className, variant = 'primary' }: GradientTextProps) {
  const variants: Record<GradientVariant, string> = {
    primary: 'gradient-text-primary',
    mixed: 'gradient-text-mixed',
    amber: 'gradient-text-amber',
    mono: 'text-foreground',
  }

  return (
    <span className={cn(variants[variant], className)}>
      {children}
    </span>
  )
}
