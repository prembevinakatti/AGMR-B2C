import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { authUser } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const role = authUser?.role; // safely extract role
  const isManager = role === "Manager"; // match with schema value (case-sensitive)

  const headingText = isManager ? "Welcome Manager" : "Welcome Employee";

  const subText = isManager
    ? "Manage employee leave requests and view team attendance seamlessly."
    : "Apply for leave and track your approval status with ease.";

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black px-6 py-12 flex flex-col items-center justify-center text-white">
      <motion.h1
        className="text-4xl md:text-6xl font-extrabold text-center bg-gradient-to-r from-green-400 via-cyan-500 to-blue-500 text-transparent bg-clip-text drop-shadow-lg mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {headingText}
      </motion.h1>

      <motion.p
        className="text-center text-lg md:text-xl text-gray-300 max-w-2xl mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        {subText}
      </motion.p>

      <motion.div
        className="flex gap-6 flex-wrap justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        {!isManager && (
          <>
            <button
              onClick={() => navigate("/apply-leave")}
              className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-lg"
            >
              Apply for Leave
            </button>
            <button className="px-8 py-3 border border-blue-500 text-blue-400 rounded-xl font-bold hover:bg-blue-500 hover:text-white transition-all shadow-md">
              My Leave Status
            </button>
          </>
        )}

        {isManager && (
          <>
            <button className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-lg">
              Review Leave Requests
            </button>
            <button className="px-8 py-3 border border-yellow-500 text-yellow-400 rounded-xl font-bold hover:bg-yellow-500 hover:text-white transition-all shadow-md">
              View Team Leaves
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default HomePage;
