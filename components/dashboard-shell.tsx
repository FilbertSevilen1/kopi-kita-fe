'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LayoutDashboard, Users, Zap, MessageSquare, LogOut, Coffee, ChevronRight } from 'lucide-react'
import { logout } from '@/app/auth/actions'
import { cn } from '@/lib/utils'
import { AIChatbot } from '@/components/ai-chatbot'

const navItems = [
    { name: 'Analitik', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Pelanggan', href: '/dashboard/customers', icon: Users },
    { name: 'Strategi', href: '/dashboard/promos', icon: Zap },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const router = useRouter()

    return (
        <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden font-[family-name:var(--font-geist-sans)] selection:bg-primary/30">
            <div className="flex flex-1 overflow-hidden">
                <aside className="w-72 border-r border-white/5 bg-white/[0.02] backdrop-blur-3xl flex flex-col z-20 shadow-[20px_0_50px_rgba(0,0,0,0.5)]">
                    <div className="p-6 pb-8">
                        <Link href="/" className="flex items-center gap-4 group">
                            <div className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary group-hover:border-primary transition-all duration-700 shadow-2xl shadow-primary/10">
                                <Coffee className="w-5 h-5 text-primary group-hover:text-background transition-colors" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-black tracking-tight uppercase leading-none">Mimi</span>
                                <span className="text-[13px] font-black uppercase text-primary">Spesialis</span>
                            </div>
                        </Link>
                    </div>

                    <ScrollArea className="flex-1 px-4">
                        <nav className="space-y-2">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-500 group border",
                                            isActive
                                                ? "bg-primary text-background border-primary shadow-2xl shadow-primary/20 scale-[1.02]"
                                                : "text-foreground/60 hover:text-primary hover:bg-white/5 border-transparent"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <item.icon className={cn(
                                                "w-4 h-4 transition-colors",
                                                isActive ? "text-background" : "text-foreground/40 group-hover:text-primary"
                                            )} />
                                            <span className="text-sm font-black uppercase">{item.name}</span>
                                        </div>
                                        {isActive && <ChevronRight className="w-4 h-4 text-background/40" />}
                                    </Link>
                                )
                            })}
                        </nav>
                    </ScrollArea>

                    <div className="p-4 mt-auto">
                        <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/10 space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-primary/40 border border-white/20" />
                                <div className="flex flex-col">
                                    <span className="text-sm font-black uppercase tracking-tight text-foreground">Pengelola Mimi</span>
                                    <span className="text-[13px] font-bold uppercase text-primary">Terotorisasi</span>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                className="w-full justify-start gap-3 text-sm font-black uppercase text-foreground/60 hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all h-10"
                                onClick={async () => {
                                    const result = await logout()
                                    if (result.success) {
                                        router.push(result.redirectTo)
                                        router.refresh()
                                    }
                                }}
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Keluar Sesi</span>
                            </Button>
                        </div>
                    </div>
                </aside>

                <main className="flex-1 flex flex-col overflow-hidden relative bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary),0.02),transparent)]">
                    <div className="absolute top-[-10%] right-[-5%] w-[1000px] h-[1000px] bg-primary/5 blur-[250px] rounded-full pointer-events-none animate-pulse" />

                    <header className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-background/60 backdrop-blur-2xl z-10">
                        <div className="flex items-center gap-4">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                            <span className="text-sm font-black uppercase text-foreground/70">Sistem Operasional</span>
                        </div>
                        <div className="flex items-center gap-8">
                            <div className="text-sm font-black uppercase text-foreground/60">
                                {new Date().toLocaleDateString('id-ID', { weekday: 'long', month: 'short', day: 'numeric' })}
                            </div>
                        </div>
                    </header>

                    <div className="flex-1 overflow-y-auto p-8 relative z-10 custom-scrollbar">
                        {children}
                    </div>
                </main>

                <AIChatbot />
            </div>
        </div>
    )
}
