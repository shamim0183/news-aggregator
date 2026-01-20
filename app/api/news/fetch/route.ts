import { NextRequest, NextResponse } from 'next/server';
import { fetchAndStoreNews } from '@/services/newsFetcher';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { country, category, sources, q, pageSize } = body;

        const result = await fetchAndStoreNews({
            country,
            category,
            sources,
            q,
            pageSize,
        });

        return NextResponse.json(result);
    } catch (error: any) {
        console.error('Error in /api/news/fetch:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch and store news' },
            { status: 500 }
        );
    }
}
