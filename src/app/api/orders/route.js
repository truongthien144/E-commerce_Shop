import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function GET() {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
        where: { userId: session.user.id },
        include: {
            items: true,
            payment: true,
        },
        orderBy: { createdAt: "desc" },
    });

    const productIds = orders.flatMap(order => order.items.map(item => item.productId));
    const products = await prisma.product.findMany({
        where: { id: { in: productIds } },
        select: { id: true, imageUrl: true }
    });
    
    const productMap = products.reduce((acc, p) => ({ ...acc, [p.id]: p.imageUrl }), {});

    const mappedOrders = orders.map(order => ({
        ...order,
        items: order.items.map(item => ({
            ...item,
            productImage: productMap[item.productId] || null
        }))
    }));

    return NextResponse.json({ orders: mappedOrders });
}
