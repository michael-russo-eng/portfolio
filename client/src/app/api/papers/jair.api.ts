import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import https from 'https';

export type Paper = {
    title: string;
    authors: string;
    pdfUrl: string;
    abstract?: string;
}

async function downloadPDF(url: string, filename: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filename);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download PDF: ${response.statusCode}`));
                return;
            }

            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filename, () => {}); // Delete the file if there's an error
            reject(err);
        });
    });
}

async function scrapeJAIRPapers(issueUrl: string): Promise<Paper[]> {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');
        console.log('Navigating to JAIR page...');
        await page.goto(issueUrl, { waitUntil: 'networkidle0', timeout: 30000 });

        // Wait for the articles table to load
        await page.waitForSelector('table.articles', { timeout: 10000 });

        // Extract paper information from the table
        const papers = await page.evaluate(() => {
            const rows = Array.from(document.querySelectorAll('table.articles tr'));
            return rows.map(row => {
                const titleCell = row.querySelector('td.title');
                const authorsCell = row.querySelector('td.authors');
                let pdfLink = '';
                const links = row.querySelectorAll('a');
                links.forEach(link => {
                    if (link.textContent && link.textContent.trim().toLowerCase() === 'pdf') {
                        pdfLink = link.getAttribute('href') || '';
                    }
                });
                return {
                    title: titleCell?.textContent?.trim() || 'Unknown Title',
                    authors: authorsCell?.textContent?.trim() || 'Unknown Authors',
                    pdfUrl: pdfLink,
                    abstract: undefined // Not available in this table
                };
            }).filter(paper => paper.pdfUrl); // Only keep rows with a PDF link
        });

        console.log(`Found ${papers.length} papers`);

        // Create downloads directory if it doesn't exist
        const downloadDir = path.join(process.cwd(), 'downloads', 'papers');
        if (!fs.existsSync(downloadDir)) {
            fs.mkdirSync(downloadDir, { recursive: true });
        }

        // Download PDFs
        for (const paper of papers) {
            if (paper.pdfUrl) {
                // Make sure the URL is absolute
                const pdfUrl = paper.pdfUrl.startsWith('http') 
                    ? paper.pdfUrl 
                    : new URL(paper.pdfUrl, issueUrl).toString();
                const filename = path.join(downloadDir, `${paper.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`);
                console.log(`Downloading: ${paper.title}`);
                console.log(`PDF URL: ${pdfUrl}`);
                try {
                    await downloadPDF(pdfUrl, filename);
                    console.log(`Successfully downloaded: ${filename}`);
                } catch (error) {
                    console.error(`Failed to download ${paper.title}:`, error);
                }
            }
        }

        return papers;
    } catch (error) {
        console.error('Error scraping JAIR papers:', error);
        throw error;
    } finally {
        await browser.close();
    }
}

export { scrapeJAIRPapers }; 