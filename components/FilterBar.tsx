'use client';

import { Category } from '@/types/news';
import { CATEGORIES } from '@/utils/constants';
import { Search } from 'lucide-react';

interface FilterBarProps {
    selectedCategory: Category | 'all';
    onCategoryChange: (category: Category | 'all') => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

export default function FilterBar({
    selectedCategory,
    onCategoryChange,
    searchQuery,
    onSearchChange,
}: FilterBarProps) {
    return (
        <div className="w-full space-y-4">
            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Search news..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all"
                />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => onCategoryChange('all')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === 'all'
                            ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-purple-500/50'
                            : 'bg-white/10 backdrop-blur-md text-gray-300 hover:bg-white/20 hover:text-white'
                        }`}
                >
                    All News
                </button>
                {CATEGORIES.map((category) => (
                    <button
                        key={category.value}
                        onClick={() => onCategoryChange(category.value)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category.value
                                ? `${category.color} text-white shadow-lg`
                                : 'bg-white/10 backdrop-blur-md text-gray-300 hover:bg-white/20 hover:text-white'
                            }`}
                    >
                        {category.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
