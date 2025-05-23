'use client';

import { motion } from 'framer-motion';

export interface AlgorithmFeature {
  title: string;
  description: string;
  type: 'evaluation' | 'position' | 'strategy';
}

interface AlgorithmFeaturesProps {
  items: AlgorithmFeature[];
  title?: string;
}

const typeStyles = {
  evaluation: 'bg-indigo-50 text-indigo-700 border-indigo-100',
  position: 'bg-rose-50 text-rose-700 border-rose-100',
  strategy: 'bg-amber-50 text-amber-700 border-amber-100',
};

const typeIcons = {
  evaluation: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  position: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  ),
  strategy: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
};

export default function AlgorithmFeatures({ items, title = "Algorithm Features" }: AlgorithmFeaturesProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">{title}</h3>
      <div className="grid grid-cols-1 gap-3">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-start space-x-3 p-3 rounded-lg border ${typeStyles[item.type]}`}
          >
            <span className="flex-shrink-0 mt-0.5">
              {typeIcons[item.type]}
            </span>
            <div>
              <h4 className="font-medium mb-0.5">{item.title}</h4>
              <p className="text-sm opacity-90">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 