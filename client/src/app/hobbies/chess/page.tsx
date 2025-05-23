'use client';

import { motion } from 'framer-motion';
import ChessGame from '@/components/ChessGame';

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
            rewards bad chess principles. The algorithm&apos;s key design choices include:
          </p>
          <ul>
            <li>
              <span className="font-semibold text-purple-600">Reversed piece values</span> - Higher scores 
              indicate worse positions for black
            </li>
            <li>
              <span className="font-semibold text-purple-600">Position-based penalties</span> - Rewards 
              pieces for being in bad positions
            </li>
            <li>
              <span className="font-semibold text-purple-600">Strategic weaknesses</span> - Encourages 
              creation of structural weaknesses
            </li>
          </ul>
          <p>
            The bot will consistently try to:
          </p>
          <ul>
            <li>Keep its pieces on the <span className="font-semibold text-purple-600">back rank</span> (undeveloped)</li>
            <li>Move pieces to the <span className="font-semibold text-purple-600">edges of the board</span> (poor positioning)</li>
            <li>Create <span className="font-semibold text-purple-600">isolated pieces</span> (tactical weaknesses)</li>
            <li>Make <span className="font-semibold text-purple-600">doubled pawns</span> (structural weaknesses)</li>
            <li>Keep its <span className="font-semibold text-purple-600">king in the center</span> (safety risk)</li>
          </ul>
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
                <span className="text-gray-700">King's Indian Attack</span>
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
    </motion.div>
  );
} 