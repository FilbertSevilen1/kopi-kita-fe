"use client"

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Coffee, MapPin, Clock, ArrowRight, Instagram, Twitter, Facebook, Sparkles } from 'lucide-react'
import { Header } from '@/components/header'

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-foreground">
            <Header />

            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/CoffeeWallpaper1.webp"
                        alt="Hero Background"
                        fill
                        className="object-cover opacity-40 scale-105 animate-slow-zoom"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/40 to-background" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_oklch(0.12_0.02_35_/_0.8)_100%)]" />
                </div>

                <div className="relative z-10 text-center space-y-12 px-6 max-w-5xl">
                    <div className="inline-flex items-center gap-3 px-6 py-2 rounded-2xl bg-primary/10 border border-primary/20 text-primary text-[10px] font-black tracking-[0.3em] uppercase backdrop-blur-2xl animate-reveal">
                        <Sparkles className="w-4 h-4" />
                        <span>Kopi Sidikalang Autentik</span>
                    </div>

                    <h1 className="text-8xl md:text-[12rem] font-black tracking-tighter leading-[0.8] bg-gradient-to-b from-foreground via-foreground/90 to-primary/20 bg-clip-text text-transparent drop-shadow-2xl">
                        KOPI <br /> SPESIAL
                    </h1>

                    <p className="text-lg md:text-2xl text-foreground/40 max-w-2xl mx-auto leading-relaxed font-bold tracking-tight">
                        Dedikasi dalam setiap tetes. Nikmati kopi pilihan terbaik di ruang yang dirancang khusus untuk ketenangan jiwa.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-12">
                        <Link href="/menu" className="w-full sm:w-auto">
                            <Button size="xl" className="w-full relative group animate-shimmer overflow-hidden shadow-[0_30px_60px_-15px_rgba(var(--primary),0.4)] hover:shadow-[0_40px_80px_-15px_rgba(var(--primary),0.6)]">
                                JELAJAHI MENU
                                <ArrowRight className="ml-4 w-6 h-6 group-hover:translate-x-2 transition-transform duration-700" />
                            </Button>
                        </Link>
                        <Button size="xl" variant="outline" className="w-full sm:w-auto border-white/5 bg-white/[0.02] backdrop-blur-3xl hover:border-primary/30 hover:bg-white/[0.05] shadow-2xl">
                            CERITA KAMI
                        </Button>
                    </div>
                </div>

                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30 animate-pulse">
                    <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-primary to-transparent" />
                    <span className="text-[9px] font-black tracking-[0.4em] uppercase text-primary">Jelajahi</span>
                </div>
            </section>

            <section id="menu" className="py-40 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-32 gap-12">
                        <div className="max-w-2xl space-y-6">
                            <div className="w-16 h-1 bg-primary rounded-full mb-8" />
                            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">SENI KOPI.</h2>
                            <p className="text-foreground/40 text-xl font-bold leading-relaxed max-w-lg">Biji kopi kami berasal langsung dari perkebunan vulkanik, diproses dalam jumlah kecil untuk kejernihan rasa yang tak tertandingi.</p>
                        </div>
                        <Link href="/menu">
                            <Button variant="link" className="text-primary font-black uppercase tracking-[0.3em] text-[10px] gap-4 group">
                                Lihat Menu Lengkap
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { img: '/products/latte.webp', title: 'Velvet Latte', price: 'Rp 45.000', tag: 'Andalan' },
                            { img: '/products/espresso.webp', title: 'Hitam Sidikalang', price: 'Rp 38.000', tag: 'Kuat' },
                            { img: '/products/mocha.webp', title: 'Caramel Cloud', price: 'Rp 52.000', tag: 'Manis' },
                        ].map((item, idx) => (
                            <div key={idx} className="group relative aspect-[3/4] overflow-hidden rounded-[3rem] bg-white/5 border border-white/5 hover:border-primary/20 transition-all duration-700">
                                <Image
                                    src={item.img}
                                    alt={item.title}
                                    fill
                                    className="object-cover scale-100 group-hover:scale-110 transition-transform duration-1000 opacity-70 group-hover:opacity-100 grayscale-[0.5] group-hover:grayscale-0"
                                />
                                <div className="absolute top-8 left-8">
                                    <span className="px-4 py-1.5 rounded-full bg-background/80 backdrop-blur-md border border-white/10 text-[9px] font-black uppercase tracking-[0.2em] text-primary">{item.tag}</span>
                                </div>
                                <div className="absolute inset-x-0 bottom-0 p-12 flex items-end justify-between bg-gradient-to-t from-background/95 via-background/40 to-transparent translate-y-6 group-hover:translate-y-0 transition-transform duration-700">
                                    <div className="space-y-2">
                                        <h3 className="text-4xl font-black tracking-tighter">{item.title}</h3>
                                        <p className="text-primary font-black text-lg tracking-tight">{item.price}</p>
                                    </div>
                                    <button className="w-14 h-14 rounded-2xl bg-primary text-background flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 hover:scale-110">
                                        <ArrowRight className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="about" className="py-40 bg-white/[0.02] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[200px] -translate-y-1/2 translate-x-1/2 rounded-full" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] translate-y-1/2 -translate-x-1/2 rounded-full" />

                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-32 items-center">
                    <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden border border-white/5 shadow-2xl skew-y-0 hover:-translate-y-4 transition-transform duration-1000 group">
                        <Image
                            src="/images/CoffeeWallpaper1.webp"
                            alt="Suasana"
                            fill
                            className="object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
                    </div>
                    <div className="space-y-16">
                        <div className="space-y-6">
                            <h2 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.8]">KOPI<br /><span className="text-primary">KITA</span></h2>
                            <p className="text-foreground/40 text-xl font-bold max-w-md">Lebih dari sekadar kopi, kami menciptakan suasana. Tempat persembunyian bagi indera di tengah hiruk-pikuk kota.</p>
                        </div>
                        <div className="space-y-12">
                            {[
                                { title: 'Rumah Sangrai', desc: 'Saksikan keajaiban proses sangrai di stasiun terbuka kami.', icon: Coffee },
                                { title: 'Bar Seduh', desc: 'Presisi penyeduhan yang disesuaikan dengan profil rasa unik Anda.', icon: Sparkles },
                                { title: 'Komunitas', desc: 'Lokakarya pilihan dan ruang kreatif bagi jiwa yang ingin tahu.', icon: MapPin }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-8 group">
                                    <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center shrink-0 border border-white/5 group-hover:border-primary/40 group-hover:bg-primary/10 transition-all duration-500">
                                        <item.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-2xl font-black tracking-tight">{item.title}</h4>
                                        <p className="text-foreground/40 leading-relaxed font-bold text-sm">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <footer className="py-32 border-t border-white/5 bg-background">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-20">
                    <div className="col-span-2 space-y-12">
                        <div className="flex items-center gap-4">
                            <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-primary/20 flex items-center justify-center bg-primary/5">
                                <Coffee className="w-6 h-6 text-primary" />
                            </div>
                            <span className="text-3xl font-black tracking-tighter">MIMI</span>
                        </div>
                        <p className="text-foreground/30 max-w-sm leading-relaxed font-bold text-lg">Menciptakan pengalaman kopi spesial sejak 2018. Ritual Anda, kami sempurnakan.</p>
                        <div className="flex gap-6">
                            {[Instagram, Twitter, Facebook].map((Icon, i) => (
                                <Link key={i} href="#" className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-primary hover:text-background transition-all duration-500">
                                    <Icon size={20} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-10">
                        <h5 className="font-black tracking-[0.3em] uppercase text-[10px] text-primary">Jelajahi</h5>
                        <ul className="space-y-5 text-sm font-black uppercase tracking-widest text-foreground/40">
                            <li className="hover:text-primary cursor-pointer transition-colors">Menu</li>
                            <li className="hover:text-primary cursor-pointer transition-colors">Sangrai</li>
                            <li className="hover:text-primary cursor-pointer transition-colors">Cerita Kami</li>
                            <li className="hover:text-primary cursor-pointer transition-colors">Lokasi</li>
                        </ul>
                    </div>

                    <div className="space-y-10">
                        <h5 className="font-black tracking-[0.3em] uppercase text-[10px] text-primary">Kunjungi Kami</h5>
                        <ul className="space-y-5 text-sm font-bold text-foreground/40 leading-relaxed">
                            <li className="flex gap-4"><MapPin size={20} className="text-primary shrink-0" /> Jl. Kopi No. 99, Jakarta</li>
                            <li className="flex gap-4"><Clock size={20} className="text-primary shrink-0" /> Buka: 07:00 — 22:00</li>
                            <li className="pt-6 font-black text-foreground text-xl tracking-tighter hover:text-primary transition-colors cursor-pointer underline decoration-primary/20 underline-offset-8">hello@mimi.coffee</li>
                        </ul>
                    </div>
                </div>
            </footer>

            <style jsx global>{`
                @keyframes reveal {
                    from { opacity: 0; transform: translateY(30px); filter: blur(20px); }
                    to { opacity: 1; transform: translateY(0); filter: blur(0); }
                }
                .animate-reveal { animation: reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                
                @keyframes slow-zoom {
                    from { transform: scale(1); }
                    to { transform: scale(1.15); }
                }
                .animate-slow-zoom { animation: slow-zoom 30s ease-in-out infinite alternate; }

                html { scroll-behavior: smooth; }
            `}</style>
        </div>
    )
}
