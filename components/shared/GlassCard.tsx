import { cn } from '@/lib/utils'

type GlassCardVariant = 'default' | 'glass' | 'elevated' | 'spotlight'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  variant?: GlassCardVariant
  onMouseMove?: (e: React.MouseEvent<HTMLDivElement>) => void
}

export function GlassCard({
  children,
  className,
  variant = 'default',
  onMouseMove,
}: GlassCardProps) {
  const variants: Record<GlassCardVariant, string> = {
    default:   'bg-surface-1 border border-border hover:border-border-strong hover:shadow-card-hover',
    glass:     'glass-card',
    elevated:  'bg-surface-2 border border-border shadow-card hover:shadow-card-hover',
    spotlight: 'card-spotlight',
  }

  return (
    <div
      className={cn(
        'rounded-xl transition-all duration-200 p-6',
        variants[variant],
        className
      )}
      onMouseMove={onMouseMove}
    >
      {children}
    </div>
  )
}
