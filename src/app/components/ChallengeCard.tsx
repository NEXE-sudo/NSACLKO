'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ChallengeCardProps {
  title: string;
  description: string;
  difficulty: string;
  points: number;
  startDate?: string;
  registrationOpen?: boolean;
}

export default function ChallengeCard({
  title,
  description,
  difficulty,
  points,
  startDate,
  registrationOpen = true,
}: ChallengeCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-green-500/20 text-green-400';
      case 'intermediate':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'advanced':
      case 'expert':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-blue-500/20 text-blue-400';
    }
  };

  return (
    <motion.div
      className="challenge-card group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="p-6 relative z-10">
          <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {title}
          </h3>
          <p className="text-gray-300 mb-4">{description}</p>
          
          <div className="flex items-center justify-between mt-4">
            <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(difficulty)}`}>
              {difficulty}
            </span>
            <span className="text-yellow-400 font-semibold">{points} Points</span>
          </div>

          {startDate && (
            <div className="mt-4 text-sm text-gray-400">
              Starts: {startDate}
            </div>
          )}

          <motion.button
            className={`mt-4 w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 
              ${registrationOpen 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-gray-600 cursor-not-allowed text-gray-300'}`}
            whileHover={registrationOpen ? { scale: 1.02 } : {}}
            whileTap={registrationOpen ? { scale: 0.98 } : {}}
            disabled={!registrationOpen}
          >
            {registrationOpen ? 'Register Now' : 'Coming Soon'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
