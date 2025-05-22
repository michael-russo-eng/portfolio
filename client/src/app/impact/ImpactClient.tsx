'use client';

import { motion } from 'framer-motion';

interface ImpactClientProps {
  message: string;
}

export default function ImpactClient({ message }: ImpactClientProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[calc(100vh-5rem)] py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent mb-4">
            Impact
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            This page demonstrates Server-Side Rendering in Next.js
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Server-Side Rendered Message
            </h2>
            <p className="text-xl text-blue-600 font-medium">
              {message}
            </p>
            <p className="mt-4 text-gray-600">
              This message was fetched on the server side during page load.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 