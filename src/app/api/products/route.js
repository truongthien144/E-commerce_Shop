import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');

    try {
        const products = await prisma.product.findMany({
            where: categoryId ? { categoryId } : undefined,
            include: {
                category: true,
                variants: true,
            },
        });

        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
    }
}
