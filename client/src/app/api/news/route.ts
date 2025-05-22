import { NextResponse } from 'next/server';
import { getByCategory, cleanup as cleanupBrowser } from './techcrunch.api';

interface RSSItem {
    title: string;
    link: string;
    content?: string;
    author?: string;
    date?: string;
    categories?: string[];
    summary?: string;
}

interface Article {
    id: number;
    title: string;
    source: string;
    url: string;
    publishedAt: string;
    summary: string;
    tags: string[];
    category: string;
    readTime: string;
    trending: boolean;
    imageUrl: string;
}

// Transform RSS items to match our article format
function transformArticles(rssItems: RSSItem[]): Article[] {
    return rssItems.map((item, index) => ({
        id: index + 1,
        title: item.title,
        source: "TechCrunch",
        url: item.link,
        publishedAt: item.date || new Date().toISOString(),
        summary: item.summary || item.content?.substring(0, 200) + '...' || 'No summary available',
        tags: item.categories || ["AI", "Technology"],
        category: item.categories?.[0] || "Technology",
        readTime: "5 min read",
        trending: false,
        imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995"
    }));
}

export async function GET(request: Request) {
    try {
        // Fetch raw article data from TechCrunch
        const rssItems = await getByCategory('artificial-intelligence');
        console.log('Raw RSS items:', rssItems);

        // Transform the data to match our article format
        const articles = transformArticles(rssItems);
        console.log('Transformed articles:', articles);

        return NextResponse.json({ articles });
    } catch (error) {
        console.error('Error fetching TechCrunch articles:', error);
        return NextResponse.json(
            { error: 'Failed to fetch articles' },
            { status: 500 }
        );
    }
}

// Cleanup function to be called when the server shuts down
export async function cleanup() {
    await cleanupBrowser();
} 