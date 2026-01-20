# News Aggregator

A modern, responsive news aggregator web application built with **Next.js 14**, **TypeScript**, and the **News API**. Features a premium dark theme with glassmorphism effects and smooth animations.

![News Aggregator](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 📰 News Features
- **Top Headlines**: Fetch the latest news from 25+ countries
- **Category Filtering**: Business, Technology, Entertainment, Sports, Science, Health, General
- **Search Functionality**: Search for specific topics across all news
- **Country Selection**: Beautiful card-based country selector with 25+ countries
- **Real-time Updates**: News updates automatically when filters change

### 🎨 Design Features
- **Premium Dark Theme**: Beautiful gradient background with glassmorphism effects
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Smooth Animations**: Hover effects, transitions, and loading states
- **Custom Scrollbar**: Styled scrollbar matching the theme
- **Loading Skeletons**: Skeleton screens for better perceived performance

### 📱 News Card Information
Each news card displays:
- ✅ Cover image with fallback
- ✅ Article title
- ✅ Description/summary
- ✅ Category badge (color-coded)
- ✅ News source/channel name
- ✅ Publication date (relative time: "2 hours ago")
- ✅ Clickable link to full article

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- News API key (already configured)

### Installation

The project is already set up! Just run:

```bash
# Navigate to project directory
cd d:\Job-task\news-aggregator

# Start development server
npm run dev
```

The app will be available at **http://localhost:3000**

### Environment Variables

Already configured in `.env.local`:
```env
NEXT_PUBLIC_NEWS_API_KEY=54e18b4bea574121a0d8c019ff53b19d
```

## 📖 How to Use

1. **Select a Country**: Click on any country card at the top to see news from that region
2. **Filter by Category**: Click category pills to filter news (Technology, Business, etc.)
3. **Search News**: Use the search bar to find specific topics
4. **Read Articles**: Click on any news card to read the full article on the source website

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Icons**: Lucide React
- **API**: NewsAPI.org
- **Image Optimization**: Next.js Image component

## 📁 Project Structure

```
news-aggregator/
├── app/
│   ├── globals.css         # Global styles and theme
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main page with news feed
├── components/
│   ├── CountrySelector.tsx # Country selection cards
│   ├── FilterBar.tsx       # Category filter & search
│   ├── NewsCard.tsx        # Individual news card
│   └── LoadingCard.tsx     # Loading skeleton
├── services/
│   └── newsApi.ts          # News API service layer
├── types/
│   └── news.ts             # TypeScript interfaces
├── utils/
│   ├── constants.ts        # Countries, categories, etc.
│   └── formatDate.ts       # Date formatting utilities
└── .env.local              # Environment variables
```

## 🌐 API Endpoints Used

### 1. Top Headlines
```
GET https://newsapi.org/v2/top-headlines
```
**Parameters**: `country`, `category`, `q` (search), `pageSize`

### 2. Sources (Future Enhancement)
```
GET https://newsapi.org/v2/top-headlines/sources
```
**Parameters**: `country`, `category`, `language`

## 🎨 Design Highlights

- **Glassmorphism**: Translucent cards with backdrop blur
- **Gradient Backgrounds**: Smooth purple/blue gradients
- **Hover Effects**: Scale transforms and glow effects
- **Dark Theme**: Eye-friendly dark color scheme
- **Responsive Grid**: Adapts from 1 to 4 columns based on screen size

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🐛 Troubleshooting

**Issue**: Images not loading
- **Solution**: Images are optimized through Next.js. Some news sources may have broken image URLs - the app shows a fallback image.

**Issue**: API rate limit
- **Solution**: Free tier allows 100 requests/day. Requests are made on country/category/search changes.

**Issue**: No articles found
- **Solution**: Some country/category combinations may have limited results. Try "United States" + "All News" for best results.

## 📄 License

This project is for educational purposes.

## 🙏 Credits

- **News Data**: [NewsAPI.org](https://newsapi.org/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide Icons](https://lucide.dev/)

---

**Built with ❤️ using Next.js and TypeScript**
