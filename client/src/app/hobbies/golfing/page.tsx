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

export default function GolfingPage() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="space-y-12"
    >
      {/* Overview Section */}
      <motion.section variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Golf Journey</h2>
        <div className="prose prose-lg max-w-none text-gray-600">
          <p>
            Golf has been my passion for combining precision, strategy, and outdoor enjoyment. 
            From early morning rounds to competitive tournaments, each game offers a unique 
            challenge and opportunity to improve both technique and mental focus.
          </p>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-purple-50 rounded-2xl p-6 text-center">
          <h3 className="text-2xl font-bold text-purple-600 mb-2">Handicap</h3>
          <p className="text-4xl font-bold text-gray-900">5.2</p>
          <p className="text-gray-600 mt-2">Current Index</p>
        </div>
        <div className="bg-purple-50 rounded-2xl p-6 text-center">
          <h3 className="text-2xl font-bold text-purple-600 mb-2">Best Round</h3>
          <p className="text-4xl font-bold text-gray-900">68</p>
          <p className="text-gray-600 mt-2">Pebble Beach</p>
        </div>
        <div className="bg-purple-50 rounded-2xl p-6 text-center">
          <h3 className="text-2xl font-bold text-purple-600 mb-2">Tournaments</h3>
          <p className="text-4xl font-bold text-gray-900">25+</p>
          <p className="text-gray-600 mt-2">Competitive Events</p>
        </div>
      </motion.section>

      {/* Favorite Courses */}
      <motion.section variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Favorite Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Local</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                <span className="text-gray-700">Torrey Pines Golf Course</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                <span className="text-gray-700">La Jolla Country Club</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                <span className="text-gray-700">Rancho Santa Fe Golf Club</span>
              </li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Bucket List</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                <span className="text-gray-700">Augusta National</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                <span className="text-gray-700">St. Andrews Old Course</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                <span className="text-gray-700">Pine Valley Golf Club</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Equipment */}
      <motion.section variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">My Bag</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Driver</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Titleist TSR3</li>
              <li>9° Loft</li>
              <li>Fujikura Ventus Blue</li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Irons</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Titleist T100</li>
              <li>4-PW</li>
              <li>True Temper AMT White</li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Putter</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Scotty Cameron</li>
              <li>Special Select Newport 2</li>
              <li>34" Length</li>
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
              <h3 className="text-lg font-semibold text-gray-900">Club Championship</h3>
              <p className="text-gray-600">Won the 2023 Club Championship at Torrey Pines</p>
              <p className="text-sm text-gray-500 mt-1">September 2023</p>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Personal Best</h3>
              <p className="text-gray-600">Shot a career-best 68 at Pebble Beach</p>
              <p className="text-sm text-gray-500 mt-1">July 2023</p>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
} 