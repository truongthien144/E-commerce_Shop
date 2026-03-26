import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function GET() {
    const session = await getSession();
    if (!session) return NextResponse.json({ items: [] });

    const cart = await prisma.cart.findUnique({
        where: { userId: session.user.id },
        include: {
            items: {
                include: {
                    product: true,
                    variant: true,
                    personalization: true,
                },
            },
        },
    });

    if (!cart) return NextResponse.json({ items: [] });

    // Map to the frontend format if needed
    const formattedItems = cart.items.map((item) => ({
        cartId: item.id,
        productId: item.productId,
        product: item.product,
        variantId: item.variantId,
        variant: item.variant,
        quantity: item.quantity,
        personalization: item.personalization,
    }));

    return NextResponse.json({ items: formattedItems });
}

export async function POST(request) {
    const session = await getSession();
    if (!session) return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

    const { items } = await request.json();

    // Create or update cart for user
    const cart = await prisma.cart.upsert({
        where: { userId: session.user.id },
        update: {},
        create: { userId: session.user.id },
    });

    // Simple sync strategy: Clear and re-add for the thesis demo simplicity
    // More robust: Diff items.
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

    for (const item of items) {
        await prisma.cartItem.create({
            data: {
                cartId: cart.id,
                productId: item.product.id,
                variantId: item.variant?.id || null,
                quantity: item.quantity,
                personalization: item.personalization ? {
                    create: {
                        petName: item.personalization.petName,
                        phoneNumber: item.personalization.phoneNumber,
                        customText: item.personalization.customText,
                        photoUrl: item.personalization.photoUrl,
                    }
                } : undefined,
            },
        });
    }

    return NextResponse.json({ message: "Cart synced successfully" });
}
