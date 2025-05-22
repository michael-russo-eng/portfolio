'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectModal from '@/components/ProjectModal';
import { Project } from '@/types/project';
import { projects } from './utils';

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

const categories = ['All', ...new Set(projects.map(project => project.category))];


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

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);


  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={staggerContainer}
      className="min-h-[calc(100vh-5rem)] py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent mb-4">
            Projects
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            A collection of my work in software engineering, AI, and healthcare technology.
            Each project represents a unique challenge and learning opportunity.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div variants={fadeInUp} className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg bg-gray-100 p-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => {
            const colors = getColorClasses(project.color);
            return (
            <motion.div
              key={project.title}
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
                <p className="text-gray-600 mb-4">{project.description}</p>

                {project.impact && (
                    <div className={`text-sm font-medium ${colors.text}`}>
                      Impact: {project.impact}
                    </div>
                  )}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span 
                        key={tech}
                        className={`px-2 py-1 text-xs font-medium ${colors.bg} ${colors.text} rounded-full`}
                      >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className={`px-2 py-1 text-xs font-medium ${colors.bg} ${colors.text} rounded-full`}>
                      +{project.technologies.length - 3} more
                    </span>
                  )}
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
          )})}
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </motion.div>
  );
} 