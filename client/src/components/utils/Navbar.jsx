import React from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <nav className="w-full px-6 py-4 flex justify-center items-center bg-gray-800/30 backdrop-blur-md border-b border-white/10 fixed top-0 z-50 shadow-lg rounded-b-xl">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 drop-shadow-[0_0_12px_rgba(255,0,255,0.6)]"
      >
        NeonChain
      </motion.h1>
    </nav>
  );
};

export default Navbar;
