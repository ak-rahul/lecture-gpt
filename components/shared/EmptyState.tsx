import { FileQuestion } from 'lucide-react'

interface EmptyStateProps {
  icon?: React.ElementType
  title: string
  description: string
  action?: React.ReactNode
}

export function EmptyState({ icon: Icon = FileQuestion, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center h-full min-h-[300px]">
      <div className="w-16 h-16 rounded-2xl bg-surface-2 border border-border flex items-center justify-center mb-6">
        <Icon className="w-8 h-8 text-foreground-muted" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-foreground-subtle max-w-sm mb-6">{description}</p>
      {action}
    </div>
  )
}
