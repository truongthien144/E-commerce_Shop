"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart/CartContext"

export default function OrdersPage() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const { user } = useCart()

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch("/api/orders")
                if (res.ok) {
                    const data = await res.json()
                    setOrders(data.orders)
                }
            } catch (err) {
                console.error("Failed to fetch orders:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchOrders()
    }, [])

    if (loading) return <div className="container py-20 text-center text-muted-foreground">Loading your orders...</div>

    return (
        <div className="container mx-auto px-4 py-8 lg:py-12 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8 text-foreground">My Orders</h1>

            {orders.length === 0 ? (
                <div className="text-center py-20 bg-accent/20 rounded-2xl border border-dashed border-accent">
                    <p className="text-muted-foreground">You haven&apos;t placed any orders yet.</p>
                </div>
            ) : (
                <div className="space-y-8">
                    {orders.map((order) => (
                        <Card key={order.id} className="overflow-hidden">
                            <CardHeader className="bg-accent/30 flex flex-row items-center justify-between py-4">
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Order Placed</p>
                                    <p className="text-sm font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Total</p>
                                    <p className="text-sm font-bold text-primary">${order.totalAmount.toFixed(2)}</p>
                                </div>
                                <div>
                                    <Badge variant={order.status === 'paid' ? 'success' : 'secondary'} className="capitalize">
                                        {order.status}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="p-6 space-y-4">
                                    {order.items.map((item) => {
                                        const displayImage = item.photoUrl || item.productImage;
                                        return (
                                            <div key={item.id} className="flex items-start gap-4">
                                                <div className="bg-accent rounded h-16 w-16 flex items-center justify-center shrink-0 overflow-hidden relative">
                                                    {displayImage ? (
                                                        <img src={displayImage} alt={item.productName} className="object-cover h-full w-full rounded" />
                                                    ) : (
                                                        <span className="text-[10px] text-muted-foreground text-center">No Photo</span>
                                                    )}
                                                </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between">
                                                    <h4 className="font-bold text-foreground leading-tight">{item.productName}</h4>
                                                    <span className="text-sm font-medium">${item.price.toFixed(2)}</span>
                                                </div>
                                                {item.variantName && <p className="text-xs text-muted-foreground mt-0.5">Size: {item.variantName}</p>}
                                                {item.petName && (
                                                    <div className="text-xs text-muted-foreground bg-accent/30 px-2 py-1 rounded mt-2 inline-block">
                                                        Pet: <span className="text-foreground font-medium">{item.petName}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                                    <Separator />
                                    <div className="pt-2 text-[10px] text-muted-foreground font-medium">
                                        ORDER ID: {order.id.toUpperCase()}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
