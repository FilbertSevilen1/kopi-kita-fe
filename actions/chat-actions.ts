'use server'

import { fetchApi } from '@/lib/api-server'

export async function chatWithAI(message: string, history: { role: 'user' | 'model', content: string }[]) {
  const result = await fetchApi('/chat', {
    method: 'POST',
    body: JSON.stringify({ message, history })
  })
  return result.content
}
