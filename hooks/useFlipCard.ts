import { useState, useCallback } from 'react'

export function useFlipCard() {
  const [isFlipped, setIsFlipped] = useState(false)

  const flip = useCallback(() => setIsFlipped(prev => !prev), [])
  const reset = useCallback(() => setIsFlipped(false), [])

  return { isFlipped, flip, reset }
}
