import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Define types locally/loosely to avoid runtime import issues with Prisma 7
type Category = 'BUSINESS' | 'ENTERTAINMENT' | 'GENERAL' | 'HEALTH' | 'SCIENCE' | 'SPORTS' | 'TECHNOLOGY';
type Status = 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const category = searchParams.get('category') as Category | null;
        const country = searchParams.get('country');
        const language = searchParams.get('language');
        const sources = searchParams.get('sources');
        const status = searchParams.get('status') as Status | null;
        const fromDate = searchParams.get('fromDate');
        const toDate = searchParams.get('toDate');
        const search = searchParams.get('search');
        const page = parseInt(searchParams.get('page') || '1');
        const pageSize = parseInt(searchParams.get('pageSize') || '20');

        // Build filter object
        const where: any = {};

        if (category) where.category = category;
        if (country) where.country = country;
        if (language) where.language = language;
        if (status) where.status = status;
        if (sources) {
            where.sourceId = { in: sources.split(',') };
        }
        if (fromDate || toDate) {
            where.publishedAt = {};
            if (fromDate) where.publishedAt.gte = new Date(fromDate);
            if (toDate) where.publishedAt.lte = new Date(toDate);
        }
        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
            ];
        }

        // Get total count
        const total = await prisma.article.count({ where });

        // Get paginated articles
        const articles = await prisma.article.findMany({
            where,
            orderBy: { publishedAt: 'desc' },
            skip: (page - 1) * pageSize,
            take: pageSize,
        });

        return NextResponse.json({
            articles,
            total,
            page,
            pageSize,
            totalPages: Math.ceil(total / pageSize),
        });
    } catch (error: any) {
        console.error('Error in /api/news:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch news' },
            { status: 500 }
        );
    }
}
