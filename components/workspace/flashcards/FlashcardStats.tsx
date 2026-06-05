import { CheckCircle, XCircle, Layers } from 'lucide-react'

interface FlashcardStatsProps {
  total: number
  known: number
  unknown: number
}

export function FlashcardStats({ total, known, unknown }: FlashcardStatsProps) {
  const remaining = total - known - unknown
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="flex flex-col items-center p-3 rounded-xl bg-surface-1 border border-border">
        <CheckCircle className="w-4 h-4 text-foreground-subtle mb-1" />
        <span className="text-lg font-bold text-emerald-400">{known}</span>
        <span className="text-[10px] text-foreground-subtle uppercase tracking-wider">Known</span>
      </div>
      <div className="flex flex-col items-center p-3 rounded-xl bg-surface-1 border border-border">
        <Layers className="w-4 h-4 text-foreground-subtle mb-1" />
        <span className="text-lg font-bold text-foreground">{remaining}</span>
        <span className="text-[10px] text-foreground-subtle uppercase tracking-wider">Remaining</span>
      </div>
      <div className="flex flex-col items-center p-3 rounded-xl bg-surface-1 border border-border">
        <XCircle className="w-4 h-4 text-foreground-subtle mb-1" />
        <span className="text-lg font-bold text-red-400">{unknown}</span>
        <span className="text-[10px] text-foreground-subtle uppercase tracking-wider">Review</span>
      </div>
    </div>
  )
}
