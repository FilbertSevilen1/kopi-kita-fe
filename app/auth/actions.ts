'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function getSupabase() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {

          }
        },
      },
    }
  )
}

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  console.log('Login attempt via Backend for:', email)
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      let error = 'Login failed'
      const contentType = response.headers.get("content-type")
      if (contentType && contentType.includes("application/json")) {
          try {
              const errorData = await response.json()
              error = errorData.error || error
          } catch (e) {}
      }
      return { error }
    }

    const { session } = await response.json()
    

    const supabase = await getSupabase()
    const { error: sessionError } = await supabase.auth.setSession(session)
    
    if (sessionError) return { error: sessionError.message }

    console.log('Login successful via Backend.')
    return { success: true, redirectTo: '/dashboard' }
  } catch (err: any) {
    console.error('Login error:', err.message)
    return { error: err.message || 'An unexpected error occurred' }
  }
}

export async function signup(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  console.log('Signup attempt via Backend for:', email)

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      let error = 'Registration failed'
      const contentType = response.headers.get("content-type")
      if (contentType && contentType.includes("application/json")) {
          try {
              const errorData = await response.json()
              error = errorData.error || error
          } catch (e) {}
      }
      return { error }
    }

    return { success: true, message: 'Account created! Please check your email to confirm.' }
  } catch (err: any) {
    console.error('Signup error:', err.message)
    return { error: err.message || 'An unexpected error occurred' }
  }
}

export async function resendConfirmationEmail(email: string) {
  console.log('Resending confirmation for:', email)
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/resend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    if (!response.ok) {
      let error = 'Failed to resend email'
      const contentType = response.headers.get("content-type")
      if (contentType && contentType.includes("application/json")) {
          try {
              const errorData = await response.json()
              error = errorData.error || error
          } catch (e) {}
      }
      return { error }
    }

    return { success: true, message: 'Confirmation email resent! Please check your inbox.' }
  } catch (err: any) {
    console.error('Resend error:', err.message)
    return { error: err.message || 'An unexpected error occurred' }
  }
}

export async function logout() {
  const supabase = await getSupabase()
  await supabase.auth.signOut()

  return { success: true, redirectTo: '/login' }
}
