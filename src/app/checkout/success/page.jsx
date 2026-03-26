"use client"

import { useEffect, useState, useRef } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react"
import { useToast } from "@/components/shared/Toast"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart/CartContext"

export default function SuccessPage() {
    const searchParams = useSearchParams()
    const sessionId = searchParams.get("session_id")
    const { clearCart, isMounted } = useCart()
    const { addToast } = useToast()
    const hasProcessed = useRef(false)

    useEffect(() => {
        if (sessionId && isMounted && !hasProcessed.current) {
            hasProcessed.current = true
            clearCart()
            addToast("Woof! Your order was successful! We've begun processing your keepsakes.", "success")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sessionId, isMounted])

    if (!isMounted) return null

    return (
        <div className="container mx-auto px-4 py-20 text-center max-w-2xl">
            <div className="flex justify-center mb-8">
                <div className="rounded-full bg-green-500/10 p-6">
                    <CheckCircle2 className="h-16 w-16 text-green-600" />
                </div>
            </div>

            <h1 className="text-4xl font-bold mb-4 tracking-tight">Order Confirmed!</h1>
            <p className="text-xl text-muted-foreground mb-12">
                Thank you for your purchase. We&apos;ve sent a confirmation email to your inbox and we&apos;re getting your keepsakes ready.
            </p>

            <div className="bg-accent/20 rounded-2xl p-8 border border-accent/30 mb-12 text-left">
                <h3 className="font-bold text-lg mb-2">What happens next?</h3>
                <ul className="space-y-3 text-muted-foreground">
                    <li className="flex gap-3">
                        <span className="bg-primary text-primary-foreground h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</span>
                        <span>You'll receive an order confirmation email shortly.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="bg-primary text-primary-foreground h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</span>
                        <span>Our artisans will begin personalizing your items.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="bg-primary text-primary-foreground h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0">3</span>
                        <span>We&apos;ll notify you as soon as your order has shipped!</span>
                    </li>
                </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="gap-2 px-8 cursor-pointer">
                    <Link href="/products">
                        Shop More Products <ShoppingBag className="h-4 w-4" />
                    </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="gap-2 px-8 cursor-pointer">
                    <Link href="/">
                        Go to Homepage <ArrowRight className="h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
