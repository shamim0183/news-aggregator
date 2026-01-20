'use client';

export default function LoadingCard() {
    return (
        <div className="h-full bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 animate-pulse">
            {/* Image skeleton */}
            <div className="h-48 w-full bg-gray-700/50" />

            {/* Content skeleton */}
            <div className="p-5 space-y-3">
                {/* Title */}
                <div className="h-6 bg-gray-700/50 rounded w-3/4" />
                <div className="h-6 bg-gray-700/50 rounded w-1/2" />

                {/* Description */}
                <div className="space-y-2 pt-2">
                    <div className="h-4 bg-gray-700/50 rounded" />
                    <div className="h-4 bg-gray-700/50 rounded" />
                    <div className="h-4 bg-gray-700/50 rounded w-2/3" />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-700/50" />
                        <div className="h-4 bg-gray-700/50 rounded w-20" />
                    </div>
                    <div className="h-3 bg-gray-700/50 rounded w-16" />
                </div>
            </div>
        </div>
    );
}
