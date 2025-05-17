import React from "react";
import { motion } from "framer-motion";
import Navbar from "../utils/Navbar";
import Dock from "../utils/Dock";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden px-6">
      {/* Neon Blobs */}
      <motion.div
        className="absolute w-96 h-96 bg-pink-500 rounded-full filter blur-3xl opacity-50 top-10 left-10"
        animate={{ x: [0, 40, 0], y: [0, 40, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-50 bottom-10 right-10"
        animate={{ x: [0, -40, 0], y: [0, -40, 0] }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 text-center max-w-2xl"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mb-6 drop-shadow-lg tracking-wide">
          Welcome to <br />
          <span className="text-white">
            <Typewriter
              words={[
                "SmartLeave",
                "Happy Hours,Happy Team",
                "Leave Smart, Work Happy",
                "Manage Leave Effortlessly",
              ]}
              loop={0} // Infinite loop
              cursor
              cursorStyle="_"
              typeSpeed={80}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl mb-10">
          A Web-based application that simplifies the leave management process
          for employees.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 text-lg font-bold text-white border border-pink-500 rounded-xl neon-glow transition"
            onClick={() => navigate("/login")}
          >
            Login
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 text-lg font-bold text-white bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 rounded-xl shadow-lg hover:opacity-90 transition-all"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
