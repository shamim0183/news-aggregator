const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    const articles = await prisma.article.findMany({
        select: { title: true, country: true },
        take: 10
    });
    console.log('Articles Sample:', articles);
}

check();
