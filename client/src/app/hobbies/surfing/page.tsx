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
            I started surfing years ago with my brother back in New Jersey. My first surf board was about as good as what you can expect $20 will get you at a yard sale. Once given the opportunity to relocate, I moved to San Diego, CA in 2021. This
            is my favorite hobby when I have some time to step away from the computer. I&apos;ve been taking lessons for the past two years with the hopes of
            one day not getting out classed by the local groms. 
          </p>
          <p>
            There&apos;s something magical about catching that perfect wave - it&apos;s like dancing with the ocean.
          </p>
          <p>
            I&apos;ve been chasing waves for years, and I&apos;m still learning.
          </p>
          <p>
            It&apos;s not about being the best, it&apos;s about the journey.
          </p>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-purple-50 rounded-2xl p-6 text-center">
          <h3 className="text-2xl font-bold text-purple-600 mb-2">Experience</h3>
          <p className="text-4xl font-bold text-gray-900">12+</p>
          <p className="text-gray-600 mt-2">Years Surfing</p>
        </div>
        <div className="bg-purple-50 rounded-2xl p-6 text-center">
          <h3 className="text-2xl font-bold text-purple-600 mb-2">Fins Setup</h3>
          <p className="text-4xl font-bold text-gray-900">3 Fin</p>
          <p className="text-gray-600 mt-2">Thrusters</p>
        </div>
        <div className="bg-purple-50 rounded-2xl p-6 text-center">
          <h3 className="text-2xl font-bold text-purple-600 mb-2">Favorite Board</h3>
          <p className="text-4xl font-bold text-gray-900">5&apos;8 27.2L</p>
          <p className="text-gray-600 mt-2">SharpEye Inferno 72</p>
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
                <span className="text-gray-700">Scripps Pier</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                <span className="text-gray-700">Sunset Cliffs</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                <span className="text-gray-700">Black&apos;s Beach</span>
              </li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">International</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                <span className="text-gray-700">El Sunzal, El Salvador </span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                <span className="text-gray-700">Las Gaviotas, Mexico</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                <span className="text-gray-700">Colorados, Nicaragua</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
} 