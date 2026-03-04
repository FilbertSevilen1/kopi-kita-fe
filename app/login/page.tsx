'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { login } from "@/app/auth/actions"
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Coffee, Lock, Mail, Loader2, Link } from 'lucide-react'

export default function LoginPage() {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.currentTarget)

        try {
            const result = await login(formData) as any
            if (result?.error) {
                if (result.error.includes('rate_limit') || result.error.includes('Too many')) {
                    toast.error("Slow down!", {
                        description: "You're being rate limited. Please wait a few minutes before trying again."
                    })
                } else {
                    toast.error(result.error)
                }
            } else if (result?.success) {
                toast.success("Welcome back!")
                if (result.redirectTo) {
                    router.push(result.redirectTo)
                }
            }
        } catch (err: any) {
            toast.error("An unexpected error occurred. Please try again.")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden">
            <Header />

            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-primary/5 blur-[200px] rounded-full" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-primary/5 blur-[200px] rounded-full" />
            </div>

            <div className="pt-32 flex-1 flex items-center justify-center w-full px-6 z-10">
                <Card className="w-full max-w-xl bg-white/[0.02] border-white/5 backdrop-blur-3xl rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden">
                    <CardHeader className="space-y-8 flex flex-col items-center pt-16 pb-12">
                        <div className="relative w-24 h-24 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-2xl">
                            <Coffee className="w-12 h-12 text-primary" />
                        </div>
                        <div className="text-center space-y-2">
                            <CardTitle className="text-3xl font-black tracking-tight text-foreground uppercase">Akses Pengelola</CardTitle>
                            <CardDescription className="text-foreground/60 font-bold text-sm tracking-tight">
                                Gerbang aman untuk operasional Mimi Specialty Coffee.
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="px-12 pb-16">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[13px] font-black uppercase text-primary/80 ml-2">Alamat Email</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40 group-focus-within:text-primary transition-colors" />
                                        <Input
                                            name="email"
                                            type="email"
                                            placeholder="admin@mimi.coffee"
                                            required
                                            disabled={loading}
                                            className="bg-white/5 border-white/5 focus:border-primary/40 focus:bg-white/10 transition-all h-14 pl-14 rounded-xl text-base font-bold tracking-tight text-foreground placeholder:text-foreground/30"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[13px] font-black uppercase text-primary/80 ml-2">Kata Sandi</label>
                                    <div className="relative group">
                                        <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40 group-focus-within:text-primary transition-colors" />
                                        <Input
                                            name="password"
                                            type="password"
                                            placeholder="••••••••"
                                            required
                                            disabled={loading}
                                            className="bg-white/5 border-white/5 focus:border-primary/40 focus:bg-white/10 transition-all h-14 pl-14 rounded-xl text-base font-bold tracking-tight text-foreground placeholder:text-foreground/30"
                                        />
                                    </div>
                                </div>
                            </div>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary hover:bg-primary/80 text-background font-black uppercase h-14 rounded-xl text-base transition-all shadow-xl shadow-primary/10 active:scale-[0.98] disabled:opacity-50 border-none group"
                            >
                                {loading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <span className="flex items-center gap-3">
                                        Masuk Ke Sistem
                                    </span>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>

        </div >
    )
}
