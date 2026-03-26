const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const password = await bcrypt.hash('password123', 10);

    const users = [
        {
            name: 'Test Member',
            email: 'test@example.com',
            password: password,
        },
        {
            name: 'Admin User',
            email: 'admin@pawlio.com',
            password: password,
        },
        {
            name: 'Thuan User',
            email: 'thuan@example.com',
            password: password,
        }
    ];

    console.log('Seeding users...');

    for (const user of users) {
        await prisma.user.upsert({
            where: { email: user.email },
            update: {},
            create: user,
        });
        console.log(`- ${user.email}`);
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
