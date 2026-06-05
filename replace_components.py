import os
import re

def update_file(filepath, replacements):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for old, new in replacements:
        if isinstance(old, str):
            content = content.replace(old, new)
        else: # regex
            content = old.sub(new, content)
            
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

# 1. AnimatedNumber.tsx (BUG-07)
update_file(r'd:\lecture-gpt\components\shared\AnimatedNumber.tsx', [
    (
        "const hasAnimated = useRef(false)\n\n  useEffect(() => {\n    if (value === 0 || hasAnimated.current) {\n      if (hasAnimated.current) setDisplay(value)\n      return\n    }\n    \n    hasAnimated.current = true",
        "const hasRun = useRef(false)\n\n  useEffect(() => {\n    if (value === 0 || hasRun.current) return\n    hasRun.current = true"
    ),
])

# 2. FileDropzone.tsx (B-10)
update_file(r'd:\lecture-gpt\components\upload\FileDropzone.tsx', [
    (
        "'relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300',\n        isDragActive\n          ? 'border-violet-500 bg-violet-500/10 scale-[1.02]'\n          : 'border-white/20 hover:border-violet-500/50 hover:bg-white/[0.02]',\n        disabled && 'opacity-50 cursor-not-allowed',\n        selectedFile && 'border-emerald-500/50 bg-emerald-500/5'",
        "'relative border border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300',\n        isDragActive\n          ? 'border-accent bg-accent/5 border-solid'\n          : 'border-border hover:border-border-strong hover:bg-surface-1',\n        disabled && 'opacity-50 cursor-not-allowed',\n        selectedFile && 'border-emerald-500/40 bg-surface-1 border-solid'"
    ),
    (
        '<div className="p-4 rounded-xl bg-violet-500/10 border border-violet-500/20"',
        '<div className="p-4 rounded-xl bg-surface-1 border border-border"'
    ),
    (
        '<Upload className="w-8 h-8 text-violet-400" />',
        '<Upload className="w-7 h-7 text-foreground-muted" />'
    ),
    (
        '<p className="font-medium text-white">\n                {isDragActive ? \'Drop it here!\' : \'Drag & drop your PDF\'}\n              </p>\n              <p className="text-sm text-zinc-500 mt-1">or click to browse &middot; max 10MB</p>',
        '<p className="font-medium text-foreground text-sm">\n                {isDragActive ? \'Release to upload\' : \'Drag & drop your PDF\'}\n              </p>\n              <p className="text-xs text-foreground-subtle mt-1">or click to browse &middot; max 10MB</p>'
    ),
])

# 3. SessionHeader.tsx (B-14)
update_file(r'd:\lecture-gpt\components\workspace\SessionHeader.tsx', [
    (
        '<button\n          onClick={() => router.push(\'/\')}\n          aria-label="Back to home"\n          className="p-2 rounded-lg hover:bg-surface-1 text-foreground-muted hover:text-foreground transition-all flex-shrink-0"\n        >\n          <ArrowLeft className="w-4 h-4" />\n        </button>',
        '<button\n          onClick={() => router.push(\'/\')}\n          aria-label="Back to home"\n          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-foreground-muted hover:text-foreground hover:bg-surface-1 transition-all text-xs font-medium"\n        >\n          <ArrowLeft className="w-3.5 h-3.5" />\n          <span className="hidden md:inline">Home</span>\n        </button>'
    ),
    (
        '<div className="p-1.5 rounded-md bg-surface-2 flex-shrink-0">\n            <FileText className="w-3.5 h-3.5 text-foreground-muted" />\n          </div>',
        '<FileText className="w-3.5 h-3.5 text-foreground-muted" />'
    ),
    (
        '<div className="flex items-center gap-2 flex-shrink-0">\n            <svg width="24" height="24" viewBox="0 0 24 24" className="-rotate-90">',
        '<div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-1 border border-border">\n            <BookOpen className="w-3 h-3 text-foreground-subtle" />\n            <span className="text-xs text-foreground-muted font-medium">\n              <AnimatedNumber value={knownCount} suffix=" cards" />\n            </span>\n          </div>\n          {/* Removed SVG'
    ),
    (
        '</svg>\n            <span className="text-xs text-foreground-muted tabular-nums">{knownCount}/{totalCards}</span>\n          </div>',
        '*/}'
    )
])

# 4. TabNavigation.tsx (B-15)
update_file(r'd:\lecture-gpt\components\workspace\TabNavigation.tsx', [
    (
        "className={cn(\n              'relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 z-10',\n              activeTab === tab.id ? 'text-foreground' : 'text-foreground-muted hover:text-foreground'\n            )}",
        "className={cn(\n              'relative flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-colors duration-150 z-10',\n              activeTab === tab.id ? 'text-foreground' : 'text-foreground-muted hover:text-foreground'\n            )}"
    ),
    (
        'layoutId="tab-bg"\n                className="absolute inset-0 rounded-lg bg-surface-3 border border-border-strong shadow-card"',
        'layoutId="tab-pill"\n                className="absolute inset-0 rounded-lg bg-surface-3 border border-border-strong"'
    )
])

# 5. ChatMessage.tsx (B-16)
update_file(r'd:\lecture-gpt\components\workspace\chat\ChatMessage.tsx', [
    (
        '        <div className="max-w-[75%] px-4 py-2.5 rounded-2xl rounded-br-sm bg-surface-2 border border-border text-sm text-foreground">\n          {message.content}\n        </div>',
        '        <div className="max-w-[75%] px-4 py-3 rounded-2xl rounded-tr-sm bg-surface-2 border border-border">\n          <p className="text-sm text-foreground leading-relaxed">{message.content}</p>\n        </div>'
    ),
    (
        '<div className="flex-shrink-0 w-7 h-7 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center mt-0.5">\n        <span className="text-[9px] font-black text-primary tracking-widest">LG</span>\n      </div>',
        '<div className="flex-shrink-0 w-6 h-6 rounded-md bg-surface-2 border border-border flex items-center justify-center mt-0.5">\n        <span className="text-[9px] font-bold text-foreground-subtle">AI</span>\n      </div>'
    ),
    (
        '<div className="flex-1 border-l-2 border-primary/25 pl-4 min-w-0">',
        '<div className="flex-1 min-w-0">'
    )
])

# 6. ChatInput.tsx (B-17)
update_file(r'd:\lecture-gpt\components\workspace\chat\ChatInput.tsx', [
    (
        "'flex-1 resize-none rounded-xl bg-white/[0.04] border border-white/10',\n            'px-4 py-3 text-sm text-white placeholder:text-zinc-600',\n            'focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/30',\n            'disabled:opacity-50 transition-all duration-200',\n            'min-h-[44px] max-h-[200px]'",
        "'flex-1 resize-none rounded-xl bg-surface-1 border border-border',\n            'px-4 py-3 text-sm text-foreground placeholder:text-foreground-subtle',\n            'focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent/50',\n            'disabled:opacity-40 transition-all duration-200',\n            'min-h-[44px] max-h-[200px]'"
    ),
    (
        "value.trim() && !isStreaming\n              ? 'bg-violet-600 hover:bg-violet-500 text-white'\n              : 'bg-white/[0.04] border border-white/10 text-zinc-600 cursor-not-allowed'",
        "value.trim() && !isStreaming\n              ? 'bg-accent hover:bg-accent-hover text-white'\n              : 'bg-surface-1 border border-border text-foreground-subtle cursor-not-allowed'"
    )
])

# 7. SuggestedPrompts.tsx (B-18)
update_file(r'd:\lecture-gpt\components\workspace\chat\SuggestedPrompts.tsx', [
    (
        'hover:border-border-strong hover:bg-surface-2 transition-all duration-200',
        'hover:border-border-strong hover:bg-surface-2 transition-all duration-150'
    )
])

# 8. FlashcardItem.tsx (B-19)
update_file(r'd:\lecture-gpt\components\workspace\flashcards\FlashcardItem.tsx', [
    (
        '<div className={`flashcard-inner w-full min-h-[240px] relative ${isFlipped ? \'flipped\' : \'\'}`}>',
        '<div className={`flashcard-inner w-full relative ${isFlipped ? \'flipped\' : \'\'}`} style={{ minHeight: \'240px\' }}>'
    ),
    (
        '<div className="w-10 h-0.5 bg-gradient-to-r from-primary to-transparent rounded-full mb-5" />',
        '<div className="w-8 h-0.5 bg-accent/40 rounded-full mb-5" />'
    ),
    (
        '<div className="flashcard-face flashcard-back absolute inset-0 rounded-2xl bg-surface-2 border border-primary/20 p-6 flex flex-col">',
        '<div className="flashcard-face flashcard-back absolute inset-0 rounded-2xl bg-surface-2 border border-border-strong p-6 text-center flex flex-col">'
    ),
    (
        '<div className="flashcard-face absolute inset-0 rounded-2xl bg-surface-1 border border-border p-6 flex flex-col">',
        '<div className="flashcard-face absolute inset-0 rounded-2xl bg-surface-1 border border-border p-6 text-center flex flex-col">'
    )
])

# 9. FlashcardStats.tsx (B-20)
update_file(r'd:\lecture-gpt\components\workspace\flashcards\FlashcardStats.tsx', [
    (
        '<div className="flex flex-col items-center p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">\n        <CheckCircle className="w-4 h-4 text-emerald-400 mb-1" />\n        <span className="text-lg font-bold text-emerald-400">{known}</span>\n        <span className="text-xs text-zinc-500">Known</span>\n      </div>\n      <div className="flex flex-col items-center p-3 rounded-xl bg-white/[0.03] border border-white/10">\n        <Layers className="w-4 h-4 text-zinc-400 mb-1" />\n        <span className="text-lg font-bold text-white">{remaining}</span>\n        <span className="text-xs text-zinc-500">Remaining</span>\n      </div>\n      <div className="flex flex-col items-center p-3 rounded-xl bg-red-500/10 border border-red-500/20">\n        <XCircle className="w-4 h-4 text-red-400 mb-1" />\n        <span className="text-lg font-bold text-red-400">{unknown}</span>\n        <span className="text-xs text-zinc-500">Review</span>\n      </div>',
        '<div className="flex flex-col items-center p-3 rounded-xl bg-surface-1 border border-border">\n        <CheckCircle className="w-4 h-4 text-foreground-subtle mb-1" />\n        <span className="text-lg font-bold text-emerald-400">{known}</span>\n        <span className="text-[10px] text-foreground-subtle uppercase tracking-wider">Known</span>\n      </div>\n      <div className="flex flex-col items-center p-3 rounded-xl bg-surface-1 border border-border">\n        <Layers className="w-4 h-4 text-foreground-subtle mb-1" />\n        <span className="text-lg font-bold text-foreground">{remaining}</span>\n        <span className="text-[10px] text-foreground-subtle uppercase tracking-wider">Remaining</span>\n      </div>\n      <div className="flex flex-col items-center p-3 rounded-xl bg-surface-1 border border-border">\n        <XCircle className="w-4 h-4 text-foreground-subtle mb-1" />\n        <span className="text-lg font-bold text-red-400">{unknown}</span>\n        <span className="text-[10px] text-foreground-subtle uppercase tracking-wider">Review</span>\n      </div>'
    )
])

# 10. FlashcardPanel.tsx (B-21)
update_file(r'd:\lecture-gpt\components\workspace\flashcards\FlashcardPanel.tsx', [
    (
        'className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-all"',
        'className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-surface-1 border border-border text-foreground-muted text-sm font-medium hover:border-red-500/30 hover:text-red-400 hover:bg-red-500/5 transition-all"'
    ),
    (
        'className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10 transition-all"',
        'className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-surface-1 border border-border text-foreground-muted text-sm font-medium hover:border-emerald-500/30 hover:text-emerald-400 hover:bg-emerald-500/5 transition-all"'
    )
])

# 11. QuizProgress.tsx (B-22)
update_file(r'd:\lecture-gpt\components\workspace\quiz\QuizProgress.tsx', [
    (
        '<span className="text-violet-400 font-medium">Score: {score}</span>',
        '<span className="text-accent font-medium">Score: {score}</span>'
    ),
    (
        '<div className="h-1.5 rounded-full bg-white/5 overflow-hidden">',
        '<div className="h-1 rounded-full bg-surface-2 overflow-hidden">'
    ),
    (
        'className="h-full bg-violet-500 rounded-full"',
        'className="h-full bg-accent rounded-full"'
    )
])

# 12. QuizResults.tsx (B-24)
update_file(r'd:\lecture-gpt\components\workspace\quiz\QuizResults.tsx', [
    (
        "if (percentage >= 90) return { label: 'Excellent!', color: 'text-emerald-400' }\n    if (percentage >= 70) return { label: 'Good Job!', color: 'text-primary' }\n    if (percentage >= 50) return { label: 'Keep Going!', color: 'text-amber' }\n    return { label: 'Keep Studying', color: 'text-red-400' }",
        "if (percentage >= 90) return { label: 'Excellent!', color: 'text-emerald-400' }\n    if (percentage >= 70) return { label: 'Good Job!', color: 'text-emerald-400' }\n    if (percentage >= 50) return { label: 'Keep Going!', color: 'text-amber' }\n    return { label: 'Keep Studying', color: 'text-red-400' }"
    ),
    (
        'stroke="hsl(245 85% 62%)"',
        'stroke="hsl(var(--accent))"'
    )
])

print("Replacements done!")
