'use server'

import { fetchApi } from '@/lib/api-server'
import { revalidatePath } from 'next/cache'

export async function generatePromos() {
  await fetchApi('/promos/generate', { method: 'POST' })
  revalidatePath('/promos')
  revalidatePath('/')
}
