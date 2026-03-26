import { NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request) {
    const body = await request.text();
    const sig = (await headers()).get("stripe-signature");

    let event;

    try {
        if (endpointSecret) {
            event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
        } else {
            // For development without webhook secret
            event = JSON.parse(body);
        }
    } catch (err) {
        console.error(`Webhook Error: ${err.message}`);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    // Handle the event
    if (event.type === "checkout.session.completed") {
        const session = event.data.object;

        // Update the pending order and payment status
        try {
            const payment = await prisma.payment.findUnique({
                where: { stripeId: session.id },
            });

            if (payment) {
                await prisma.payment.update({
                    where: { id: payment.id },
                    data: { status: "paid" },
                });

                await prisma.order.update({
                    where: { id: payment.orderId },
                    data: {
                        status: "paid",
                        customerEmail: session.customer_details.email, // Final email from Stripe
                    },
                });

                console.log(`Order ${payment.orderId} marked as paid.`);
            }
        } catch (error) {
            console.error("Error updating order via webhook:", error);
        }
    }

    return NextResponse.json({ received: true });
}
