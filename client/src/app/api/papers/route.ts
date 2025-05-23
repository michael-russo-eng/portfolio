import { NextResponse } from 'next/server';
import { scrapeJAIRPapers } from './jair.api';

export async function GET(request: Request) {
    try {
        const url = 'https://jair.org/index.php/jair/issue/view/1171';
        console.log('Starting paper download process...');
        
        const papers = await scrapeJAIRPapers(url);
        
        return NextResponse.json({
            message: 'Download process completed',
            papers: papers.map(paper => ({
                title: paper.title,
                authors: paper.authors,
                status: paper.pdfUrl ? 'Downloaded' : 'No PDF available'
            }))
        });
    } catch (error) {
        console.error('Error in papers API:', error);
        return NextResponse.json(
            { error: 'Failed to download papers' },
            { status: 500 }
        );
    }
} 