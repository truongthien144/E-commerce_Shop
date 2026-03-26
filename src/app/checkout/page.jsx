"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/components/cart/CartContext"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function CheckoutPage() {
    const { items, cartTotal, user, isMounted } = useCart()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [shippingInfo, setShippingInfo] = useState({
        fullName: user?.name || "",
        email: user?.email || "",
        address: "",
        city: "",
        zipCode: "",
        country: "USA",
    })

    // Prevent accessing checkout with empty cart
    useEffect(() => {
        if (isMounted && items.length === 0) {
            router.push("/cart")
        }
    }, [items, isMounted, router])

    const handleCheckout = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch("/api/checkout/mock", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items, shippingInfo }),
            })

            const data = await res.json()
            if (data.url) {
                toast.success("Payment successful! Your order has been placed.")
                window.location.href = data.url
            } else {
                toast.error("Checkout failed: " + data.error)
            }
        } catch (err) {
            console.error(err)
            toast.error("An unexpected error occurred")
        } finally {
            setLoading(false)
        }
    }

    if (!isMounted) return null

    return (
        <div className="container mx-auto px-4 py-10 lg:py-16">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Shipping Information</CardTitle>
                        </CardHeader>
                        <form onSubmit={handleCheckout}>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="fullName">Full Name</Label>
                                        <Input
                                            id="fullName"
                                            required
                                            value={shippingInfo.fullName}
                                            onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            value={shippingInfo.email}
                                            onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input
                                        id="address"
                                        required
                                        value={shippingInfo.address}
                                        onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="city">City</Label>
                                        <Input
                                            id="city"
                                            required
                                            value={shippingInfo.city}
                                            onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="zipCode">Postal Code</Label>
                                        <Input
                                            id="zipCode"
                                            required
                                            value={shippingInfo.zipCode}
                                            onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" size="lg" className="w-full mt-6 cursor-pointer" disabled={loading}>
                                    {loading ? "Preparing Payment..." : `Pay $${cartTotal.toFixed(2)}`}
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>

                <div>
                    <Card className="h-fit">
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {items.map((item) => (
                                <div key={item.cartId} className="flex justify-between text-sm">
                                    <div className="flex-1">
                                        <p className="font-medium">{item.product.name} x {item.quantity}</p>
                                        {item.variant && <p className="text-xs text-muted-foreground">{item.variant.name}</p>}
                                    </div>
                                    <span className="font-medium">
                                        ${((item.variant ? item.variant.price : item.product.basePrice) * item.quantity).toFixed(2)}
                                    </span>
                                </div>
                            ))}
                            <Separator />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span className="text-primary">${cartTotal.toFixed(2)}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
