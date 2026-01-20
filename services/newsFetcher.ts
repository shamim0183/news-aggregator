import { prisma } from '@/lib/prisma';
import { fetchFromNewsData } from './newsDataService';

type Category = 'BUSINESS' | 'ENTERTAINMENT' | 'GENERAL' | 'HEALTH' | 'SCIENCE' | 'SPORTS' | 'TECHNOLOGY';

interface FetchNewsParams {
    country?: string;
    category?: string;
    sources?: string;
    q?: string;
    pageSize?: number;
}

/**
 * Fetch news from NewsData.io and store in database
 */
export async function fetchAndStoreNews(params: FetchNewsParams = {}) {
    try {
        const data = await fetchFromNewsData({
            q: params.q,
            country: params.country,
            category: params.category?.toLowerCase(),
            // newsdata.io pagination uses 'page' cursor, but we'll fetch just one page for sync
        });

        const articles = data.results || [];
        let storedCount = 0;
        let duplicateCount = 0;

        for (const article of articles) {
            try {
                // Check if article already exists using the unique link/url
                const existing = await prisma.article.findUnique({
                    where: { url: article.link },
                });

                if (existing) {
                    duplicateCount++;
                    continue;
                }

                // Map category string to enum
                const categoryMap: Record<string, Category> = {
                    business: 'BUSINESS',
                    entertainment: 'ENTERTAINMENT',
                    other: 'GENERAL',
                    top: 'GENERAL',
                    world: 'GENERAL',
                    politics: 'GENERAL',
                    health: 'HEALTH',
                    science: 'SCIENCE',
                    sports: 'SPORTS',
                    technology: 'TECHNOLOGY',
                    tech: 'TECHNOLOGY',
                };

                // NewsData returns array of categories. Use first valid one.
                let mappedCategory: Category | null = null;
                if (article.category && article.category.length > 0) {
                    for (const cat of article.category) {
                        const lowerCat = cat.toLowerCase();
                        if (categoryMap[lowerCat]) {
                            mappedCategory = categoryMap[lowerCat];
                            break;
                        }
                    }
                }

                // Fallback if no category matches
                if (!mappedCategory && params.category) {
                    const requestedCat = params.category.toLowerCase();
                    if (categoryMap[requestedCat]) {
                        mappedCategory = categoryMap[requestedCat];
                    }
                }

                // Robust date parsing (handle "YYYY-MM-DD HH:mm:ss" from NewsData)
                let publishedAt = new Date();
                if (article.pubDate) {
                    // NewsData format: "2026-01-19 21:17:00"
                    // Safest cross-platform fix is to strictly format it to ISO "2026-01-19T21:17:00"
                    // IF it doesn't already have T or Z.
                    let dateStr = article.pubDate;
                    if (!dateStr.includes('T') && dateStr.includes(' ')) {
                        dateStr = dateStr.replace(' ', 'T');
                    }

                    const parsed = new Date(dateStr);
                    if (!isNaN(parsed.getTime())) {
                        publishedAt = parsed;
                    }
                }

                // Language mapping (NewsData returns full name "english")
                let language = 'en';
                if (article.language) {
                    const lang = article.language.toLowerCase();
                    if (lang.includes('english')) language = 'en';
                    else if (lang.includes('spanish')) language = 'es';
                    else if (lang.includes('french')) language = 'fr';
                    else if (lang.length === 2) language = lang;
                }

                // Country mapping
                let countryCode = params.country || null;
                if (article.country && article.country.length > 0) {
                    const countryName = article.country[0].toLowerCase();
                    if (countryName.includes('united states')) countryCode = 'us';
                    else if (countryName.includes('united kingdom')) countryCode = 'gb';
                    else if (countryName === 'india') countryCode = 'in';
                    else if (countryName === 'canada') countryCode = 'ca';
                    else if (countryName === 'australia') countryCode = 'au';
                    else if (params.country) countryCode = params.country;
                    else countryCode = countryName.substring(0, 2);
                }

                // Store in database
                await prisma.article.create({
                    data: {
                        title: article.title || 'Untitled Article', // Prevent null title constraint error
                        description: article.description || article.content?.slice(0, 200) || '',
                        content: article.content,
                        url: article.link,
                        urlToImage: article.image_url,
                        publishedAt: publishedAt,
                        author: article.creator ? article.creator.join(', ') : null,
                        sourceId: article.source_id || 'newsdata',
                        sourceName: article.source_id || 'NewsData',
                        category: mappedCategory,
                        country: countryCode,
                        language: language,
                        status: 'PUBLISHED',
                    },
                });

                storedCount++;
            } catch (error) {
                console.error('Error storing article:', article.link, error);
            }
        }

        return {
            success: true,
            articlesStored: storedCount,
            duplicatesSkipped: duplicateCount,
            totalFetched: articles.length,
        };
    } catch (error: any) {
        console.error('Error in fetchAndStoreNews:', error);
        throw error;
    }
}

/**
 * Fetch and store news sources (NewsData.io doesn't expose a clean sources endpoint in free tier like NewsAPI)
 * We will skip this or implement a dummy one, as NewsData sends source info with articles.
 * For now, we'll keep it empty or remove usage. 
 * Actually, let's just make it return empty strict success to not break existing calls.
 */
export async function fetchAndStoreSources(_params: { country?: string; category?: string; language?: string } = {}) {
    // NewsData.io free tier doesn't support separate sources endpoint easily.
    // We capture sources dynamically when fetching articles.
    return {
        success: true,
        sourcesStored: 0,
        totalFetched: 0
    };
}
