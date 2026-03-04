import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { AddCustomerDialog } from '@/components/add-customer-dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Coffee, RotateCcw, UserPlus, Sparkles, Users } from 'lucide-react'
import { fetchApi } from '@/lib/api-server'
import { resetCustomers } from '@/actions/customer-actions'

export default async function CustomersPage({
    searchParams,
}: {
    searchParams: Promise<{ query?: string }>
}) {
    const query = (await searchParams).query || ''
    let customers: any[] = []
    try {
        customers = await fetchApi(`/customers?query=${query}`)
    } catch (e) {
        // Backend error - render empty state
    }

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase">
                        <Users className="w-3 h-3" />
                        <span>Manajemen Registri</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tight text-foreground uppercase">Pelanggan</h1>
                    <p className="text-foreground/60 font-bold tracking-tight text-sm">Mengkurasi komunitas pecinta kopi terbaik.</p>
                </div>
                <div className="flex items-center gap-4">
                    <form action={resetCustomers}>
                        <Button
                            variant="outline"
                            type="submit"
                            className="h-12 px-6 rounded-xl border-white/5 bg-white/[0.02] text-foreground/60 hover:text-destructive hover:bg-destructive/10 transition-all font-black uppercase text-[10px] gap-2"
                        >
                            <RotateCcw className="w-4 h-4" /> Reset Daftar
                        </Button>
                    </form>
                    <AddCustomerDialog />
                </div>
            </div>

            <div className="relative max-w-xl group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40 group-focus-within:text-primary transition-colors" />
                <Input
                    name="query"
                    placeholder="Cari dalam registri untuk nama atau seduhan favorit..."
                    defaultValue={query}
                    className="h-14 pl-16 rounded-xl bg-white/[0.02] border-white/5 focus:border-primary/40 focus:bg-white/5 transition-all text-sm font-bold tracking-tight text-foreground placeholder:text-foreground/20"
                />
            </div>

            <div className="rounded-[2.5rem] border border-white/5 bg-white/[0.01] overflow-hidden backdrop-blur-3xl shadow-2xl">
                <Table>
                    <TableHeader className="bg-white/[0.03]">
                        <TableRow className="hover:bg-transparent border-white/5 h-16">
                            <TableHead className="text-[11px] font-black uppercase text-foreground/60 px-8">Nama</TableHead>
                            <TableHead className="text-[11px] font-black uppercase text-foreground/60">Pesanan Khas</TableHead>
                            <TableHead className="text-[11px] font-black uppercase text-foreground/60">Label Profil</TableHead>
                            <TableHead className="text-[11px] font-black uppercase text-foreground/60">Komunikasi</TableHead>
                            <TableHead className="text-[11px] font-black uppercase text-foreground/60 text-right px-8">Terdaftar</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {customers?.map((customer: any) => (
                            <TableRow key={customer.id} className="hover:bg-white/[0.02] border-white/5 transition-all duration-300 h-24 group">
                                <TableCell className="font-black text-foreground text-lg tracking-tighter px-8 group-hover:text-primary transition-colors">{customer.name}</TableCell>
                                <TableCell className="text-foreground/80 font-bold tracking-tight">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <Coffee className="w-4 h-4 text-primary" />
                                        </div>
                                        {customer.favorite_drink}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-wrap gap-2">
                                        {customer.interests?.map((interest: string) => (
                                            <Badge key={interest} variant="outline" className="bg-primary/5 text-primary border-primary/20 py-1.5 px-3 rounded-lg text-[10px] uppercase font-black group-hover:bg-primary group-hover:text-background transition-all">
                                                {interest}
                                            </Badge>
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell className="text-foreground/70 text-[12px] font-bold tracking-tight uppercase italic">{customer.contact || 'N/A'}</TableCell>
                                <TableCell className="text-foreground/50 text-[11px] font-black text-right px-8 tracking-tight">
                                    {new Date(customer.created_at).toLocaleDateString('id-ID', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </TableCell>
                            </TableRow>
                        ))}
                        {customers?.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="h-60 text-center">
                                    <div className="flex flex-col items-center justify-center space-y-4 opacity-20">
                                        <Users className="w-16 h-16" />
                                        <p className="text-sm font-black uppercase italic">Registri Kosong</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
