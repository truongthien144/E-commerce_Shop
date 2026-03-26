import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";

export async function POST(request) {
    try {
        const { items, shippingInfo } = await request.json();

        if (!items || items.length === 0) {
            return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
        }

        const session = await getSession();
        const userId = session?.user?.id;
        const cookieStore = await cookies();
        let guestSessionId = cookieStore.get("guest_session")?.value;

        // Calculate total
        const totalAmount = items.reduce((total, item) => {
            const price = item.variant ? item.variant.price : item.product.basePrice;
            return total + (price * item.quantity);
        }, 0);

        // Create Order
        const order = await prisma.order.create({
            data: {
                userId,
                customerEmail: shippingInfo.email,
                shippingAddress: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.zipCode}, USA`,
                totalAmount,
                status: "paid", // Mock instant success
                items: {
                    create: items.map(item => ({
                        productId: item.productId || item.product.id,
                        productName: item.product.name,
                        variantName: item.variant?.name,
                        price: item.variant ? item.variant.price : item.product.basePrice,
                        quantity: item.quantity,
                        petName: item.personalization?.petName,
                        phoneNumber: item.personalization?.phoneNumber,
                        customText: item.personalization?.customText,
                        photoUrl: item.personalization?.photoUrl,
                    }))
                },
                payment: {
                    create: {
                        stripeId: `mock_pi_${uuidv4()}`,
                        amount: totalAmount,
                        status: "succeeded"
                    }
                }
            }
        });

        // Clear the cart
        if (userId) {
            await prisma.cart.deleteMany({ where: { userId } });
        } else if (guestSessionId) {
            await prisma.cart.deleteMany({ where: { sessionId: guestSessionId } });
        }

        const mockSessionId = `mock_cs_${uuidv4()}`;

        return NextResponse.json({ url: `/checkout/success?session_id=${mockSessionId}` });

    } catch (error) {
        console.error("Mock checkout error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
