import { createClient } from './supabase-server'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()
    
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...((options.headers as any) || {}),
    }

    if (session?.access_token) {
        headers['Authorization'] = `Bearer ${session.access_token}`
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    })

    if (!response.ok) {
        let errorMsg = 'API request failed'
        try {
            const error = await response.json()
            errorMsg = error.error || errorMsg
        } catch (e) {
        }
        throw new Error(errorMsg)
    }

    return response.json()
}
