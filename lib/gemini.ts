import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_STUDIO_API_KEY!)

export const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
