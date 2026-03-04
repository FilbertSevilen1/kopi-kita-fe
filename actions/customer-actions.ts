'use server'

import { fetchApi } from '@/lib/api-server'
import { revalidatePath } from 'next/cache'

export async function addCustomer(formData: FormData) {
  const name = formData.get('name') as string
  const contact = formData.get('contact') as string
  const favorite_drink = formData.get('favorite_drink') as string
  const interests = (formData.get('interests') as string)
    .split(',')
    .map(i => i.trim())
    .filter(i => i !== '')

  await fetchApi('/customers', {
    method: 'POST',
    body: JSON.stringify({ name, contact, favorite_drink, interests })
  })

  revalidatePath('/dashboard/customers')
  revalidatePath('/dashboard')
}

export async function seedCustomers() {
  await fetchApi('/customers/seed', { method: 'POST' })
  revalidatePath('/dashboard')
  revalidatePath('/dashboard/customers')
}

export async function resetCustomers() {
  await fetchApi('/customers/reset', { method: 'DELETE' })
  revalidatePath('/dashboard')
  revalidatePath('/dashboard/customers')
}
