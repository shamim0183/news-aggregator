import { prisma } from '@/lib/prisma';

const API_KEY = process.env.NEWSDATA_API_KEY;
const BASE_URL = 'https://newsdata.io/api/1/news';

interface NewsDataArticle {
    article_id: string;
    title: string;
    link: string;
    keywords: string[] | null;
    creator: string[] | null;
    video_url: string | null;
    description: string | null;
    content: string | null;
    pubDate: string;
    image_url: string | null;
    source_id: string;
    source_priority: number;
    country: string[];
    category: string[];
    language: string;
}

interface NewsDataResponse {
    status: string;
    totalResults: number;
    results: NewsDataArticle[];
    nextPage: string | null;
}

interface FetchParams {
    q?: string;
    country?: string;
    category?: string;
    language?: string;
    page?: string;
}

export async function fetchFromNewsData(params: FetchParams = {}) {
    const searchParams = new URLSearchParams({
        apikey: API_KEY || '',
        ...(params.q && { q: params.q }),
        ...(params.country && { country: params.country }),
        ...(params.category && { category: params.category }),
        ...(params.language && { language: params.language }),
        ...(params.page && { page: params.page }),
    });

    try {
        console.log(`Fetching from NewsData.io: ${BASE_URL}?${searchParams.toString().replace(API_KEY || '', 'HIDDEN')}`);
        const response = await fetch(`${BASE_URL}?${searchParams.toString()}`);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`NewsData API Error: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const data: NewsDataResponse = await response.json();

        if (data.status !== 'success') {
            throw new Error(`NewsData API returned status: ${data.status}`);
        }

        return data;
    } catch (error) {
        console.error('Error fetching from NewsData.io:', error);
        throw error;
    }
}
