import { Country, Category } from '@/types/news';

// Popular countries for news
export const COUNTRIES: Country[] = [
    { code: 'us', name: 'United States', flag: '🇺🇸' },
    { code: 'gb', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'ca', name: 'Canada', flag: '🇨🇦' },
    { code: 'au', name: 'Australia', flag: '🇦🇺' },
    { code: 'in', name: 'India', flag: '🇮🇳' },
    { code: 'de', name: 'Germany', flag: '🇩🇪' },
    { code: 'fr', name: 'France', flag: '🇫🇷' },
    { code: 'it', name: 'Italy', flag: '🇮🇹' },
    { code: 'jp', name: 'Japan', flag: '🇯🇵' },
    { code: 'kr', name: 'South Korea', flag: '🇰🇷' },
    { code: 'cn', name: 'China', flag: '🇨🇳' },
    { code: 'br', name: 'Brazil', flag: '🇧🇷' },
    { code: 'mx', name: 'Mexico', flag: '🇲🇽' },
    { code: 'ar', name: 'Argentina', flag: '🇦🇷' },
    { code: 'za', name: 'South Africa', flag: '🇿🇦' },
    { code: 'ae', name: 'UAE', flag: '🇦🇪' },
    { code: 'sa', name: 'Saudi Arabia', flag: '🇸🇦' },
    { code: 'nl', name: 'Netherlands', flag: '🇳🇱' },
    { code: 'se', name: 'Sweden', flag: '🇸🇪' },
    { code: 'no', name: 'Norway', flag: '🇳🇴' },
    { code: 'ch', name: 'Switzerland', flag: '🇨🇭' },
    { code: 'be', name: 'Belgium', flag: '🇧🇪' },
    { code: 'pl', name: 'Poland', flag: '🇵🇱' },
    { code: 'tr', name: 'Turkey', flag: '🇹🇷' },
    { code: 'ru', name: 'Russia', flag: '🇷🇺' },
];

export const CATEGORIES: { value: Category; label: string; color: string }[] = [
    { value: 'general', label: 'General', color: 'bg-gradient-to-r from-violet-500 to-purple-500' },
    { value: 'business', label: 'Business', color: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
    { value: 'technology', label: 'Technology', color: 'bg-gradient-to-r from-emerald-500 to-teal-500' },
    { value: 'entertainment', label: 'Entertainment', color: 'bg-gradient-to-r from-pink-500 to-rose-500' },
    { value: 'sports', label: 'Sports', color: 'bg-gradient-to-r from-orange-500 to-amber-500' },
    { value: 'science', label: 'Science', color: 'bg-gradient-to-r from-indigo-500 to-blue-500' },
    { value: 'health', label: 'Health', color: 'bg-gradient-to-r from-green-500 to-emerald-500' },
];

export const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80';

export const LANGUAGES = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'ar', name: 'Arabic' },
    { code: 'zh', name: 'Chinese' },
    { code: 'nl', name: 'Dutch' },
];
