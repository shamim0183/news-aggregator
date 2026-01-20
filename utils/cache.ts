// Cache manager for News API responses
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

interface CacheEntry {
    data: any;
    timestamp: number;
}

export function getCachedData(key: string): any | null {
    if (typeof window === 'undefined') return null;

    try {
        const cached = localStorage.getItem(`news_cache_${key}`);
        if (!cached) return null;

        const entry: CacheEntry = JSON.parse(cached);
        const now = Date.now();

        // Check if cache is still valid
        if (now - entry.timestamp < CACHE_DURATION) {
            console.log('📦 Using cached data for:', key);
            return entry.data;
        } else {
            // Cache expired, remove it
            localStorage.removeItem(`news_cache_${key}`);
            return null;
        }
    } catch (error) {
        console.error('Cache read error:', error);
        return null;
    }
}

export function setCachedData(key: string, data: any): void {
    if (typeof window === 'undefined') return;

    try {
        const entry: CacheEntry = {
            data,
            timestamp: Date.now(),
        };
        localStorage.setItem(`news_cache_${key}`, JSON.stringify(entry));
        console.log('💾 Cached data for:', key);
    } catch (error) {
        console.error('Cache write error:', error);
    }
}

export function clearCache(): void {
    if (typeof window === 'undefined') return;

    try {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith('news_cache_')) {
                localStorage.removeItem(key);
            }
        });
        console.log('🗑️ Cache cleared');
    } catch (error) {
        console.error('Cache clear error:', error);
    }
}
