'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, UserPlus, Sparkles } from 'lucide-react'
import { addCustomer } from '@/actions/customer-actions'

export function AddCustomerDialog() {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.currentTarget)
        try {
            await addCustomer(formData)
            setOpen(false)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="h-12 px-6 rounded-xl bg-primary hover:bg-primary/80 text-background font-black uppercase tracking-wider shadow-xl shadow-primary/10 transition-all gap-2 border-none text-[10px]">
                    <UserPlus className="w-4 h-4" /> Daftar Pelanggan
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-background/80 border-white/5 text-foreground backdrop-blur-3xl rounded-[3rem] p-0 overflow-hidden max-w-2xl shadow-[0_50px_100px_rgba(0,0,0,0.8)]">
                <div className="p-12 space-y-10">
                    <DialogHeader className="space-y-6">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                            <Sparkles className="w-8 h-8 text-primary" />
                        </div>
                        <div className="space-y-2 text-left">
                            <DialogTitle className="text-3xl font-black tracking-tight uppercase leading-none">Entri Pelanggan Baru</DialogTitle>
                            <DialogDescription className="text-foreground/60 font-bold text-sm tracking-tight">
                                Data preferensi untuk komunitas kopi Mimi.
                            </DialogDescription>
                        </div>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid gap-6">
                            <div className="space-y-3">
                                <Label htmlFor="name" className="text-xs font-black uppercase tracking-wider text-primary ml-2">Identitas Nama</Label>
                                <Input id="name" name="name" placeholder="Nama Lengkap" required className="h-14 px-6 rounded-xl bg-white/5 border-white/5 focus:border-primary/40 focus:bg-white/10 transition-all text-base font-bold tracking-tight text-foreground placeholder:text-foreground/20" />
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="contact" className="text-xs font-black uppercase tracking-wider text-primary ml-2">Kontak</Label>
                                <Input id="contact" name="contact" placeholder="Email atau Nomor Telepon" className="h-14 px-6 rounded-xl bg-white/5 border-white/5 focus:border-primary/40 focus:bg-white/10 transition-all text-base font-bold tracking-tight text-foreground placeholder:text-foreground/20" />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <Label htmlFor="favorite_drink" className="text-xs font-black uppercase tracking-wider text-primary ml-2">Minuman Favorit</Label>
                                    <Input id="favorite_drink" name="favorite_drink" placeholder="Espresso, Latte, dll." required className="h-14 px-6 rounded-xl bg-white/5 border-white/5 focus:border-primary/40 focus:bg-white/10 transition-all text-base font-bold tracking-tight text-foreground placeholder:text-foreground/20" />
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="interests" className="text-xs font-black uppercase tracking-wider text-primary ml-2">Minat</Label>
                                    <Input id="interests" name="interests" placeholder="Pisahkan dengan koma" className="h-14 px-6 rounded-xl bg-white/5 border-white/5 focus:border-primary/40 focus:bg-white/10 transition-all text-base font-bold tracking-tight text-foreground placeholder:text-foreground/20" />
                                </div>
                            </div>
                        </div>
                        <DialogFooter className="pt-4">
                            <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/80 text-background font-black uppercase tracking-wider h-16 rounded-2xl text-lg transition-all shadow-xl active:scale-[0.98] border-none">
                                {loading ? "Menyimpan..." : "Simpan Data"}
                            </Button>
                        </DialogFooter>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
