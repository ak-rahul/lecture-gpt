export function LoadingDots({ className }: { className?: string }) {
  return (
    <span className={`inline-flex gap-1 items-center ${className || ''}`}>
      <span className="typing-dot w-1.5 h-1.5 rounded-full bg-violet-400"></span>
      <span className="typing-dot w-1.5 h-1.5 rounded-full bg-violet-400"></span>
      <span className="typing-dot w-1.5 h-1.5 rounded-full bg-violet-400"></span>
    </span>
  )
}
