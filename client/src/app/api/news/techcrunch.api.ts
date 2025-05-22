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
        // TechCrunch's RSS feed for categories
        const feed = await parser.parseURL(`https://techcrunch.com/category/${category}/feed/`);
        console.log('Feed fetched, processing items...');

        // Get the first 2 items
        const items = feed.items.slice(0, 2).map((item: CustomItem) => {
            console.log('Processing item:', item.title);
            return {
                title: item.title,
                link: item.link,
                content: item.content,
                author: item.author || item.creator,
                date: item.isoDate,
                categories: item.categories || [],
                // Extract a summary from the content if available
                summary: item.contentSnippet || item.content?.substring(0, 200) + '...'
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