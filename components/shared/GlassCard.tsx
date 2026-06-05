import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  id?: string
}

export function GlassCard({ children, className, hover = true, id }: GlassCardProps) {
  return (
    <div
      id={id}
      className={cn(
        'rounded-2xl border border-white/8',
        'bg-white/[0.03] backdrop-blur-sm',
        'p-6 transition-all duration-300',
        hover && 'hover:border-violet-500/30 hover:bg-white/[0.05]',
        className
      )}
    >
      {children}
    </div>
  )
}
