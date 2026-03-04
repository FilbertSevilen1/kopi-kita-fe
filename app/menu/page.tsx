"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Coffee, ArrowLeft, Loader2, Sparkles, ChevronRight } from 'lucide-react'
import { Header } from '@/components/header'

interface Product {
    id: string
    name: string
    price: number
    description: string
    category: string
    image: string
}

export default function MenuPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [activeCategory, setActiveCategory] = useState('All')

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products')
                const data = await response.json()
                setProducts(data)
            } catch (error) {
                console.error('Error fetching products:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))]
    const filteredProducts = activeCategory === 'All'
        ? products
        : products.filter(p => p.category === activeCategory)

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
            <Header />

            <main className="pt-48 pb-32 px-6 max-w-7xl mx-auto">
                <div className="flex flex-col items-center text-center space-y-8 mb-32">
                    <div className="inline-flex items-center gap-3 px-6 py-2 rounded-2xl bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-2xl">
                        <Sparkles className="w-4 h-4" />
                        <span>Kesempurnaan Dalam Seduhan</span>
                    </div>
                    <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none bg-gradient-to-b from-foreground to-foreground/20 bg-clip-text text-transparent">
                        DAFTAR MENU.
                    </h1>
                    <p className="text-foreground/40 text-xl font-bold max-w-xl tracking-tight leading-relaxed">
                        Pilihan kurasi dari biji kopi single-origin terbaik dan racikan artisanal yang istimewa.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-6 mb-24">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-10 py-4 rounded-3xl text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-700 border active:scale-95 ${activeCategory === cat
                                ? 'bg-primary text-background border-primary shadow-[0_20px_40px_rgba(var(--primary),0.3)] scale-105'
                                : 'bg-white/[0.03] text-foreground/30 border-white/5 hover:border-primary/40 hover:text-primary hover:bg-white/[0.05]'
                                }`}
                        >
                            {cat === 'All' ? 'Semua' : cat}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40 gap-8">
                        <div className="relative">
                            <Loader2 className="w-16 h-16 text-primary animate-spin opacity-20" />
                            <Coffee className="w-8 h-8 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/40">Menyiapkan yang terbaik...</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="group flex flex-col bg-white/[0.02] border border-white/5 rounded-[4rem] overflow-hidden hover:border-primary/20 transition-all duration-1000 hover:-translate-y-4 shadow-2xl">
                                <div className="relative aspect-[4/5] overflow-hidden">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 opacity-80 group-hover:opacity-100 grayscale-[0.5] group-hover:grayscale-0"
                                    />
                                    <div className="absolute top-10 right-10">
                                        <div className="px-6 py-2 rounded-2xl bg-background/80 backdrop-blur-3xl border border-white/10 text-[9px] font-black uppercase tracking-[0.3em] text-primary">
                                            {product.category}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-12 space-y-8 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start gap-4">
                                        <h3 className="text-4xl font-black tracking-tighter leading-none group-hover:text-primary transition-colors duration-500">{product.name}</h3>
                                        <span className="text-2xl font-black tracking-tight text-primary">Rp {(product.price * 10).toFixed(3)}</span>
                                    </div>
                                    <p className="text-foreground/30 font-bold text-sm leading-relaxed flex-1 italic tracking-tight">
                                        "{product.description}"
                                    </p>
                                    <Button size="lg" className="w-full relative group/btn overflow-hidden rounded-3xl bg-white/[0.03] border-white/5 text-foreground/40 hover:bg-primary hover:text-background hover:border-transparent transition-all duration-700">
                                        <span className="relative z-10 flex items-center gap-3">
                                            Tambah ke Ritual
                                            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

        </div>
    )
}
