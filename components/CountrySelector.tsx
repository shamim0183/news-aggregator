'use client';

import { CountryCode } from '@/types/news';
import { COUNTRIES } from '@/utils/constants';

interface CountrySelectorProps {
    selectedCountry: CountryCode;
    onSelectCountry: (country: CountryCode) => void;
}

export default function CountrySelector({ selectedCountry, onSelectCountry }: CountrySelectorProps) {
    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Select a Country
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
                {COUNTRIES.map((country) => (
                    <button
                        key={country.code}
                        onClick={() => onSelectCountry(country.code)}
                        className={`
              group relative overflow-hidden rounded-xl p-4 
              transition-all duration-300 transform hover:scale-105
              ${selectedCountry === country.code
                                ? 'bg-gradient-to-br from-violet-600 to-purple-600 shadow-lg shadow-purple-500/50'
                                : 'bg-white/10 backdrop-blur-md hover:bg-white/20'
                            }
            `}
                    >
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-4xl">{country.flag}</span>
                            <span className={`
                text-xs font-medium text-center transition-colors
                ${selectedCountry === country.code ? 'text-white' : 'text-gray-200 group-hover:text-white'}
              `}>
                                {country.name}
                            </span>
                        </div>

                        {/* Shine effect on hover */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </button>
                ))}
            </div>
        </div>
    );
}
