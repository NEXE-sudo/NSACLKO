'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ChallengeCard from "../components/ChallengeCard";
import "../styles/challenges.css";
import "../styles/base.css";

const categories = ["All", "Space Innovation", "Data Science", "AI/ML", "Games"];
const difficulties = ["All", "Beginner", "Intermediate", "Advanced", "Expert"];

const challenges = [
  {
    id: 1,
    title: "Space Innovation Lab",
    description: "Design and prototype innovative solutions for space exploration using NASA's open-source data and APIs.",
    category: "Space Innovation",
    difficulty: "Advanced",
    points: 500,
    startDate: "2025-07-01",
    registrationOpen: true,
  },
  {
    id: 2,
    title: "Cosmic Data Visualization",
    description: "Create compelling visualizations of space data to help communicate complex astronomical concepts.",
    category: "Data Science",
    difficulty: "Intermediate",
    points: 300,
    startDate: "2025-06-25",
    registrationOpen: true,
  },
  {
    id: 3,
    title: "AI Space Applications",
    description: "Develop AI-powered solutions for space exploration, satellite imaging, or astronomical data analysis.",
    category: "AI/ML",
    difficulty: "Expert",
    points: 600,
    startDate: "2025-07-15",
    registrationOpen: false,
  },
  {
    id: 4,
    title: "Space Survival Simulator",
    description: "Create an engaging game that simulates survival challenges in space environments.",
    category: "Games",
    difficulty: "Intermediate",
    points: 400,
    startDate: "2025-06-30",
    registrationOpen: true,
  },
  {
    id: 5,
    title: "Mars Mission Control",
    description: "Design a strategic game for managing resources and operations on a Mars colony.",
    category: "Games",
    difficulty: "Advanced",
    points: 450,
    startDate: "2025-07-10",
    registrationOpen: false,
  },
];

export default function ChallengePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [filteredChallenges, setFilteredChallenges] = useState(challenges);
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const filtered = challenges.filter((challenge) => {
      const categoryMatch = selectedCategory === "All" || challenge.category === selectedCategory;
      const difficultyMatch = selectedDifficulty === "All" || challenge.difficulty === selectedDifficulty;
      return categoryMatch && difficultyMatch;
    });
    setFilteredChallenges(filtered);
  }, [selectedCategory, selectedDifficulty]);

  useEffect(() => {
    const timer = setInterval(() => {
      const times: { [key: string]: string } = {};
      challenges.forEach((challenge) => {
        const start = new Date(challenge.startDate).getTime();
        const now = new Date().getTime();
        const distance = start - now;

        if (distance > 0) {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          times[challenge.id] = `${days}d ${hours}h`;
        } else {
          times[challenge.id] = "Started";
        }
      });
      setTimeLeft(times);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="challenges-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="challenges-content"
      >
        {/* Hero Section */}
        <section className="hero-section">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="hero-title text-5xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            HACKATHON CHALLENGES
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="hero-subtitle text-center text-xl text-gray-300 mb-12"
          >
            Embark on an extraordinary journey of innovation and creativity
            through our carefully crafted challenges
          </motion.p>
        </section>

        {/* Filters */}
        <div className="filters mb-8 flex flex-wrap gap-4 justify-center">
          <div className="filter-group">
            <label className="text-gray-400 mr-2">Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="text-gray-400 mr-2">Difficulty:</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {difficulties.map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Challenge Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredChallenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              title={challenge.title}
              description={challenge.description}
              difficulty={challenge.difficulty}
              points={challenge.points}
              startDate={`${challenge.startDate} (${timeLeft[challenge.id]})`}
              registrationOpen={challenge.registrationOpen}
            />
          ))}
        </motion.div>

        {filteredChallenges.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-400 mt-8"
          >
            No challenges found with the selected filters.
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
