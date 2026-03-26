import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({});

async function main() {
    console.log('Seeding database...');

    const categoryAccessories = await prisma.category.upsert({
        where: { slug: 'accessories' },
        update: {},
        create: {
            name: 'Accessories',
            slug: 'accessories',
            description: 'Personalized accessories like collars and tags for your furry friends.',
        },
    });

    const categoryMemorials = await prisma.category.upsert({
        where: { slug: 'memorials' },
        update: {},
        create: {
            name: 'Memorials & Keepsakes',
            slug: 'memorials',
            description: 'Beautiful keepsakes to remember your beloved pet forever.',
        },
    });

    console.log(`Created categories: ${categoryAccessories.name}, ${categoryMemorials.name}`);

    await prisma.product.upsert({
        where: { slug: 'Dog-Collar-Personalized' },
        update: {},
        create: {
            name: 'Personalized Dog Collar with Bow Tie',
            slug: 'Dog-Collar-Personalized',
            description: "High-quality leather collar with personalized metal nameplate. Include your pet's name and phone number.",
            basePrice: 18.95,
            categoryId: categoryAccessories.id,
            isMemorial: false,
            requiresText: true,
            imageUrl: '/products/Dog-Collar-Personalized/sample-1/sample-1.1.png',
        },
    });

    await prisma.product.upsert({
        where: { slug: 'Memorial-Pet-Collar-Sign' },
        update: {},
        create: {
            name: 'Personalized Pet Memorial Frame with Collar Holder',
            slug: 'Memorial-Pet-Collar-Sign',
            description: "A beautiful acrylic LED plaque with your pet's photo and custom message.",
            basePrice: 25.95,
            categoryId: categoryMemorials.id,
            isMemorial: true,
            requiresText: true,
            imageUrl: '/products/Memorial-Pet-Collar-Sign/sample-1/sample-1.1.png',
        },
    });

    await prisma.product.upsert({
        where: { slug: 'Personalized-3D-Crystal-Photo-Portrait' },
        update: {},
        create: {
            name: 'Personalized 3D Crystal Photo Portrait',
            slug: 'Personalized-3D-Crystal-Photo-Portrait',
            description: "Your pet's photo turned into a stunning 3D laser engraved crystal.",
            basePrice: 39.99,
            categoryId: categoryMemorials.id,
            isMemorial: true,
            requiresText: true,
            imageUrl: '/products/Personalized-3D-Crystal-Photo-Portrait/sample-1/sample-1.1.png',
        },
    });

    await prisma.product.upsert({
        where: { slug: 'Personalized-Pet-Memorial-Photo-Plaque' },
        update: {},
        create: {
            name: 'Personalized Pet Memorial Photo Plaque',
            slug: 'Personalized-Pet-Memorial-Photo-Plaque',
            description: 'Wooden memorial frame for your favorite photo of your pet with engraved text.',
            basePrice: 19.95,
            categoryId: categoryMemorials.id,
            isMemorial: true,
            requiresText: true,
            imageUrl: '/products/Personalized-Pet-Memorial-Photo-Plaque/sample-1/sample-1.1.png',
        },
    });

    await prisma.product.upsert({
        where: { slug: 'Customized-Stainless-Steel-Pet-ID-Tag' },
        update: {},
        create: {
            name: 'Customized Stainless Steel Pet ID Tag',
            slug: 'Customized-Stainless-Steel-Pet-ID-Tag',
            description: 'Durable, high-quality stainless steel pet ID tag with custom engraving to keep your pet safe.',
            basePrice: 8.95,
            categoryId: categoryAccessories.id,
            isMemorial: false,
            requiresText: true,
            imageUrl: '/products/Customized-Stainless-Steel-Pet-ID-Tag/sample-1/sample-1.1.jpg',
        },
    });

    await prisma.product.upsert({
        where: { slug: 'Personalized-Pet-Memorial-Photo-Night-Light' },
        update: {},
        create: {
            name: 'Personalized Pet Memorial Photo Night Light',
            slug: 'Personalized-Pet-Memorial-Photo-Night-Light',
            description: 'A comforting glow to remember your furry friend. Custom engraved with your pet\'s photo.',
            basePrice: 29.95,
            categoryId: categoryMemorials.id,
            isMemorial: true,
            requiresText: true,
            imageUrl: '/products/Personalized-Pet-Memorial-Photo-Night-Light/sample-1/sample-1.1.jpg',
        },
    });

    await prisma.product.upsert({
        where: { slug: 'Personalized-Wooden-Pet-Memorial-Frame' },
        update: {},
        create: {
            name: 'Personalized Wooden Pet Memorial Frame',
            slug: 'Personalized-Wooden-Pet-Memorial-Frame',
            description: 'Elegant crafted wooden frame with custom text to cherish your favorite memories of your pet.',
            basePrice: 15.95,
            categoryId: categoryMemorials.id,
            isMemorial: true,
            requiresText: true,
            imageUrl: '/products/Personalized-Wooden-Pet-Memorial-Frame/sample-1/sample-1.1.png',
        },
    });

    console.log('Database seeded successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
