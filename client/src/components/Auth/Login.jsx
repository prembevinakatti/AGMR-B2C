import React from 'react';
import { motion } from 'framer-motion';

const Login = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0d0d0d] overflow-hidden px-4">
      {/* Neon Animated Blobs */}
      <motion.div
        className="absolute w-96 h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-blob top-10 left-10"
        animate={{ x: [0, 20, 0], y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-blob top-40 right-10"
        animate={{ x: [0, -20, 0], y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-blob bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut', delay: 1 }}
      />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-10"
      >
        <h2 className="text-4xl font-extrabold text-center text-white mb-8 tracking-wider">
          🔐 Sign In
        </h2>

        <form className="space-y-8">
          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              id="email"
              required
              className="peer w-full bg-transparent border-2 border-blue-500 text-white font-bold rounded-xl px-5 pt-6 pb-2 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              placeholder="Email Address"
            />
            <label
              htmlFor="email"
              className="absolute left-5 top-2 text-sm text-blue-300 font-semibold transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-300"
            >
              Email Address
            </label>
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type="password"
              id="password"
              required
              className="peer w-full bg-transparent border-2 border-blue-500 text-white font-bold rounded-xl px-5 pt-6 pb-2 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              placeholder="Password"
            />
            <label
              htmlFor="password"
              className="absolute left-5 top-2 text-sm text-blue-300 font-semibold transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-300"
            >
              Password
            </label>
          </div>

          {/* Sign In Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full text-lg font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-3 rounded-xl shadow-lg hover:opacity-90 transition-all"
          >
            Sign In
          </motion.button>
        </form>

        {/* Register Link */}
        <div className="text-center mt-6 text-sm text-gray-300 font-semibold">
          Don't have an account?{' '}
          <a href="#" className="text-blue-400 hover:underline">
            Register
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
