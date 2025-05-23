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

export default function SurfingPage() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="space-y-12"
    >
      {/* Overview Section */}
      <motion.section variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Surfing Journey</h2>
        <div className="prose prose-lg max-w-none text-gray-600">
          <p>
            Surfing has been my passion for connecting with nature and finding balance. 
            Whether it's catching waves at dawn or challenging myself with bigger swells, 
            each session brings a unique experience and opportunity for growth.
          </p>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-purple-50 rounded-2xl p-6 text-center">
          <h3 className="text-2xl font-bold text-purple-600 mb-2">Experience</h3>
          <p className="text-4xl font-bold text-gray-900">8+</p>
          <p className="text-gray-600 mt-2">Years Surfing</p>
        </div>
        <div className="bg-purple-50 rounded-2xl p-6 text-center">
          <h3 className="text-2xl font-bold text-purple-600 mb-2">Locations</h3>
          <p className="text-4xl font-bold text-gray-900">15+</p>
          <p className="text-gray-600 mt-2">Different Spots</p>
        </div>
        <div className="bg-purple-50 rounded-2xl p-6 text-center">
          <h3 className="text-2xl font-bold text-purple-600 mb-2">Best Wave</h3>
          <p className="text-4xl font-bold text-gray-900">12'</p>
          <p className="text-gray-600 mt-2">Pipeline, Hawaii</p>
        </div>
      </motion.section>

      {/* Favorite Spots */}
      <motion.section variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Favorite Surf Spots</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Local</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                <span className="text-gray-700">Malibu Point</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                <span className="text-gray-700">Trestles</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                <span className="text-gray-700">Huntington Beach</span>
              </li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">International</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                <span className="text-gray-700">Pipeline, Hawaii</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                <span className="text-gray-700">Bali, Indonesia</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                <span className="text-gray-700">Gold Coast, Australia</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Equipment */}
      <motion.section variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">My Quiver</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Shortboard</h3>
            <ul className="space-y-2 text-gray-600">
              <li>6'2" Channel Islands</li>
              <li>Perfect for daily conditions</li>
              <li>High-performance design</li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Fish</h3>
            <ul className="space-y-2 text-gray-600">
              <li>5'8" Lost Surfboards</li>
              <li>Great for small waves</li>
              <li>Super fun and playful</li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Gun</h3>
            <ul className="space-y-2 text-gray-600">
              <li>7'0" Pyzel</li>
              <li>For bigger waves</li>
              <li>Stable and powerful</li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Recent Adventures */}
      <motion.section variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Recent Adventures</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Bali Surf Trip</h3>
              <p className="text-gray-600">Two weeks of perfect waves and cultural exploration</p>
              <p className="text-sm text-gray-500 mt-1">January 2024</p>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Big Wave Challenge</h3>
              <p className="text-gray-600">Conquered 12-foot waves at Pipeline</p>
              <p className="text-sm text-gray-500 mt-1">November 2023</p>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
} 