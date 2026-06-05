import { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: React.ReactNode
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="p-3 rounded-xl bg-surface-2 border border-border mb-4">
        <Icon className="w-6 h-6 text-foreground-subtle" />
      </div>
      <h3 className="text-sm font-semibold text-foreground mb-1.5">{title}</h3>
      <p className="text-xs text-foreground-muted max-w-xs leading-relaxed mb-5">{description}</p>
      {action}
    </div>
  )
}
