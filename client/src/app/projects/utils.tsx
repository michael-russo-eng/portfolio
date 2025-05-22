import React from 'react';
import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    title: "ReMotion - CHI Conference 2023",
    description: "Supporting Remote Collaboration in Open Space with Automatic Robotic Embodiment.",
    technologies: [
       "OpenCV", "Unity", "Kinect", "MediaPipe", "TensorFlow", "NeckFace",
      "WebSocket"
    ],
    impact: [
      "7 total citations with 1,600 cumulative active downloads.",
    ],
    category: "AI/ML",
    details: (
      <div className="space-y-4">
        <p>
          ReMotion is an innovative remote physical therapy platform that leverages computer vision 
          and machine learning to provide real-time feedback on exercise form. The system uses 
          MediaPipe for pose estimation and a custom TensorFlow model trained on physical therapy 
          exercise datasets to assess exercise quality and provide immediate feedback.
        </p>
        <p>
          Key technical achievements include:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Developed a custom pose estimation pipeline that works in real-time with consumer webcams</li>
          <li>Created a novel exercise form assessment algorithm that considers joint angles, movement patterns, and exercise-specific requirements</li>
          <li>Implemented a low-latency WebRTC-based video streaming system for remote sessions</li>
          <li>Built a scalable backend using AWS services for session management and data storage</li>
          <li>Designed an intuitive React-based dashboard for physical therapists to monitor patient progress</li>
        </ul>
        <p>
          The project was conducted in collaboration with physical therapists and patients, 
          incorporating their feedback throughout the development process. The system has been 
          tested with over 100 patients and has shown significant improvements in exercise 
          adherence and form accuracy.
        </p>
      </div>
    ),
    links: [
      {
        label: "View Paper",
        url: "https://dl.acm.org/doi/10.1145/3544548.3580891",
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        )
      },
      {
        label: "GitHub Repository",
        url: "https://github.com/michael-russo-eng/remotion",
        icon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        )
      }
    ],
    color: 'red'
  },
   {
    title: "Clinical Gen AI Copilot",
    description: "Developed a full-stack web application that leverages generative AI (ChatGPT4, Anthropic Claude) to summarize clinical content, resulting in an 18% increase in insurance utilization. The system provides intelligent clinical documentation assistance and automated summarization.",
    technologies: ["Next.js", "Fastify", "OpenAI API", "Anthropic Claude", "TypeScript", "TailwindCSS"],
    impact: ["18% increase in insurance utilization"],
    category: "AI/ML",
    color: "blue"
  },

  {
    title: "ML Pipeline for Length of Stay Prediction",
    description: "Implemented an end-to-end Random Forest Estimator for predicting patient length of stay, integrated with Google Ads for optimized marketing performance. The system processes clinical data through a robust pipeline.",
    technologies: ["Python", "Airflow", "FastAPI", "Scikit-learn", "Google Ads API", "Docker"],
    impact: ["11% improvement in Google Ads Performance"],
    category: "AI/ML",
    color: "green"
  },
  {
    title: "Bed Board System",
    description: "Architected and deployed a full-stack application for orchestrating bed management across 14 facilities, handling 1M+ monthly requests from 800+ users. The system includes real-time updates and comprehensive data architecture.",
    technologies: ["React", "Node.js", "PostgreSQL", "Redis", "Docker", "TypeScript"],
    impact: ["Scaled to 14 facilities with 1M+ monthly requests"],
    category: "Full Stack",
    color: "indigo"
  },
  {
    title: "Clause Detection System",
    description: "Designed and implemented a BERT-based system for detecting identical clauses in partnership contracts, enabling legal teams to quickly identify actionable items in banking data.",
    technologies: ["Python", "BERT", "PyTorch", "FastAPI", "Docker", "PostgreSQL"],
    impact: ["Automated legal document analysis"],
    category: "AI/ML",
    color: "pink"
  },

]; 
