import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Toaster } from 'sonner'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-sans',
  weight: '100 900',
})

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'LectureGPT — AI Study Brain',
  description: 'Transform lecture PDFs and YouTube transcripts into interactive study sessions with AI-powered flashcards, quizzes, and mind maps. Powered by Groq + Llama 3.3.',
  keywords: ['AI study', 'lecture notes', 'flashcards', 'quiz generator', 'mind map', 'Groq', 'LLM'],
  openGraph: {
    title: 'LectureGPT — AI Study Brain',
    description: 'Turn any lecture into your study brain in under 60 seconds.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}>
        {children}
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'hsl(240 10% 5%)',
              border: '1px solid hsl(240 3.7% 15.9%)',
              color: 'white',
            },
          }}
        />
      </body>
    </html>
  )
}
