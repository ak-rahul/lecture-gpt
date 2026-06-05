# LectureGPT 🧠

> Transform any lecture PDF into a full interactive study session in under 60 seconds.

**Built for QuAnHack 2026 | AI Workflow Challenge**

[![Built with Groq](https://img.shields.io/badge/Powered%20by-Groq-orange)](https://groq.com)
[![Next.js 14](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org)

## Features

- 🤖 **AI Q&A Tutor** — Ask anything about your lecture, get streaming answers
- 🃏 **Smart Flashcards** — Auto-generated with 3D flip animation & spaced repetition
- 📝 **Auto Quiz Builder** — MCQ + short-answer questions with AI grading
- 🗺️ **Concept Mind Map** — Visual knowledge graph of your entire lecture
- ⚡ **300–800 tok/s** via Groq LPU (Llama 3.3 70B + Llama 3.1 8B)

## Quick Start

1. **Clone & Install**
   ```bash
   git clone <your-repo>
   cd lecture-gpt
   npm install
   ```

2. **Get your Groq API Key** (free, no credit card)
   - Go to [console.groq.com](https://console.groq.com)
   - Sign up → API Keys → Create Key

3. **Configure Environment**
   ```bash
   cp .env.example .env.local
   # Add your GROQ_API_KEY to .env.local
   ```

4. **Run**
   ```bash
   npm run dev
   # Open http://localhost:3000
   ```

## How It Works

1. **Upload** a PDF lecture (up to 10MB) or paste a YouTube URL
2. **AI analyzes** your content in parallel — flashcards, quiz, and mind map generated simultaneously
3. **Study** across 4 interactive modes: Chat, Flashcards, Quiz, Mind Map

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + custom CSS |
| Animations | Framer Motion |
| AI Provider | Groq Cloud API (Free Tier) |
| Primary LLM | `llama-3.3-70b-versatile` (131K context) |
| Chat LLM | `llama-3.1-8b-instant` (streaming) |
| PDF Parsing | `pdf-parse` (server-side) |
| State | Zustand |
| Storage | localStorage (no DB needed) |

## Architecture

```
User uploads PDF
      ↓
/api/parse-pdf → extract text
      ↓
3 parallel Groq API calls:
  • /api/generate/flashcards
  • /api/generate/questions
  • /api/generate/mindmap
      ↓
Session saved to localStorage
      ↓
/study/:sessionId workspace
  • Chat tab (streaming, FAST model)
  • Flashcards tab (3D flip)
  • Quiz tab (MCQ + short answer)
  • Mind Map tab (D3 SVG graph)
```

## Groq Rate Limits (Free Tier)

| Model | TPM | RPM | RPD |
|-------|-----|-----|-----|
| llama-3.3-70b-versatile | 6,000 | 30 | 14,400 |
| llama-3.1-8b-instant | 20,000 | 30 | 14,400 |

## Deploy to Vercel

```bash
vercel --prod
# Add GROQ_API_KEY in Vercel dashboard → Environment Variables
```

## License

MIT — Built with ❤️ for QuAnHack 2026
