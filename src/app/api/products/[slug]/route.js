import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
    try {
        const resolvedParams = await params;
        const { slug } = resolvedParams;

        const product = await prisma.product.findUnique({
            where: { slug: slug },
            include: {
                category: true,
                variants: true,
            },
        });

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching product' }, { status: 500 });
    }
}
