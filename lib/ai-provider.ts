const USE_NVIDIA = process.env.NVIDIA_NIM_API_KEY && process.env.USE_NVIDIA === 'true'

export async function generateCompletion(params: {
  prompt: string
  model: 'fast' | 'smart'
  maxTokens?: number
  temperature?: number
  jsonMode?: boolean
}): Promise<string> {
  const { prompt, model, maxTokens = 4096, temperature = 0.5, jsonMode = false } = params

  if (USE_NVIDIA) {
    const { nvidia, NVIDIA_MODELS, nvidiaWithRetry } = await import('./nvidia')
    const modelId = model === 'smart' ? NVIDIA_MODELS.SMART : NVIDIA_MODELS.FAST

    const completion = await nvidiaWithRetry(() =>
      nvidia.chat.completions.create({
        model: modelId,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: maxTokens,
        temperature,
        ...(jsonMode ? { response_format: { type: 'json_object' } } : {}),
      })
    )
    return completion.choices[0]?.message?.content || ''
  } else {
    const { groq, MODELS, groqWithRetry } = await import('./groq')
    const modelId = model === 'smart' ? MODELS.SMART : MODELS.FAST

    const completion = await groqWithRetry(() =>
      groq.chat.completions.create({
        model: modelId,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: maxTokens,
        temperature,
        ...(jsonMode ? { response_format: { type: 'json_object' } } : {}),
      })
    )
    return completion.choices[0]?.message?.content || ''
  }
}

export async function streamCompletion(params: {
  messages: Array<{ role: string; content: string }>
  systemPrompt: string
  model: 'fast' | 'smart'
  maxTokens?: number
  temperature?: number
}): Promise<AsyncIterable<string>> {
  const { messages, systemPrompt, model, maxTokens = 1024, temperature = 0.3 } = params

  if (USE_NVIDIA) {
    const { nvidia, NVIDIA_MODELS, nvidiaWithRetry } = await import('./nvidia')
    const modelId = model === 'smart' ? NVIDIA_MODELS.SMART : NVIDIA_MODELS.FAST

    const stream = await nvidiaWithRetry(() =>
      nvidia.chat.completions.create({
        model: modelId,
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ] as Parameters<typeof nvidia.chat.completions.create>[0]['messages'],
        stream: true,
        max_tokens: maxTokens,
        temperature,
      })
    )

    return (async function* () {
      for await (const chunk of stream as AsyncIterable<{ choices: Array<{ delta: { content?: string } }> }>) {
        const text = chunk.choices[0]?.delta?.content || ''
        if (text) yield text
      }
    })()
  } else {
    const { groq, MODELS, groqWithRetry } = await import('./groq')
    const modelId = model === 'smart' ? MODELS.SMART : MODELS.FAST

    const stream = await groqWithRetry(() =>
      groq.chat.completions.create({
        model: modelId,
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages as Parameters<typeof groq.chat.completions.create>[0]['messages'],
        ],
        stream: true,
        max_tokens: maxTokens,
        temperature,
      })
    )

    return (async function* () {
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content || ''
        if (text) yield text
      }
    })()
  }
}
