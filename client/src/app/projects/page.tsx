export default function Projects() {
  const projects = [
    {
      title: "Clinical Gen AI Copilot",
      description: "Developed a full-stack web application that leverages generative AI (ChatGPT4, Anthropic Claude) to summarize clinical content, resulting in an 18% increase in insurance utilization. The system provides intelligent clinical documentation assistance and automated summarization.",
      technologies: ["Next.js", "Fastify", "OpenAI API", "Anthropic Claude", "TypeScript", "TailwindCSS"],
      impact: "18% increase in insurance utilization",
      category: "AI/ML"
    },
    {
      title: "Generative ASAM Assessment System",
      description: "Built an automated ASAM Assessment Generator using RAG (Retrieval Augmented Generation) to produce real-time patient treatment level of care scores. The system streamlines documentation review and optimizes case management processes.",
      technologies: ["Next.js", "Fastify", "RAG", "LangChain", "PostgreSQL", "TypeScript"],
      impact: "30% reduction in documentation review time",
      category: "AI/ML"
    },
    {
      title: "ML Pipeline for Length of Stay Prediction",
      description: "Implemented an end-to-end Random Forest Estimator for predicting patient length of stay, integrated with Google Ads for optimized marketing performance. The system processes clinical data through a robust pipeline.",
      technologies: ["Python", "Airflow", "FastAPI", "Scikit-learn", "Google Ads API", "Docker"],
      impact: "11% improvement in Google Ads Performance",
      category: "AI/ML"
    },
    {
      title: "Bed Board Management System",
      description: "Architected and deployed a full-stack application for orchestrating bed management across 14 facilities, handling 1M+ monthly requests from 800+ users. The system includes real-time updates and comprehensive data architecture.",
      technologies: ["React", "Node.js", "PostgreSQL", "Redis", "Docker", "TypeScript"],
      impact: "Scaled to 14 facilities with 1M+ monthly requests",
      category: "Full Stack"
    },
    {
      title: "Clause Detection System",
      description: "Designed and implemented a BERT-based system for detecting identical clauses in partnership contracts, enabling legal teams to quickly identify actionable items in banking data.",
      technologies: ["Python", "BERT", "PyTorch", "FastAPI", "Docker", "PostgreSQL"],
      impact: "Automated legal document analysis",
      category: "AI/ML"
    },
    {
      title: "ReMotion - CHI Conference 2023",
      description: "Contributed as 4th author to research on remote collaboration through automatic robotic embodiment. Implemented OpenCV tracking for smoother transitions and spatial movements in remote settings.",
      technologies: ["Python", "OpenCV", "Computer Vision", "Robotics"],
      impact: "Published in CHI Conference 2023",
      category: "Research"
    }
  ];

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Projects</h1>
        <p className="text-lg text-gray-700 max-w-2xl">
          A collection of my work in software engineering and AI, focusing on healthcare technology,
          machine learning, and full-stack development. Each project represents unique challenges
          and innovative solutions.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div key={index} className="border rounded-lg p-6 space-y-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                {project.category}
              </span>
            </div>
            <p className="text-gray-600">
              {project.description}
            </p>
            {project.impact && (
              <div className="text-sm text-green-600 font-medium">
                Impact: {project.impact}
              </div>
            )}
            <div className="flex flex-wrap gap-2 pt-2">
              {project.technologies.map((tech, techIndex) => (
                <span 
                  key={techIndex}
                  className="px-2 py-1 bg-gray-100 text-sm rounded text-gray-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
} 