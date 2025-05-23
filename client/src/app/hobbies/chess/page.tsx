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

export default function ChessPage() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="space-y-12"
    >
      {/* Overview Section */}
      <motion.section variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Chess Journey</h2>
        <div className="prose prose-lg max-w-none text-gray-600">
          <p>
            Chess has been a passion of mine for many years, combining strategic thinking with 
            continuous learning. I enjoy both casual games and competitive play, constantly 
            working to improve my understanding of openings, middle game tactics, and endgame 
            techniques.
          </p>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-purple-50 rounded-2xl p-6 text-center">
          <h3 className="text-2xl font-bold text-purple-600 mb-2">Rating</h3>
          <p className="text-4xl font-bold text-gray-900">1800</p>
          <p className="text-gray-600 mt-2">USCF Rating</p>
        </div>
        <div className="bg-purple-50 rounded-2xl p-6 text-center">
          <h3 className="text-2xl font-bold text-purple-600 mb-2">Games</h3>
          <p className="text-4xl font-bold text-gray-900">500+</p>
          <p className="text-gray-600 mt-2">Tournament Games</p>
        </div>
        <div className="bg-purple-50 rounded-2xl p-6 text-center">
          <h3 className="text-2xl font-bold text-purple-600 mb-2">Tournaments</h3>
          <p className="text-4xl font-bold text-gray-900">20+</p>
          <p className="text-gray-600 mt-2">Local & Regional</p>
        </div>
      </motion.section>

      {/* Favorite Openings */}
      <motion.section variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Favorite Openings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">White</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                <span className="text-gray-700">Queen's Gambit</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                <span className="text-gray-700">Italian Game</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                <span className="text-gray-700">English Opening</span>
              </li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Black</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                <span className="text-gray-700">Sicilian Defense</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                <span className="text-gray-700">King's Indian Defense</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                <span className="text-gray-700">Nimzo-Indian Defense</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Recent Achievements */}
      <motion.section variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Recent Achievements</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Local Tournament Champion</h3>
              <p className="text-gray-600">Won first place in the 2023 City Chess Championship</p>
              <p className="text-sm text-gray-500 mt-1">December 2023</p>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Rating Milestone</h3>
              <p className="text-gray-600">Reached 1800 USCF rating for the first time</p>
              <p className="text-sm text-gray-500 mt-1">October 2023</p>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
} 