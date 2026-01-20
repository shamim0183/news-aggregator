// TypeScript types for News API

export interface NewsArticle {
    source: {
        id: string | null;
        name: string;
    };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface NewsSource {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface TopHeadlinesResponse {
    status: string;
    totalResults: number;
    articles: NewsArticle[];
    code?: string;
    message?: string;
}

export interface SourcesResponse {
    status: string;
    sources: NewsSource[];
    code?: string;
    message?: string;
}

export type Category =
    | 'business'
    | 'entertainment'
    | 'general'
    | 'health'
    | 'science'
    | 'sports'
    | 'technology';

export type Language =
    | 'ar' | 'de' | 'en' | 'es' | 'fr' | 'he' | 'it' | 'nl' | 'no'
    | 'pt' | 'ru' | 'sv' | 'ud' | 'zh';

export type CountryCode =
    | 'ae' | 'ar' | 'at' | 'au' | 'be' | 'bg' | 'br' | 'ca' | 'ch' | 'cn'
    | 'co' | 'cu' | 'cz' | 'de' | 'eg' | 'fr' | 'gb' | 'gr' | 'hk' | 'hu'
    | 'id' | 'ie' | 'il' | 'in' | 'it' | 'jp' | 'kr' | 'lt' | 'lv' | 'ma'
    | 'mx' | 'my' | 'ng' | 'nl' | 'no' | 'nz' | 'ph' | 'pl' | 'pt' | 'ro'
    | 'rs' | 'ru' | 'sa' | 'se' | 'sg' | 'si' | 'sk' | 'th' | 'tr' | 'tw'
    | 'ua' | 'us' | 've' | 'za';

export interface Country {
    code: CountryCode;
    name: string;
    flag: string;
}
