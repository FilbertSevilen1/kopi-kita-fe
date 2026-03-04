'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import { logout } from '@/app/auth/actions'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, User as UserIcon, LayoutDashboard, Coffee } from 'lucide-react'

export function Header() {
    const pathname = usePathname()
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        const getUser = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            setUser(session?.user ?? null)
            setLoading(false)
        }

        getUser()

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        return () => subscription.unsubscribe()
    }, [supabase.auth])

    const handleLogout = async () => {
        const result = await logout()
        if (result.success) {
            router.push('/')
            router.refresh()
        }
    }

    return (
        <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/70 backdrop-blur-xl transition-all duration-500">
            <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-12 h-12 overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 flex items-center justify-center transition-all duration-500 group-hover:border-primary/50 group-hover:bg-primary/10">
                        <Coffee className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-black tracking-tighter leading-none text-foreground">KOPI KITA</span>
                        <span className="text-[13px] font-bold uppercase text-primary leading-none mt-1">Specialty Coffee</span>
                    </div>
                </Link>

                <div className="hidden md:flex items-center gap-12 text-sm font-black uppercase">
                    <Link
                        href="/menu"
                        className={cn(
                            "transition-all duration-300 hover:text-primary relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all hover:after:w-full",
                            pathname === '/menu' ? "text-primary after:w-full" : "text-foreground/50"
                        )}
                    >
                        MENU
                    </Link>
                    <Link href="/#about" className="text-foreground/50 hover:text-primary transition-all duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all hover:after:w-full">CERITA</Link>
                    <Link href="/#location" className="text-foreground/50 hover:text-primary transition-all duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all hover:after:w-full">KUNJUNGI</Link>
                </div>

                <div className="flex items-center gap-4">
                    {!loading && (
                        user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-12 w-12 rounded-2xl p-0 border border-white/10 hover:border-primary/30 transition-all overflow-hidden group bg-white/5">
                                        <Avatar className="h-full w-full rounded-none">
                                            <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email || ''} />
                                            <AvatarFallback className="bg-primary/10 text-primary font-black uppercase text-xs">
                                                {user.email?.charAt(0) || 'M'}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-64 mt-4 bg-background/95 backdrop-blur-2xl border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-3xl p-3 font-bold" align="end">
                                    <DropdownMenuLabel className="px-4 py-3 text-[13px] text-foreground/40 uppercase">
                                        Akun
                                    </DropdownMenuLabel>
                                    <div className="px-4 py-2 mb-2">
                                        <p className="text-sm font-black truncate text-foreground">{user.email}</p>
                                    </div>
                                    <DropdownMenuSeparator className="bg-white/5 mx-2 mb-2" />
                                    <DropdownMenuItem onClick={() => router.push('/dashboard')} className="rounded-2xl px-4 py-3 hover:bg-primary/10 text-foreground/70 hover:text-primary transition-all gap-4 text-xs font-black uppercase tracking-wider cursor-pointer">
                                        <LayoutDashboard className="w-4 h-4" />
                                        <span>Dashboard</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleLogout} className="rounded-2xl px-4 py-3 hover:bg-destructive/10 text-foreground/70 hover:text-destructive transition-all gap-4 text-xs font-black uppercase tracking-wider cursor-pointer">
                                        <LogOut className="w-4 h-4" />
                                        <span>Keluar</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Link href="/login">
                                <Button className="bg-primary hover:bg-primary/80 text-background font-black uppercase text-sm h-12 px-8 rounded-2xl shadow-2xl shadow-primary/20 transition-all active:scale-95 border-none">
                                    Masuk
                                </Button>
                            </Link>
                        )
                    )}
                </div>
            </div>
        </nav>
    )
}
