'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FiExternalLink, FiRefreshCw, FiTrendingUp, FiBookmark, FiShare2 } from 'react-icons/fi';
import { useInView } from 'react-intersection-observer';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4, ease: 'easeOut' }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Mock data for proof of concept
const mockArticles = [
  {
    id: 1,
    title: "OpenAI Announces GPT-5 Development",
    source: "TechCrunch",
    url: "https://techcrunch.com",
    publishedAt: "2024-03-20T10:00:00Z",
    summary: "OpenAI has begun development of GPT-5, promising significant improvements in reasoning and multimodal capabilities. The new model is expected to push the boundaries of what's possible with large language models, with enhanced capabilities in understanding context, generating more accurate responses, and processing multiple types of data simultaneously. Industry experts are particularly excited about the potential applications in scientific research and complex problem-solving.",
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
    summary: "In a comprehensive benchmark study, Google's Gemini Pro model has shown superior performance in complex reasoning tasks, marking a significant milestone in the AI race. The model demonstrated exceptional capabilities in mathematical reasoning, code generation, and logical problem-solving. What's particularly impressive is its ability to maintain high accuracy while processing longer contexts, making it potentially more suitable for complex, real-world applications.",
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
    summary: "A breakthrough in protein structure prediction using deep learning could revolutionize drug discovery and our understanding of biological systems. The new model, developed by a team of researchers at DeepMind, can predict protein structures with unprecedented accuracy in just minutes, a task that previously took months or years. This advancement could accelerate the development of new drugs and treatments for various diseases, from cancer to neurodegenerative disorders.",
    tags: ["AI", "Biology", "Research"],
    category: "Science",
    readTime: "6 min read",
    trending: false,
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995"
  }
];

// Skeleton loader component
const ArticleSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="h-96 bg-gray-200" />
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-4 bg-gray-200 rounded w-1/4" />
          <div className="h-4 bg-gray-200 rounded w-1/6" />
        </div>
        <div className="h-8 bg-gray-200 rounded w-3/4" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>
        <div className="flex gap-2">
          <div className="h-6 bg-gray-200 rounded w-20" />
          <div className="h-6 bg-gray-200 rounded w-20" />
        </div>
      </div>
    </div>
  </div>
);

export default function News() {
  const [articles, setArticles] = useState(mockArticles);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.8]);
  const headerScale = useTransform(scrollY, [0, 100], [1, 0.95]);
  
  // Pull to refresh
  const [startY, setStartY] = useState(0);
  const [pullDistance, setPullDistance] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Infinite scroll
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  // Simulate loading more articles
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setArticles(prev => [...prev, ...mockArticles]);
    setPage(prev => prev + 1);
    setHasMore(page < 3); // Simulate end of content
    setLoading(false);
  }, [loading, hasMore, page]);

  // Handle pull to refresh
  const handleTouchStart = (e: React.TouchEvent) => {
    if (containerRef.current?.scrollTop === 0) {
      setStartY(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (containerRef.current?.scrollTop === 0) {
      const currentY = e.touches[0].clientY;
      const distance = Math.max(0, (currentY - startY) / 2);
      setPullDistance(distance);
    }
  };

  const handleTouchEnd = async () => {
    if (pullDistance > 100) {
      setRefreshing(true);
      // Simulate refresh
      await new Promise(resolve => setTimeout(resolve, 1500));
      setArticles(mockArticles);
      setPage(1);
      setHasMore(true);
      setRefreshing(false);
    }
    setPullDistance(0);
  };

  // Load more when reaching the bottom
  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView, loadMore]);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gray-50"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull to refresh indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 flex justify-center items-center h-20 z-50 pointer-events-none"
        style={{ y: pullDistance }}
      >
        <motion.div
          animate={{ rotate: refreshing ? 360 : 0 }}
          transition={{ duration: 1, repeat: refreshing ? Infinity : 0, ease: "linear" }}
          className="w-8 h-8 text-blue-500"
        >
          <FiRefreshCw className="w-full h-full" />
        </motion.div>
      </motion.div>

      {/* Header */}
      <motion.header
        style={{ opacity: headerOpacity, scale: headerScale }}
        className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            AI News Feed
          </h1>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="space-y-8"
        >
          <AnimatePresence>
            {articles.map((article) => (
              <motion.article
                key={article.id}
                variants={fadeInUp}
                layout
                className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Article Header */}
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">{article.source[0]}</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{article.source}</div>
                      <div className="text-sm text-gray-500">{new Date(article.publishedAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors" title="Bookmark">
                      <FiBookmark className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors" title="Share">
                      <FiShare2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row">
                  {/* Article Image */}
                  <div className="relative md:w-2/5 aspect-[16/9] md:aspect-auto overflow-hidden">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    {article.trending && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <FiTrendingUp className="w-4 h-4" />
                        Trending
                      </div>
                    )}
                  </div>

                  {/* Article Content */}
                  <div className="flex-1 p-6 space-y-4">
                    {/* Category and Read Time */}
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full">
                        {article.category}
                      </span>
                      <span className="text-sm text-gray-500">{article.readTime}</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                      <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2">
                        {article.title}
                        <FiExternalLink className="w-5 h-5 mt-1 flex-shrink-0" />
                      </a>
                    </h2>

                    {/* Summary */}
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {article.summary}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-sm font-medium bg-gray-100 text-gray-700 rounded-full hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="space-y-8 mt-8">
            {[...Array(2)].map((_, i) => (
              <ArticleSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Load More Trigger */}
        <div ref={loadMoreRef} className="h-20 flex items-center justify-center">
          {hasMore && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-500"
            >
              Scroll for more
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
} 