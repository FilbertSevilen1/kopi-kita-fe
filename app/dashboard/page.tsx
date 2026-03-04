import DashboardShell from '@/components/dashboard-shell'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, TrendingUp, Zap, Coffee, Database, Sparkles, ArrowUpRight } from 'lucide-react'
import { fetchApi } from '@/lib/api-server'
import { seedCustomers } from '@/actions/customer-actions'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function DashboardPage() {
  let stats = {
    totalCustomers: 0,
    totalPromos: 0,
    topInterests: [] as { name: string, count: number }[],
    growth: '+0%',
    topInterestName: 'None'
  }

  let promos = []

  try {
    stats = await fetchApi('/stats')
    promos = await fetchApi('/promos')
  } catch (e: any) {
    if (e.message !== 'Missing authorization header') {
      console.error('Failed to fetch dashboard data', e)
    }
  }

  const cards = [
    { title: 'Total Pelanggan', value: stats.totalCustomers, icon: Users, detail: stats.growth, trend: 'up' },
    { title: 'Minat Teratas', value: stats.topInterestName, icon: Coffee, detail: 'Sedang Tren', trend: 'neutral' },
    { title: 'Promo Aktif', value: stats.totalPromos, icon: Zap, detail: 'Teroptimasi', trend: 'up' },
    { title: 'Interaksi', value: stats.totalCustomers > 0 ? 'Tinggi' : 'Idle', icon: TrendingUp, detail: 'Data Langsung', trend: 'neutral' },
  ]

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase">
            <Sparkles className="w-3 h-3" />
            <span>Pusat Operasional</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-foreground uppercase">
            Dashboard
          </h1>
          <p className="text-foreground/60 font-bold tracking-tight text-sm">Metrik performa real-time untuk Mimi Specialty Coffee.</p>
        </div>
        {stats.totalCustomers === 0 && (
          <form action={seedCustomers}>
            <Button size="lg" className="animate-shimmer shadow-[0_20px_40px_rgba(var(--primary),0.3)] hover:shadow-[0_30px_60px_rgba(var(--primary),0.5)] border-none">
              <Database className="w-4 h-4" /> Inisialisasi Data Ekosistem
            </Button>
          </form>
        )}
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.title} className="bg-white/[0.02] border-white/5 backdrop-blur-3xl rounded-[1.5rem] shadow-xl overflow-hidden hover:border-primary/20 transition-all duration-500 group">
            <CardHeader className="flex flex-row items-center justify-between pb-3 pt-6 px-6">
              <CardTitle className="text-[11px] font-black uppercase text-foreground/60 group-hover:text-primary transition-colors">{card.title}</CardTitle>
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/10 group-hover:border-primary/20 transition-all">
                <card.icon className="w-4 h-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="text-3xl font-black tracking-tight text-foreground mb-1">{card.value}</div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-primary/10 text-primary uppercase tracking-wide">{card.detail}</span>
                <span className="text-[10px] font-bold text-foreground/40 uppercase italic">Sejak sesi dimulai</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-white/[0.02] border-white/5 backdrop-blur-3xl rounded-[2rem] shadow-xl overflow-hidden">
          <CardHeader className="p-8 pb-4 border-b border-white/5">
            <CardTitle className="text-xl font-black tracking-tight flex items-center gap-4">
              <TrendingUp className="w-5 h-5 text-primary" />
              ANALITIK: MINAT PELANGGAN
            </CardTitle>
          </CardHeader>
          <CardContent className="p-10">
            <div className="space-y-8">
              {stats.topInterests.length > 0 ? (
                stats.topInterests.map((interest) => (
                  <div key={interest.name} className="space-y-3">
                    <div className="flex justify-between items-end px-1">
                      <span className="text-[10px] font-black uppercase text-foreground/60">{interest.name}</span>
                      <span className="text-[10px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded-md uppercase">{interest.count} Unit</span>
                    </div>
                    <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-[2px]">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(var(--primary),0.5)]"
                        style={{ width: `${(interest.count / stats.totalCustomers) * 100}%` }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-[300px] flex flex-col items-center justify-center text-foreground/10 space-y-6">
                  <Database className="w-16 h-16 opacity-10" />
                  <p className="text-sm font-black uppercase tracking-[0.3em] italic">Menunggu Data Sistem...</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 bg-white/[0.02] border-white/5 backdrop-blur-3xl rounded-[2rem] shadow-xl overflow-hidden">
          <CardHeader className="p-8 pb-4 border-b border-white/5 flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-black tracking-tight flex items-center gap-4">
              <Zap className="w-5 h-5 text-primary" />
              PROMO CERDAS
            </CardTitle>
            <Link href="/dashboard/promos">
              <Button variant="ghost" size="sm" className="h-8 rounded-lg px-3 text-[9px] font-black uppercase hover:bg-primary hover:text-background transition-all">
                Log Lengkap <ArrowUpRight className="ml-1.5 w-3 h-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid gap-4">
              {promos && promos.length > 0 ? (
                promos.slice(0, 4).map((promo: any) => (
                  <div key={promo.id} className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2 group hover:border-primary/30 hover:bg-white/5 transition-all duration-500">
                    <div className="flex items-center gap-2 text-[9px] font-black text-primary uppercase">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> STRATEGI SISTEM
                    </div>
                    <div className="text-base font-black tracking-tight text-foreground group-hover:text-primary transition-colors">{promo.theme}</div>
                    <div className="text-[10px] font-bold text-foreground/60 uppercase line-clamp-1">{promo.segment}</div>
                  </div>
                ))
              ) : (
                <div className="h-[300px] flex flex-col items-center justify-center text-foreground/10 space-y-6">
                  <Zap className="w-12 h-12 opacity-10 animate-pulse" />
                  <p className="text-xs font-black uppercase italic">Generator Idle...</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
