import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const categoriesCount = await prisma.category.count();
        if (categoriesCount > 0) {
            return NextResponse.json({ message: 'Database already seeded' });
        }

        const accessories = await prisma.category.create({
            data: {
                name: 'Accessories',
                slug: 'accessories',
                description: 'Personalized collars, tags, and daily essentials',
            },
        });

        const memorials = await prisma.category.create({
            data: {
                name: 'Memorials',
                slug: 'memorials',
                description: 'Heartfelt keepsakes to remember your beloved friends',
            },
        });

        await prisma.product.create({
            data: {
                name: 'Custom Engraved Leather Collar',
                slug: 'custom-leather-collar',
                description: 'Premium handcrafted leather collar with your pet\'s name and your phone number engraved directly onto the buckle.',
                basePrice: 29.99,
                categoryId: accessories.id,
                requiresText: true,
                variants: {
                    create: [
                        { name: 'Small', price: 29.99 },
                        { name: 'Medium', price: 34.99 },
                        { name: 'Large', price: 39.99 },
                    ],
                },
            },
        });

        await prisma.product.create({
            data: {
                name: 'Rainbow Bridge Memorial Stone',
                slug: 'rainbow-bridge-stone',
                description: 'A beautiful weather-resistant resin stone engraved with your pet\'s name and a custom message.',
                basePrice: 45.00,
                categoryId: memorials.id,
                isMemorial: true,
                requiresText: true,
            },
        });

        return NextResponse.json({ message: 'Database seeded successfully' });
    } catch (error) {
        console.error('Seed error:', error);
        return NextResponse.json({ error: 'Error seeding database' }, { status: 500 });
    }
}
