'use client';

import { motion } from 'framer-motion';

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

const demos = [
  {
    title: "Sushi Maker",
    videoUrl: "/videos/sushi-maker.mp4",
    description: "Automatic Sushi Machine That Makes a Piece of 'Nigiri Sushi'.",
    link: "https://www.youtube.com/watch?v=pPuZfKiCb-4",
    tag: "Prototyping/2018"
  },
  {
    title: "Tetris",
    videoUrl: "/videos/tetris.mp4",
    description: "Training Tetris Bot with Reinforcement Learning.",
    link: "https://github.com/oscarso2000/TetrisDeepLearningAI#",
    tag: "CS5700/2021"
  },
  {
    title: "ReMotion",
    videoUrl: "/videos/remotion.mp4",
    description: "Supporting Remote Collaboration in Open Space with Embodied Proxy.",
    link: "https://www.youtube.com/watch?v=Sy0UpruV6C4",
    tag: "CHI/2023"
  },
  {
    title: "Chess Bot",
    videoUrl: "/videos/chess_game_play.mp4",
    description: "Using Minimax Algorithm For Chess Bot Designed to Lose.",
    link: "https://www.michaelrusso3rd.com/hobbies/chess",
    tag: "AI/2024"
  }

];

export default function Home() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white z-0" />
        <motion.div 
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Michael Russo
          </motion.h1>
          <motion.h2 
            className="text-2xl md:text-3xl text-gray-600 mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Software Engineer
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Striving to make an impact. I enjoy building technology through innovative AI solutions
            and full-stack development.
          </motion.p>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-2 bg-white">
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              About Me
            </h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full" />
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="prose prose-lg max-w-none mx-auto text-gray-600"
          >
            <p className="text-xl leading-relaxed">
              I&apos;m a software engineer with a passion for Generative AI and building innovative solutions.
              My journey combines technical expertise with a deep understanding of healthcare technology,
              allowing me to create impactful solutions that make a real difference.
            </p>
          </motion.div>
        </motion.div>
      </section>

            {/* Demos Section */}
      <section className="py-20 bg-white">
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Demos
            </h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full" />
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            {demos.map((demo) => (
              <a
                key={demo.title}
                href={demo.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 bg-white border border-gray-200 overflow-hidden"
              >
                <div className="relative w-full h-56 bg-gray-100">
                  <video
                    src={demo.videoUrl}
                    className="object-cover w-full h-full"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                  <span className="absolute top-4 left-4 bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-lg shadow">
                    {demo.tag}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{demo.title}</h3>
                  <p className="text-gray-600 text-sm">{demo.description}</p>
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gray-50">
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Skills & Expertise
            </h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              variants={fadeInUp}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </span>
                Software Development
              </h3>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {['TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'SQL'].map((skill) => (
                    <span 
                      key={skill}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                AI & Machine Learning
              </h3>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {['PyTorch', 'TensorFlow', 'HuggingFace', 'LangChain', 'OpenAI', 'LLaMA'].map((skill) => (
                    <span 
                      key={skill}
                      className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-400">
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Let&apos;s Build Something Amazing Together
          </h2>
          <motion.a
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
}
