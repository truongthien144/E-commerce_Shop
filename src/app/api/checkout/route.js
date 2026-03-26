import { NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
    try {
        const session = await getSession();
        const { items, shippingInfo } = await request.json();

        if (!items || items.length === 0) {
            return NextResponse.json({ error: "No items in cart" }, { status: 400 });
        }

        // Prepare line items for Stripe
        const lineItems = items.map((item) => {
            const price = item.variant ? item.variant.price : item.product.basePrice;
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.product.name,
                        description: item.variant ? `Variant: ${item.variant.name}` : undefined,
                        images: item.product.imageUrl ? [item.product.imageUrl] : [],
                    },
                    unit_amount: Math.round(price * 100),
                },
                quantity: item.quantity,
            };
        });

        // Create Stripe checkout session
        const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
            customer_email: session?.user?.email || undefined,
            metadata: {
                userId: session?.user?.id || "guest",
                // Storing details for the webhook to create the order
                // We might need to store this in a temporary place or just use metadata if it fits
                // Metadata is limited to 50 keys and 500 chars per value.
                // For complex order data, we'll store a "pending order" in DB first.
            },
        });

        // Create a pending order in DB to store personalization and shipping info
        const pendingOrder = await prisma.order.create({
            data: {
                userId: session?.user?.id || null,
                customerEmail: session?.user?.email || "guest@example.com", // Will update from Stripe
                shippingAddress: JSON.stringify(shippingInfo),
                totalAmount: items.reduce((total, item) => {
                    const price = item.variant ? item.variant.price : (item.product.basePrice || 0);
                    return total + price * item.quantity;
                }, 0),
                status: "pending",
                payment: {
                    create: {
                        stripeId: checkoutSession.id,
                        amount: items.reduce((total, item) => {
                            const p = item.variant ? item.variant.price : item.product.basePrice;
                            return total + p * item.quantity;
                        }, 0),
                        status: "unpaid",
                    }
                },
                items: {
                    create: items.map(item => ({
                        productId: item.product.id,
                        productName: item.product.name,
                        variantName: item.variant?.name || null,
                        price: item.variant ? item.variant.price : item.product.basePrice,
                        quantity: item.quantity,
                        petName: item.personalization?.petName,
                        phoneNumber: item.personalization?.phoneNumber,
                        customText: item.personalization?.customText,
                        photoUrl: item.personalization?.photoUrl,
                    }))
                }
            }
        });

        return NextResponse.json({ id: checkoutSession.id, url: checkoutSession.url });
    } catch (error) {
        console.error("Stripe/Checkout session error details:", {
            message: error.message,
            stack: error.stack,
            envBaseUrl: process.env.NEXT_PUBLIC_BASE_URL,
            stripeKeyExists: !!process.env.STRIPE_SECRET_KEY
        });

        return new Response(JSON.stringify({
            error: "Failed to create checkout session",
            message: error.message,
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
