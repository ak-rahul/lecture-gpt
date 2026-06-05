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
      <div className="flex flex-col items-center p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
        <CheckCircle className="w-4 h-4 text-emerald-400 mb-1" />
        <span className="text-lg font-bold text-emerald-400">{known}</span>
        <span className="text-xs text-zinc-500">Known</span>
      </div>
      <div className="flex flex-col items-center p-3 rounded-xl bg-white/[0.03] border border-white/10">
        <Layers className="w-4 h-4 text-zinc-400 mb-1" />
        <span className="text-lg font-bold text-white">{remaining}</span>
        <span className="text-xs text-zinc-500">Remaining</span>
      </div>
      <div className="flex flex-col items-center p-3 rounded-xl bg-red-500/10 border border-red-500/20">
        <XCircle className="w-4 h-4 text-red-400 mb-1" />
        <span className="text-lg font-bold text-red-400">{unknown}</span>
        <span className="text-xs text-zinc-500">Review</span>
      </div>
    </div>
  )
}
