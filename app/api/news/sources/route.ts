import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type Category = 'BUSINESS' | 'ENTERTAINMENT' | 'GENERAL' | 'HEALTH' | 'SCIENCE' | 'SPORTS' | 'TECHNOLOGY';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const country = searchParams.get('country');
        const category = searchParams.get('category') as Category | null;
        const language = searchParams.get('language');

        const where: any = {};
        if (country) where.country = country;
        if (category) where.category = category;
        if (language) where.language = language;

        const sources = await prisma.source.findMany({
            where,
            orderBy: { name: 'asc' },
        });

        return NextResponse.json({
            sources,
            total: sources.length,
        });
    } catch (error: any) {
        console.error('Error in /api/news/sources:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch sources' },
            { status: 500 }
        );
    }
}
