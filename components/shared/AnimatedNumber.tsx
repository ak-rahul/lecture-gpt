'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface AnimatedNumberProps {
  value: number
  suffix?: string
  className?: string
  duration?: number
}

export function AnimatedNumber({ value, suffix = '', className, duration = 800 }: AnimatedNumberProps) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (value === 0) return
    const steps = 30
    const increment = value / steps
    let current = 0
    let step = 0
    const timer = setInterval(() => {
      step++
      current = Math.min(current + increment, value)
      setDisplay(Math.round(current))
      if (step >= steps) clearInterval(timer)
    }, duration / steps)
    return () => clearInterval(timer)
  }, [value, duration])

  return (
    <motion.span
      className={className}
      initial={{ filter: 'blur(8px)', opacity: 0 }}
      animate={{ filter: 'blur(0px)', opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {display}{suffix}
    </motion.span>
  )
}
