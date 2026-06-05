export const MAX_CHARS_FOR_GENERATION = 40_000
export const MAX_CHARS_FOR_CHAT = 30_000

export function chunkText(text: string, maxChars: number = MAX_CHARS_FOR_GENERATION): string {
  if (text.length <= maxChars) return text
  
  // Try to cut at paragraph boundary
  const truncated = text.slice(0, maxChars)
  const lastParagraph = truncated.lastIndexOf('\n\n')
  
  if (lastParagraph > maxChars * 0.8) {
    return truncated.slice(0, lastParagraph)
  }
  
  // Fall back to sentence boundary
  const lastSentence = truncated.lastIndexOf('. ')
  if (lastSentence > maxChars * 0.8) {
    return truncated.slice(0, lastSentence + 1)
  }
  
  return truncated
}

export function cleanText(text: string): string {
  return text
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]+/g, ' ')
    .trim()
}

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

export function extractTitle(text: string): string {
  const lines = text.split('\n').filter(l => l.trim().length > 0)
  if (lines.length === 0) return 'Untitled Document'
  
  const firstLine = lines[0].trim()
  if (firstLine.length > 100) {
    return firstLine.slice(0, 97) + '...'
  }
  return firstLine
}
