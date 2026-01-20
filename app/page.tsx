'use client';

import { useState, useEffect } from 'react';
import { CountryCode, Category } from '@/types/news';
import CountrySelector from '@/components/CountrySelector';
import FilterBar from '@/components/FilterBar';
import DateRangePicker from '@/components/DateRangePicker';
import LanguageSelector from '@/components/LanguageSelector';
import NewsCard from '@/components/NewsCard';
import LoadingCard from '@/components/LoadingCard';
import { Newspaper, RefreshCcw } from 'lucide-react';

// Define minimal Article interface matching what we need
interface Article {
  id: string;
  title: string;
  description: string | null;
  content: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: Date;
  sourceName: string;
  country: string | null;
}

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>('us');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch news from backend API
  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          page: page.toString(),
          pageSize: '20',
          ...(selectedCountry && { country: selectedCountry }),
          ...(selectedCategory !== 'all' && { category: selectedCategory.toUpperCase() }),
          ...(selectedLanguage && { language: selectedLanguage }),
          ...(searchQuery && { search: searchQuery }),
          ...(fromDate && { fromDate }),
          ...(toDate && { toDate }),
        });

        console.log('🔍 Fetching from backend:', `/api/news?${params}`);
        const response = await fetch(`/api/news?${params}`);
        const data = await response.json();

        if (data.error) {
          setError(data.error);
          setArticles([]);
        } else {
          console.log('✅ Received articles from database:', data.articles.length);
          setArticles(data.articles || []);
          setTotalPages(data.totalPages || 1);
        }
      } catch (err: any) {
        console.error('❌ Error fetching news:', err);
        setError(err.message || 'Failed to fetch news');
        setArticles([]);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [selectedCountry, selectedCategory, selectedLanguage, searchQuery, fromDate, toDate, page]);

  // Sync news from News API to database
  const handleSync = async () => {
    setSyncing(true);
    try {
      console.log('🔄 Syncing news from News API...');
      const response = await fetch('/api/news/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          countries: ['us', 'gb', 'ca', 'in', 'au'],
          categories: ['business', 'technology', 'sports', 'health', 'entertainment'],
        }),
      });

      const data = await response.json();
      console.log('✅ Sync complete:', data);

      // Refresh the news list
      setPage(1);
      window.location.reload();
    } catch (err: any) {
      console.error('❌ Sync error:', err);
      alert('Sync failed: ' + err.message);
    } finally {
      setSyncing(false);
    }
  };

  const handleDateChange = (from: string, to: string) => {
    setFromDate(from);
    setToDate(to);
    setPage(1);
  };

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl">
                <Newspaper className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">News Aggregator</h1>
                <p className="text-gray-400 text-sm">Powered by Database & Backend API</p>
              </div>
            </div>

            {/* Sync Button */}
            <button
              onClick={handleSync}
              disabled={syncing}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 rounded-xl text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCcw size={18} className={syncing ? 'animate-spin' : ''} />
              {syncing ? 'Syncing...' : 'Sync News'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Country Selector */}
        <section className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10">
          <CountrySelector
            selectedCountry={selectedCountry}
            onSelectCountry={(country) => {
              setSelectedCountry(country);
              setPage(1);
            }}
          />
        </section>

        {/* Filters */}
        <section className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10">
          <div className="flex flex-col gap-4">
            <FilterBar
              selectedCategory={selectedCategory}
              onCategoryChange={(cat) => {
                setSelectedCategory(cat);
                setPage(1);
              }}
              searchQuery={searchQuery}
              onSearchChange={(query) => {
                setSearchQuery(query);
                setPage(1);
              }}
            />

            <div className="flex items-center gap-3 flex-wrap">
              <DateRangePicker
                fromDate={fromDate}
                toDate={toDate}
                onDateChange={handleDateChange}
              />
              <LanguageSelector
                selectedLanguage={selectedLanguage}
                onLanguageChange={(lang) => {
                  setSelectedLanguage(lang);
                  setPage(1);
                }}
              />
            </div>
          </div>
        </section>

        {/* News Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              {searchQuery
                ? `Search Results for "${searchQuery}"`
                : selectedCategory === 'all'
                  ? 'Top Headlines'
                  : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} News`}
            </h2>
            {!loading && (
              <span className="text-gray-400">
                {articles.length} articles • Page {page} of {totalPages}
              </span>
            )}
          </div>

          {error && (
            <div className="bg-red-500/20 backdrop-blur-md border border-red-500/50 rounded-2xl p-6 text-center">
              <p className="text-red-400 font-medium">{error}</p>
              <p className="text-gray-400 text-sm mt-2">Try clicking "Sync News" to fetch fresh articles</p>
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <LoadingCard key={i} />
              ))}
            </div>
          ) : articles.length === 0 ? (
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-12 text-center border border-white/10">
              <p className="text-gray-400 text-lg mb-4">No articles found in database</p>
              <button
                onClick={handleSync}
                className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 rounded-xl text-white font-medium transition-all"
              >
                Sync News to Database
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {articles.map((article, index) => (
                  <NewsCard key={`${article.id}-${index}`} article={article} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white transition-colors"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2 text-white">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-md border-t border-white/10 mt-16">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-gray-400 text-sm">
            Powered by <span className="text-purple-400 font-semibold">NewsData.io</span> •
            Backend: <span className="text-purple-400 font-semibold">Next.js API Routes</span> •
            Database: <span className="text-purple-400 font-semibold">PostgreSQL + Prisma</span>
          </p>
        </div>
      </footer>
    </main>
  );
}
