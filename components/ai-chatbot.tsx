'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, X, Send, BrainCircuit, Sparkles, Coffee } from 'lucide-react'
import { chatWithAI } from '@/actions/chat-actions'
import { cn } from '@/lib/utils'

export function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<{ role: 'user' | 'model', content: string }[]>([])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages, isOpen])

    async function handleSend(e?: React.FormEvent) {
        e?.preventDefault()
        if (!input.trim() || loading) return

        const userMessage = input.trim()
        setInput('')
        setMessages(prev => [...prev, { role: 'user', content: userMessage }])
        setLoading(true)

        try {
            const response = await chatWithAI(userMessage, messages)
            setMessages(prev => [...prev, { role: 'model', content: response }])
        } catch (error) {
            setMessages(prev => [...prev, { role: 'model', content: "Protocol interruption. Re-initialize transmission?" }])
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed bottom-10 right-10 z-[100]">
            {!isOpen ? (
                <Button
                    onClick={() => setIsOpen(true)}
                    className="w-20 h-20 rounded-[2rem] bg-primary hover:bg-primary/80 shadow-[0_20px_50px_rgba(var(--primary),0.3)] p-0 border-none transition-all hover:scale-105 active:scale-95 group"
                >
                    <BrainCircuit className="w-8 h-8 text-background transition-transform group-hover:rotate-12" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-background animate-pulse" />
                </Button>
            ) : (
                <Card className="w-[400px] h-[600px] border-white/10 bg-background/90 backdrop-blur-3xl shadow-[0_50px_100px_rgba(0,0,0,0.8)] rounded-[2rem] flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-700">
                    <CardHeader className="p-6 border-b border-white/10 bg-white/[0.05] flex flex-row items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/20 flex items-center justify-center shadow-inner">
                                <BrainCircuit className="w-5 h-5 text-primary" />
                            </div>
                            <div className="space-y-0.5">
                                <CardTitle className="text-sm font-black tracking-tight text-foreground uppercase">Asisten Mimi</CardTitle>
                                <div className="text-[10px] font-black uppercase text-emerald-500 flex items-center gap-1.5">
                                    <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" /> Sistem Aktif
                                </div>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="w-10 h-10 rounded-xl hover:bg-white/10 hover:text-primary transition-all">
                            <X className="w-4 h-4 text-foreground/60" />
                        </Button>
                    </CardHeader>
                    <CardContent className="flex-1 p-0 overflow-hidden">
                        <ScrollArea className="h-full px-6 py-8">
                            <div className="space-y-8">
                                {messages.length === 0 && (
                                    <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                                        <div className="p-6 rounded-full bg-white/[0.02] border border-white/5">
                                            <Coffee className="w-12 h-12 text-foreground/5" />
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-[11px] font-black uppercase text-primary">Asisten Siap Membantu</p>
                                            <p className="text-xs font-bold text-foreground/60 italic">Menunggu masukan untuk analisis pasar atau operasional toko.</p>
                                        </div>
                                    </div>
                                )}
                                {messages.map((m, i) => (
                                    <div key={i} className={cn(
                                        "flex flex-col max-w-[90%] space-y-3",
                                        m.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                                    )}>
                                        <div className={cn(
                                            "p-4 rounded-2xl text-[13px] font-bold tracking-tight shadow-xl leading-relaxed",
                                            m.role === 'user'
                                                ? "bg-primary text-background rounded-tr-none"
                                                : "bg-white/5 border border-white/10 text-foreground/80 rounded-tl-none italic font-medium"
                                        )}>
                                            {m.role === 'model' && <Sparkles className="w-3 h-3 mb-2 text-primary opacity-80" />}
                                            {m.content}
                                        </div>
                                    </div>
                                ))}
                                {loading && (
                                    <div className="flex mr-auto max-w-[20%]">
                                        <div className="bg-white/5 border border-white/5 p-4 rounded-[1.5rem] rounded-tl-none flex gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce" />
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:0.2s]" />
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:0.4s]" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </CardContent>
                    <CardFooter className="p-6 border-t border-white/10 bg-background/90">
                        <form onSubmit={handleSend} className="flex w-full gap-4 relative group">
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-focus-within:opacity-100 blur-xl transition-opacity rounded-3xl" />
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Kirim pertanyaan operasional..."
                                className="h-12 px-6 rounded-xl bg-white/[0.05] border-white/10 text-[13px] font-bold tracking-tight focus:border-primary/40 focus:bg-white/10 transition-all text-foreground placeholder:text-foreground/40 relative z-10"
                            />
                            <Button type="submit" size="icon" disabled={loading} className="w-12 h-12 rounded-xl bg-primary hover:bg-primary/80 transition-all shrink-0 border-none shadow-xl shadow-primary/10 relative z-10 group/send">
                                <Send className="w-4 h-4 text-background group-hover:scale-110 transition-transform" />
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            )}
        </div>
    )
}
