'use client';

import { Globe } from 'lucide-react';
import { LANGUAGES } from '@/utils/constants';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface LanguageSelectorProps {
    selectedLanguage: string;
    onLanguageChange: (language: string) => void;
}

export default function LanguageSelector({
    selectedLanguage,
    onLanguageChange,
}: LanguageSelectorProps) {

    // Find the current language name for display (optional/fallback)
    // const currentLang = LANGUAGES.find(l => l.code === selectedLanguage)?.name || "All Languages";

    return (
        <Select value={selectedLanguage} onValueChange={onLanguageChange}>
            <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white focus:ring-purple-500/20">
                <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-purple-400" />
                    <SelectValue placeholder="All Languages" />
                </div>
            </SelectTrigger>
            <SelectContent className="bg-gray-950 border-white/10 text-white">
                <SelectGroup>
                    <SelectLabel className="text-gray-400 text-xs uppercase tracking-wider">Languages</SelectLabel>
                    <SelectItem value="all" className="focus:bg-purple-900/20 focus:text-purple-300 cursor-pointer">All Languages</SelectItem>
                    {LANGUAGES.map((lang) => (
                        <SelectItem
                            key={lang.code}
                            value={lang.code}
                            className="focus:bg-purple-900/20 focus:text-purple-300 cursor-pointer"
                        >
                            {lang.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
