'use client';

import { motion } from 'framer-motion';
import ChessGame from '@/components/ChessGame';
import StrategyList from '@/components/StrategyList';
import AlgorithmFeatures from '@/components/AlgorithmFeatures';
import type { StrategyItem } from '@/components/StrategyList';
import type { AlgorithmFeature } from '@/components/AlgorithmFeatures';

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
  const botStrategies: StrategyItem[] = [
    { description: "Keep pieces on back rank", type: "development" },
    { description: "Move pieces to edges", type: "positioning" },
    { description: "Create isolated pieces", type: "tactical" },
    { description: "Make doubled pawns", type: "structural" },
    { description: "Keep king in center", type: "safety" },
  ];

  const algorithmFeatures: AlgorithmFeature[] = [
    {
      title: "Reversed Piece Values",
      description: "Higher scores indicate worse positions for black",
      type: "evaluation"
    },
    {
      title: "Position-based Penalties",
      description: "Rewards pieces for being in bad positions",
      type: "position"
    },
    {
      title: "Strategic Weaknesses",
      description: "Encourages creation of structural weaknesses",
      type: "strategy"
    }
  ];

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
            Chess has been a fascinating journey for me. I&apos;ve spent countless hours studying openings,
            analyzing positions, and playing games, yet somehow I always seem to find myself stuck at the
            same rating. It&apos;s like trying to solve a Rubik&apos;s cube while someone keeps adding new
            colors to it!
          </p>
          <p>
            After years of trying to improve and hitting that undeniable plateau, I decided to take a
            different approach. Instead of trying to build a bot that could beat me (which, let&apos;s be
            honest, wouldn&apos;t be that hard), I created something unique: a bot that&apos;s designed to
            lose. Using a <span className="font-semibold text-purple-600">minimax algorithm</span> with a 
            <span className="font-semibold text-purple-600"> reversed evaluation function</span>, this bot 
            actively tries to make the worst possible moves. It&apos;s like playing against someone who&apos;s 
            trying to lose, but in a way that makes you question your own chess abilities when you still 
            manage to lose to it!
          </p>
        </div>
      </motion.section>

      {/* Interactive Chess Game */}
      <motion.section variants={fadeInUp}>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Play a Game</h2>
        <div className="prose prose-lg max-w-none text-gray-600 mb-8">
          <p>
            Welcome to what might be the most humbling chess experience you&apos;ll ever have. I present to
            you a chess bot that&apos;s specifically programmed to lose. Yes, you read that right. After
            years of struggling to improve my own chess rating, I decided to create a bot that would make
            me feel better about my chess skills. The irony? It&apos;s still challenging to beat!
          </p>
          <p>
            This bot uses a <span className="font-semibold text-purple-600">minimax algorithm</span> with a 
            <span className="font-semibold text-purple-600"> progessive deepening</span> and 
            <span className="font-semibold text-purple-600"> alpha-beta pruning</span> for efficiency. 
            Instead of looking for the best moves, it actively seeks out the worst possible moves through a 
            <span className="font-semibold text-purple-600"> reversed evaluation function</span> that 
            rewards bad chess principles.
          </p>
          <div className="my-6">
            <AlgorithmFeatures items={algorithmFeatures} title="Algorithm&apos;s Key Design Choices" />
          </div>
          <div className="my-6">
            <StrategyList items={botStrategies} title="Bot&apos;s Losing Strategy" />
          </div>
          <p>
            Your challenge? Try to win against a bot that&apos;s trying to lose. If you still manage to
            lose to this bot, well... welcome to my world of chess frustration! Maybe we should start a
            support group for people who can&apos;t even beat a bot that&apos;s trying to lose.
          </p>
          <p className="text-sm text-gray-500 italic">
            Note: If you do lose to this bot, don&apos;t worry - it&apos;s probably just a bug in the
            <span className="font-semibold text-purple-600"> evaluation function</span>. Definitely not your 
            chess skills. Definitely not.
          </p>
        </div>
        <ChessGame />
      </motion.section>

      {/* Stats Section */}
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Stats</h2>
      <motion.section variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-purple-50 rounded-2xl p-6 text-center">
          <h3 className="text-2xl font-bold text-purple-600 mb-2">Rating</h3>
          <p className="text-4xl font-bold text-gray-900">1410</p>
          <p className="text-gray-600 mt-2">Chess.com</p>
        </div>
        <div className="bg-purple-50 rounded-2xl p-6 text-center">
          <h3 className="text-2xl font-bold text-purple-600 mb-2">Time Control</h3>
          <p className="text-4xl font-bold text-gray-900">10 Min</p>
          <p className="text-gray-600 mt-2">Rapid</p>
        </div>
        <div className="bg-purple-50 rounded-2xl p-6 text-center">
          <h3 className="text-2xl font-bold text-purple-600 mb-2">Puzzles</h3>
          <p className="text-4xl font-bold text-gray-900">2070</p>
          <p className="text-gray-600 mt-2">Chess.com</p>
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
                <span className="text-gray-700">King&apos;s Indian Attack</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                <span className="text-gray-700">Italian Game</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                <span className="text-gray-700">Hyper Accelerated Dragon</span>
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
                <span className="text-gray-700">King&apos;s Indian Defense</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                <span className="text-gray-700">Nimzo-Indian Defense</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
} 