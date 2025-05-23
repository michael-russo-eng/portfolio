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

// Helper function to clean HTML entities and truncate content
function cleanContent(content: string | undefined): string {
    if (!content) return 'No content available';
    
    // Replace HTML entities
    const decoded = content
        .replace(/&#8217;/g, "'")
        .replace(/&#8220;/g, '"')
        .replace(/&#8221;/g, '"')
        .replace(/&#8230;/g, '...')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");

    // If the content ends with [...], it's truncated
    const isTruncated = decoded.endsWith('...]');
    
    // Remove the [...] if it exists
    const cleaned = isTruncated ? decoded.replace(/\[\.\.\.\]$/, '...') : decoded;
    
    return cleaned;
}

// Transform RSS items to match our article format
function transformArticles(rssItems: RSSItem[]): Article[] {
    return rssItems.map((item, index) => {
        const cleanedContent = cleanContent(item.content);
        const isTruncated = item.content?.includes('&#8230;') || false;

        return {
            id: index + 1,
            title: item.title,
            source: "TechCrunch",
            url: item.link,
            publishedAt: item.date || new Date().toISOString(),
            summary: cleanedContent + (isTruncated ? ' (Read more on TechCrunch)' : ''),
            tags: item.categories || ["AI", "Technology"],
            category: item.categories?.[0] || "Technology",
            readTime: "5 min read",
            trending: false,
            imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995"
        };
    });
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