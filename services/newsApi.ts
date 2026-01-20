import { TopHeadlinesResponse, SourcesResponse, Category, CountryCode, Language } from '@/types/news';

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

interface TopHeadlinesParams {
    country?: CountryCode;
    category?: Category;
    sources?: string;
    q?: string;
    language?: Language;
    pageSize?: number;
    page?: number;
}

interface SourcesParams {
    category?: Category;
    language?: Language;
    country?: CountryCode;
}

/**
 * Fetch top headlines from News API
 * Endpoint: /v2/top-headlines
 */
export async function getTopHeadlines(params: TopHeadlinesParams = {}): Promise<TopHeadlinesResponse> {
    // Check cache first
    const { getCachedData, setCachedData } = await import('@/utils/cache');
    const cacheKey = `headlines_${JSON.stringify(params)}`;
    const cached = getCachedData(cacheKey);

    if (cached) {
        return cached;
    }

    const queryParams = new URLSearchParams({
        apiKey: API_KEY || '',
        ...(params.country && { country: params.country }),
        ...(params.category && { category: params.category }),
        ...(params.sources && { sources: params.sources }),
        ...(params.q && { q: params.q }),
        ...(params.language && { language: params.language }),
        ...(params.pageSize && { pageSize: params.pageSize.toString() }),
        ...(params.page && { page: params.page.toString() }),
    });

    try {
        const response = await fetch(`${BASE_URL}/top-headlines?${queryParams}`);
        const data: TopHeadlinesResponse = await response.json();

        if (data.status === 'error') {
            console.error('News API Error:', data.message);
            throw new Error(data.message || 'Failed to fetch news');
        }

        // Cache the successful response
        setCachedData(cacheKey, data);
        return data;
    } catch (error) {
        console.error('Error fetching top headlines:', error);
        throw error;
    }
}

/**
 * Fetch available news sources from News API
 * Endpoint: /v2/top-headlines/sources
 */
export async function getSources(params: SourcesParams = {}): Promise<SourcesResponse> {
    // Check cache first
    const { getCachedData, setCachedData } = await import('@/utils/cache');
    const cacheKey = `sources_${JSON.stringify(params)}`;
    const cached = getCachedData(cacheKey);

    if (cached) {
        return cached;
    }

    const queryParams = new URLSearchParams({
        apiKey: API_KEY || '',
        ...(params.category && { category: params.category }),
        ...(params.language && { language: params.language }),
        ...(params.country && { country: params.country }),
    });

    try {
        const response = await fetch(`${BASE_URL}/top-headlines/sources?${queryParams}`);
        const data: SourcesResponse = await response.json();

        if (data.status === 'error') {
            console.error('News API Error:', data.message);
            throw new Error(data.message || 'Failed to fetch sources');
        }

        // Cache the successful response
        setCachedData(cacheKey, data);
        return data;
    } catch (error) {
        console.error('Error fetching sources:', error);
        throw error;
    }
}
