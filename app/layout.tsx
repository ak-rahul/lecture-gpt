import './globals.css'
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Instrument_Serif } from 'next/font/google'

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
})

const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-display',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'LectureGPT',
  description: 'Turn Any Lecture Into Your Study Brain',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} font-sans bg-background text-foreground antialiased`}>
        {children}
      </body>
    </html>
  )
}
