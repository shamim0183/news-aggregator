const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const fs = require('fs');
const path = require('path');

// Load environment variables manually since we're not using dotenv/next env loader here
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    envContent.split('\n').forEach(line => {
        const [key, ...value] = line.split('=');
        if (key && value) {
            process.env[key.trim()] = value.join('=').trim().replace(/"/g, '');
        }
    });
}

async function main() {
    console.log('Initializing PrismaClient with Driver Adapter...');

    const connectionString = process.env.DATABASE_URL;
    console.log('Using connection string:', connectionString);

    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);

    const prisma = new PrismaClient({
        adapter,
        log: ['query', 'error', 'warn']
    });

    try {
        console.log('Connecting to database...');
        await prisma.$connect();
        console.log('Successfully connected to database!');

        const count = await prisma.article.count();
        console.log('Article count:', count);

        await prisma.$disconnect();
        console.log('Disconnected.');
    } catch (error) {
        console.error('Error connecting to database:', error);
        process.exit(1);
    }
}

main();
