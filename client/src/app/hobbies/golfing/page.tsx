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
            Not much to say here. I have only been golfing for a year and a half and I have no prior training. Once I started playing more consistently,
            I began tracking my scores with 18 Birdies. I am a line drive hero who swings the same distance with every club. On the bright side, with a handicap of +34, there is no where but up. More info soon to come!
          </p>
        </div>
      </motion.section>
    </motion.div>
  );
} 