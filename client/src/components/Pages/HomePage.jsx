import React from "react";
import { motion } from "framer-motion";
import Dock from "../utils/Dock";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black px-6 py-12 flex flex-col items-center justify-center text-white">
      {/* Welcome Section */}
      <motion.h1
        className="text-4xl md:text-6xl font-extrabold text-center bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text drop-shadow-lg mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome Back to NeonChain
      </motion.h1>

      <motion.p
        className="text-center text-lg md:text-xl text-gray-300 max-w-2xl mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Your decentralized health records are securely stored and always
        accessible. Empowering you with privacy-first blockchain technology.
      </motion.p>

      {/* Action Buttons */}
      <motion.div
        className="flex gap-6 flex-wrap justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <button className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-lg">
          Upload Record
        </button>
        <button className="px-8 py-3 border border-blue-500 text-blue-400 rounded-xl font-bold hover:bg-blue-500 hover:text-white transition-all shadow-md">
          View My Files
        </button>
      </motion.div>
      <Dock />
    </div>
  );
};

export default HomePage;
