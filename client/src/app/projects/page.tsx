'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const projects = [
  {
    title: "Clinical Gen AI Copilot",
    description: "Developed a full-stack web application that leverages generative AI (ChatGPT4, Anthropic Claude) to summarize clinical content, resulting in an 18% increase in insurance utilization. The system provides intelligent clinical documentation assistance and automated summarization.",
    technologies: ["Next.js", "Fastify", "OpenAI API", "Anthropic Claude", "TypeScript", "TailwindCSS"],
    impact: "18% increase in insurance utilization",
    category: "AI/ML",
    color: "blue"
  },
  {
    title: "Generative ASAM Assessment System",
    description: "Built an automated ASAM Assessment Generator using RAG (Retrieval Augmented Generation) to produce real-time patient treatment level of care scores. The system streamlines documentation review and optimizes case management processes.",
    technologies: ["Next.js", "Fastify", "RAG", "LangChain", "PostgreSQL", "TypeScript"],
    impact: "30% reduction in documentation review time",
    category: "AI/ML",
    color: "purple"
  },
  {
    title: "ML Pipeline for Length of Stay Prediction",
    description: "Implemented an end-to-end Random Forest Estimator for predicting patient length of stay, integrated with Google Ads for optimized marketing performance. The system processes clinical data through a robust pipeline.",
    technologies: ["Python", "Airflow", "FastAPI", "Scikit-learn", "Google Ads API", "Docker"],
    impact: "11% improvement in Google Ads Performance",
    category: "AI/ML",
    color: "green"
  },
  {
    title: "Bed Board Management System",
    description: "Architected and deployed a full-stack application for orchestrating bed management across 14 facilities, handling 1M+ monthly requests from 800+ users. The system includes real-time updates and comprehensive data architecture.",
    technologies: ["React", "Node.js", "PostgreSQL", "Redis", "Docker", "TypeScript"],
    impact: "Scaled to 14 facilities with 1M+ monthly requests",
    category: "Full Stack",
    color: "indigo"
  },
  {
    title: "Clause Detection System",
    description: "Designed and implemented a BERT-based system for detecting identical clauses in partnership contracts, enabling legal teams to quickly identify actionable items in banking data.",
    technologies: ["Python", "BERT", "PyTorch", "FastAPI", "Docker", "PostgreSQL"],
    impact: "Automated legal document analysis",
    category: "AI/ML",
    color: "pink"
  },
  {
    title: "ReMotion - CHI Conference 2023",
    description: "Contributed as 4th author to research on remote collaboration through automatic robotic embodiment. Implemented OpenCV tracking for smoother transitions and spatial movements in remote settings.",
    technologies: ["Python", "OpenCV", "Computer Vision", "Robotics"],
    impact: "Published in CHI Conference 2023",
    category: "Research",
    color: "yellow"
  }
];

const categories = ["All", "AI/ML", "Full Stack", "Research"];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: { bg: string; text: string; border: string } } = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
      green: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
      indigo: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
      pink: { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200' },
      yellow: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' }
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="min-h-screen pt-20 pb-20">
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header Section */}
        <section className="text-center mb-16">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Featured Projects
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            A collection of my work in healthcare technology, AI, and software engineering.
            Each project represents unique challenges and innovative solutions.
          </motion.p>
        </section>

        {/* Category Filter */}
        <motion.div 
          className="flex justify-center space-x-4 mb-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {filteredProjects.map((project, index) => {
            const colors = getColorClasses(project.color);
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`relative group rounded-2xl overflow-hidden border ${colors.border} transition-all duration-300 ${
                  hoveredProject === index ? 'shadow-xl scale-[1.02]' : 'shadow-md'
                }`}
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className={`absolute inset-0 ${colors.bg} opacity-50`} />
                <div className="relative p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium ${colors.bg} ${colors.text} rounded-full`}>
                      {project.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 line-clamp-3">
                    {project.description}
                  </p>

                  {project.impact && (
                    <div className={`text-sm font-medium ${colors.text}`}>
                      Impact: {project.impact}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 pt-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className={`px-2 py-1 text-xs font-medium ${colors.bg} ${colors.text} rounded-full`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                    animate={{ opacity: hoveredProject === index ? 1 : 0 }}
                  >
                    <div className="absolute bottom-4 left-4 right-4">
                      <button className="w-full py-2 px-4 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200">
                        View Details
                      </button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
} 