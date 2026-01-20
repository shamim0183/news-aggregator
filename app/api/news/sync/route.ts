import { NextRequest, NextResponse } from 'next/server';
import { fetchAndStoreNews, fetchAndStoreSources } from '@/services/newsFetcher';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { countries, categories } = body;

        const results = {
            articlesStored: 0,
            sourcesStored: 0,
            errors: [] as string[],
        };

        // Sync sources first
        try {
            const sourceResult = await fetchAndStoreSources({});
            results.sourcesStored = sourceResult.sourcesStored;
        } catch (error: any) {
            results.errors.push(`Sources sync failed: ${error.message}`);
        }

        // Sync news for specified countries and categories
        // NewsData.io has a 200 request/day limit on free tier.
        // We must be conservative. Default to just US and top categories.
        const countriesToSync = countries || ['us'];
        const categoriesToSync = categories || ['business', 'technology', 'sports'];

        for (const country of countriesToSync) {
            for (const category of categoriesToSync) {
                try {
                    // pageSize doesn't work exact same way in NewsData free tier (fixed to 10 usually)
                    // but we pass it anyway.
                    const result = await fetchAndStoreNews({ country, category });
                    results.articlesStored += result.articlesStored;

                    // Add small delay to avoid hitting rate limits too fast if they exist per second
                    await new Promise(resolve => setTimeout(resolve, 1000));
                } catch (error: any) {
                    results.errors.push(`Failed ${country}/${category}: ${error.message}`);
                }
            }
        }

        return NextResponse.json({
            success: true,
            ...results,
        });
    } catch (error: any) {
        console.error('Error in /api/news/sync:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to sync news' },
            { status: 500 }
        );
    }
}
