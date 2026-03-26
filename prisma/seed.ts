import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create Categories
  const categoryAccessories = await prisma.category.upsert({
    where: { slug: 'accessories' },
    update: {},
    create: {
      name: 'Accessories',
      slug: 'accessories',
      description: 'Personalized accessories like collars and tags for your furry friends.',
    },
  })

  const categoryMemorials = await prisma.category.upsert({
    where: { slug: 'memorials' },
    update: {},
    create: {
      name: 'Memorials & Keepsakes',
      slug: 'memorials',
      description: 'Beautiful keepsakes to remember your beloved pet forever.',
    },
  })

  console.log(`Created categories: ${categoryAccessories.name}, ${categoryMemorials.name}`)

  // Create Products

  // Accessories
  const collar = await prisma.product.upsert({
    where: { slug: 'engraved-pet-collar' },
    update: {},
    create: {
      name: 'Engraved Pet Collar',
      slug: 'engraved-pet-collar',
      description: "High-quality leather collar with personalized metal nameplate. Include your pet's name and phone number.",
      basePrice: 24.99,
      categoryId: categoryAccessories.id,
      isMemorial: false,
      requiresText: true,
      imageUrl: '/images/products/collar.jpg',
    },
  })

  const petBowl = await prisma.product.upsert({
    where: { slug: 'personalized-pet-bowl' },
    update: {},
    create: {
      name: 'Personalized Pet Bowl',
      slug: 'personalized-pet-bowl',
      description: "Ceramic pet bowl with your pet's name beautifully engraved.",
      basePrice: 19.99,
      categoryId: categoryAccessories.id,
      isMemorial: false,
      requiresText: true,
      imageUrl: '/images/products/bowl.jpg',
    },
  })

  const petTag = await prisma.product.upsert({
    where: { slug: 'pet-id-tag' },
    update: {},
    create: {
      name: 'Pet ID Tag',
      slug: 'pet-id-tag',
      description: 'Durable metal ID tag. Personalize with name and contact phone number.',
      basePrice: 12.99,
      categoryId: categoryAccessories.id,
      isMemorial: false,
      requiresText: true,
      imageUrl: '/images/products/tag.jpg',
    },
  })

  // Memorials
  const ledPlaque = await prisma.product.upsert({
    where: { slug: 'memorial-led-photo-plaque' },
    update: {},
    create: {
      name: 'Personalized Pet Memorial LED Photo Plaque',
      slug: 'memorial-led-photo-plaque',
      description: "A beautiful acrylic LED plaque with your pet's photo and custom message.",
      basePrice: 39.99,
      categoryId: categoryMemorials.id,
      isMemorial: true,
      requiresText: true,
      imageUrl: '/images/products/led-plaque.jpg',
      variants: {
        create: [
          { name: '4x6 inch', price: 39.99 },
          { name: '6x8 inch', price: 49.99 },
        ]
      }
    },
  })

  const crystalPortrait = await prisma.product.upsert({
    where: { slug: '3d-crystal-pet-portrait' },
    update: {},
    create: {
      name: '3D Crystal Pet Portrait',
      slug: '3d-crystal-pet-portrait',
      description: "Your pet's photo turned into a stunning 3D laser engraved crystal.",
      basePrice: 89.99,
      categoryId: categoryMemorials.id,
      isMemorial: true,
      requiresText: true,
      imageUrl: '/images/products/crystal.jpg',
    },
  })

  const pictureFrame = await prisma.product.upsert({
    where: { slug: 'personalized-memorial-frame' },
    update: {},
    create: {
      name: 'Personalized Memorial Pet Picture Frame',
      slug: 'personalized-memorial-frame',
      description: 'Wooden memorial frame for your favorite photo of your pet with engraved text.',
      basePrice: 29.99,
      categoryId: categoryMemorials.id,
      isMemorial: true,
      requiresText: true,
      imageUrl: '/images/products/frame.jpg',
    },
  })

  console.log('Database seeded successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
