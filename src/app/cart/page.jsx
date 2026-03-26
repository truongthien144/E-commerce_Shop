"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartContext";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartPage() {
    const { items, updateQuantity, removeItem, cartTotal, isMounted } = useCart();
    const router = useRouter();

    if (!isMounted) return null;

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-6 sm:mb-8">Shopping Cart</h1>

            {items.length === 0 ? (
                <div className="bg-muted/30 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
                    <div className="text-muted-foreground mb-6">
                        <svg
                            className="mx-auto h-24 w-24 opacity-20"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold mb-2">Your cart is empty</h2>
                    <p className="text-muted-foreground mb-8">Looks like you haven't added any keepsakes yet.</p>
                    <Link href="/products">
                        <Button size="lg" className="rounded-full cursor-pointer">Start Shopping</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 space-y-6">
                        {items.map((item) => {
                            const price = item.variant ? item.variant.price : item.product.basePrice;

                            const displayImage = item.personalization?.photoUrl || item.product?.imageUrl;

                            return (
                                <div key={item.cartId} className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 border rounded-2xl bg-card transition-shadow hover:shadow-sm">
                                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-muted rounded-xl flex items-center justify-center shrink-0 overflow-hidden relative">
                                        {displayImage ? (
                                            <img src={displayImage} alt={item.product?.name || "Product"} className="object-cover w-full h-full" />
                                        ) : (
                                            <span className="text-xs text-muted-foreground">No Image</span>
                                        )}
                                    </div>

                                    <div className="flex-1 flex flex-col">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <Link href={`/products/${item.product.slug}`} className="font-bold text-base sm:text-lg hover:text-primary transition-colors">
                                                    {item.product.name}
                                                </Link>
                                                {item.variant && (
                                                    <p className="text-sm text-muted-foreground mt-1">Variant: {item.variant.name}</p>
                                                )}
                                            </div>
                                            <span className="font-bold whitespace-nowrap ml-4">${price.toFixed(2)}</span>
                                        </div>

                                        {item.personalization && (Object.keys(item.personalization).length > 0) && (
                                            <div className="bg-muted/50 rounded-lg p-3 mt-2 mb-4 text-sm text-muted-foreground space-y-1">
                                                {item.personalization.petName && <p><strong className="text-foreground">Pet:</strong> {item.personalization.petName}</p>}
                                                {item.personalization.phoneNumber && <p><strong className="text-foreground">Phone:</strong> {item.personalization.phoneNumber}</p>}
                                                {item.personalization.customText && <p><strong className="text-foreground">Message:</strong> "{item.personalization.customText}"</p>}
                                                {item.personalization.photoUrl && <p><strong className="text-foreground">Photo:</strong> Attached</p>}
                                            </div>
                                        )}

                                        <div className="mt-auto flex items-center justify-between pt-4">
                                            <div className="flex items-center border rounded-lg overflow-hidden bg-background">
                                                <button
                                                    onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                                                    className="px-3 py-1 hover:bg-muted transition-colors disabled:opacity-50"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </button>
                                                <span className="px-4 py-1 font-medium">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                                                    className="px-3 py-1 hover:bg-muted transition-colors"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.cartId)}
                                                className="text-muted-foreground cursor-pointer hover:text-destructive flex items-center text-sm font-medium transition-colors"
                                            >
                                                <Trash2 className="h-4 w-4 mr-1" /> Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="lg:col-span-1">
                        <div className="border rounded-2xl p-6 bg-card sticky top-24">
                            <h2 className="text-xl font-bold mb-6 pb-4 border-b">Order Summary</h2>

                            <div className="space-y-4 mb-6 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Subtotal ({items.reduce((acc, i) => acc + i.quantity, 0)} items)</span>
                                    <span className="font-medium">${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span className="font-medium">Free</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Taxes</span>
                                    <span className="font-medium">Calculated at checkout</span>
                                </div>
                            </div>

                            <div className="border-t pt-4 mb-8">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-lg">Total</span>
                                    <span className="font-bold text-2xl text-primary">${cartTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            <Button
                                size="lg"
                                className="w-full text-base flex items-center justify-center gap-2 cursor-pointer"
                                onClick={() => router.push('/checkout')}
                            >
                                Proceed to Checkout <ArrowRight className="h-4 w-4" />
                            </Button>

                            <p className="text-xs text-center text-muted-foreground mt-4">
                                Secure checkout powered by Stripe
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
