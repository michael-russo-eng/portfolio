import Parser from 'rss-parser';

interface CustomFeed {
    title: string;
    description: string;
    link: string;
    items: CustomItem[];
}

interface CustomItem {
    title: string;
    link: string;
    content?: string;
    contentSnippet?: string;
    author?: string;
    creator?: string;
    isoDate?: string;
    categories?: string[];
}

const parser: Parser<CustomFeed, CustomItem> = new Parser({
    customFields: {
        item: [
            ['content:encoded', 'content'],
            ['dc:creator', 'author'],
            ['category', 'categories'],
        ],
    },
});

async function getByCategory(category: string) {
    if (!category) {
        throw new Error('Category parameter is required');
    }

    try {
        console.log('Fetching RSS feed...');
        const feed = await parser.parseURL(`https://techcrunch.com/category/${category}/feed/`);
        console.log('Feed fetched, processing items...');

        // Log the raw feed data for the first item to see what we're getting
        if (feed.items.length > 0) {
            const firstItem = feed.items[0];
            console.log('Raw feed item example:', {
                title: firstItem.title,
                contentLength: firstItem.content?.length || 0,
                contentPreview: firstItem.content?.substring(0, 100) + '...',
                contentSnippetLength: firstItem.contentSnippet?.length || 0,
                contentSnippetPreview: firstItem.contentSnippet?.substring(0, 100) + '...',
                link: firstItem.link,
                // Log all available fields
                availableFields: Object.keys(firstItem)
            });
        }

        // Get the first 2 items
        const items = feed.items.slice(0, 2).map((item: CustomItem) => {
            console.log('Processing item:', {
                title: item.title,
                hasContent: !!item.content,
                contentLength: item.content?.length || 0,
                hasContentSnippet: !!item.contentSnippet,
                contentSnippetLength: item.contentSnippet?.length || 0
            });

            return {
                title: item.title,
                link: item.link,
                content: item.content,
                author: item.author || item.creator,
                date: item.isoDate,
                categories: item.categories || [],
                summary: item.contentSnippet || item.content || 'No content available'
            };
        });

        console.log('Processed items:', items);
        return items;
    } catch (error) {
        console.error('Error fetching RSS feed:', error);
        throw error;
    }
}

// No need for cleanup with RSS
async function cleanup() {
    // Nothing to clean up
}

export { getByCategory, cleanup };