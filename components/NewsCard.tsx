'use client';

import Image from 'next/image';
import { formatRelativeTime } from '@/utils/formatDate';
import { CATEGORIES, DEFAULT_IMAGE } from '@/utils/constants';

// Define minimal Article interface matching what we need
interface Article {
    title: string;
    description: string | null;
    content: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: Date;
    sourceName: string;
    country: string | null;
}

interface NewsCardProps {
    article: Article;
}

// Validate image URL to avoid download issues
function isValidImageUrl(url: string | null): boolean {
    if (!url) return false;
    try {
        const urlObj = new URL(url);
        if (!urlObj.protocol.startsWith('http')) return false;
        if (url.includes('download') || url.includes('.bin')) return false;
        return true;
    } catch {
        return false;
    }
}

// Helper to convert country code to flag emoji
function getFlagEmoji(countryCode: string | null) {
    if (!countryCode) return null;
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
}

export default function NewsCard({ article }: NewsCardProps) {
    const category = CATEGORIES.find(cat =>
        article.title?.toLowerCase().includes(cat.value) ||
        article.description?.toLowerCase().includes(cat.value)
    ) || CATEGORIES[0];

    const imageUrl = isValidImageUrl(article.urlToImage) ? article.urlToImage! : DEFAULT_IMAGE;
    const description = article.description || article.content || 'No description available.';
    const truncatedDescription = description.length > 150
        ? description.substring(0, 150) + '...'
        : description;

    return (
        <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
        >
            <div className="h-full bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 hover:scale-[1.02]">
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-800">
                    <Image
                        src={imageUrl}
                        alt={article.title}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = DEFAULT_IMAGE;
                        }}
                    />

                    {/* Category Badge */}
                    <div className="absolute top-3 right-3">
                        <span className={`${category.color} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}>
                            {category.label}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5">
                    {/* Title */}
                    <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
                        {article.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                        {truncatedDescription}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                                {article.sourceName.charAt(0)}
                            </div>
                            <span className="text-gray-300 text-sm font-medium truncate max-w-[120px]">
                                {article.sourceName}
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            {article.country && (
                                <span className="text-xl" title={`Country: ${article.country.toUpperCase()}`}>
                                    {getFlagEmoji(article.country)}
                                </span>
                            )}
                            <span className="text-gray-500 text-xs">
                                {formatRelativeTime(article.publishedAt.toString())}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    );
}
