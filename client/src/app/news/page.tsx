import NewsClient from './NewsClient';

// This is a Server Component by default (no 'use client' directive)
async function getInitialArticles() {
  // During build time, return static data
  if (process.env.NODE_ENV === 'production') {
    return {
      articles: [
        {
          id: 1,
          title: "OpenAI Announces GPT-5 Development",
          source: "TechCrunch",
          url: "https://techcrunch.com",
          publishedAt: "2024-03-20T10:00:00Z",
          summary: "OpenAI has begun development of GPT-5, promising significant improvements in reasoning and multimodal capabilities.",
          tags: ["AI", "OpenAI", "LLMs"],
          category: "Research",
          readTime: "5 min read",
          trending: true,
          imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995"
        }
      ],
      hasMore: true
    };
  }

  // During development, fetch from the API
  try {
    const res = await fetch('http://localhost:3000/api/news', {
      cache: 'no-store',
      next: { revalidate: 0 }
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch news articles');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching news articles:', error);
    // Return static data as fallback
    return {
      articles: [
        {
          id: 1,
          title: "OpenAI Announces GPT-5 Development",
          source: "TechCrunch",
          url: "https://techcrunch.com",
          publishedAt: "2024-03-20T10:00:00Z",
          summary: "OpenAI has begun development of GPT-5, promising significant improvements in reasoning and multimodal capabilities.",
          tags: ["AI", "OpenAI", "LLMs"],
          category: "Research",
          readTime: "5 min read",
          trending: true,
          imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995"
        }
      ],
      hasMore: true
    };
  }
}

export default async function News() {
  const initialData = await getInitialArticles();
  return <NewsClient initialArticles={initialData.articles} initialHasMore={initialData.hasMore} />;
} 