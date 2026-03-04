import DashboardShell from '@/components/dashboard-shell'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, Sparkles, Copy, Clock, Target, ArrowRight, BrainCircuit } from 'lucide-react'
import { generatePromos } from '@/actions/promo-actions'
import { seedCustomers } from '@/actions/customer-actions'
import { fetchApi } from '@/lib/api-server'
import { Database } from 'lucide-react'

export default async function PromoIdeasPage() {
    let promos: any[] = []
    try {
        promos = await fetchApi('/promos')
    } catch (e) {
        // Backend error - render empty state
    }

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary text-[9px] font-black uppercase tracking-[0.2em]">
                        <BrainCircuit className="w-3 h-3" />
                        <span>Intelligence Engine</span>
                    </div>
                    <h1 className="text-5xl font-black tracking-tighter text-foreground uppercase">Strategies</h1>
                    <p className="text-foreground/40 font-bold tracking-tight">AI-driven marketing protocols based on real-time patron data.</p>
                </div>
                <div className="flex items-center gap-4">
                    <form action={seedCustomers}>
                        <Button variant="outline" className="h-14 px-8 rounded-2xl border-white/5 bg-white/[0.02] text-foreground/40 hover:text-primary hover:bg-primary/5 transition-all font-black uppercase tracking-[0.2em] text-[10px] gap-3">
                            <Database className="w-4 h-4" /> Seed Intel
                        </Button>
                    </form>
                    <form action={generatePromos}>
                        <Button className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/80 text-background font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 transition-all gap-3 border-none">
                            <Sparkles className="w-4 h-4" /> Run Generation
                        </Button>
                    </form>
                </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {promos?.map((promo: any) => (
                    <Card key={promo.id} className="bg-white/[0.01] border-white/5 backdrop-blur-3xl rounded-[2.5rem] shadow-xl overflow-hidden group hover:border-primary/20 transition-all duration-700">
                        <CardHeader className="p-10 pb-6 border-b border-white/5">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3 py-1.5 px-4 rounded-full bg-primary/10 border border-primary/20">
                                    <Zap className="w-3 h-3 text-primary fill-primary" />
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">Strategic Insight</span>
                                </div>
                                <ArrowRight className="w-5 h-5 text-foreground/10 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                            </div>
                            <CardTitle className="text-3xl font-black tracking-tighter text-foreground mb-4 uppercase leading-none group-hover:text-primary transition-colors">{promo.theme}</CardTitle>
                            <CardDescription className="bg-emerald-500/5 text-emerald-400 font-black text-[10px] uppercase tracking-[0.1em] px-4 py-2 rounded-xl inline-flex items-center gap-2 border border-emerald-500/10">
                                Protocol: <span className="opacity-60">{promo.why_now}</span>
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-10 space-y-8">
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-foreground/20 text-[10px] font-black uppercase tracking-[0.2em]">
                                    <Target className="w-4 h-4" /> Optimized Segment
                                </div>
                                <p className="text-lg font-bold tracking-tight text-foreground/80 leading-snug">{promo.segment}</p>
                            </div>

                            <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 relative group/msg overflow-hidden">
                                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/msg:opacity-100 transition-opacity" />
                                <div className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-4 flex justify-between items-center relative z-10">
                                    Transmission
                                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:bg-primary/20 hover:text-primary transition-colors">
                                        <Copy className="w-4 h-4" />
                                    </Button>
                                </div>
                                <p className="text-lg italic leading-relaxed text-foreground font-medium relative z-10">
                                    &quot;{promo.message}&quot;
                                </p>
                            </div>

                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">
                                <Clock className="w-4 h-4 text-primary" />
                                Peak Window: <span className="text-foreground/80">07:00 - 10:00 PST</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {(!promos || promos.length === 0) && (
                    <div className="col-span-full py-40 flex flex-col items-center justify-center border-4 border-dashed border-white/5 rounded-[4rem] group hover:border-primary/10 transition-all duration-1000">
                        <div className="relative">
                            <Sparkles className="w-20 h-20 text-foreground/[0.02] mb-8 group-hover:text-primary group-hover:scale-110 transition-all duration-1000" />
                            <div className="absolute inset-0 blur-2xl bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-sm font-black uppercase tracking-[0.4em] text-foreground/5 group-hover:text-primary/40 transition-all duration-1000">Intelligence Engine Idle</p>
                    </div>
                )}
            </div>
        </div>
    )
}
