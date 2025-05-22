import { NextResponse } from 'next/server';

// Mock data for demonstration
const mockArticles = [
  {
    id: 1,
    title: "OpenAI Announces GPT-5 Development",
    source: "TechCrunch",
    url: "https://techcrunch.com",
    publishedAt: "2024-03-20T10:00:00Z",
    summary: "OpenAI has begun development of GPT-5, promising significant improvements in reasoning and multimodal capabilities. The new model is expected to push the boundaries of what's possible with large language models.",
    tags: ["AI", "OpenAI", "LLMs"],
    category: "Research",
    readTime: "5 min read",
    trending: true,
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995"
  },
  {
    id: 2,
    title: "Google's Gemini Pro Outperforms GPT-4 in Latest Benchmarks",
    source: "The Verge",
    url: "https://theverge.com",
    publishedAt: "2024-03-19T15:30:00Z",
    summary: "In a comprehensive benchmark study, Google's Gemini Pro model has shown superior performance in complex reasoning tasks, marking a significant milestone in the AI race.",
    tags: ["AI", "Google", "Benchmarks"],
    category: "Industry",
    readTime: "4 min read",
    trending: true,
    imageUrl: "https://images.unsplash.com/photo-1676299081847-4b1d0b3d0b3d"
  },
  {
    id: 3,
    title: "New AI Model Can Predict Protein Structures in Minutes",
    source: "Nature",
    url: "https://nature.com",
    publishedAt: "2024-03-18T09:15:00Z",
    summary: "A breakthrough in protein structure prediction using deep learning could revolutionize drug discovery and our understanding of biological systems.",
    tags: ["AI", "Biology", "Research"],
    category: "Science",
    readTime: "6 min read",
    trending: false,
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995"
  },
  {
    id: 4,
    title: "This is a Test",
    source: "Nature",
    url: "https://nature.com",
    publishedAt: "2024-03-18T09:15:00Z",
    summary: "A breakthrough in protein structure prediction using deep learning could revolutionize drug discovery and our understanding of biological systems.",
    tags: ["AI", "Biology", "Research"],
    category: "Science",
    readTime: "6 min read",
    trending: false,
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995"
  }
  
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = 3; // Number of articles per page

  // Simulate pagination
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedArticles = mockArticles.slice(startIndex, endIndex);
  const hasMore = endIndex < mockArticles.length;

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return NextResponse.json({
    articles: paginatedArticles,
    hasMore,
    total: mockArticles.length,
    page,
    pageSize
  });
} 