import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { authUser } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      {authUser && authUser ? (
        <>
          <nav className="w-full px-6 py-4 flex justify-center items-center bg-gray-900/40 backdrop-blur-md border-b border-white/10 fixed top-0 z-50 shadow-md rounded-b-2xl">
            <motion.h1
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 drop-shadow-[0_0_10px_rgba(255,0,255,0.6)] cursor-pointer"
            >
              SmartLeave
            </motion.h1>
          </nav>
        </>
      ) : (
        <>
          <nav className="w-full px-6 py-4 flex justify-between items-center bg-gray-900/40 backdrop-blur-md border-b border-white/10 fixed top-0 z-50 shadow-md rounded-b-2xl">
            <motion.h1
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 drop-shadow-[0_0_10px_rgba(255,0,255,0.6)] cursor-pointer"
            >
              SmartLeave
            </motion.h1>

            {location.pathname === "/login" ||
            location.pathname === "/register" ? (
              <></>
            ) : (
              <>
                <motion.button
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative px-6 py-2 rounded-lg text-white font-semibold bg-transparent border-2 border-transparent bg-gradient-to-r from-purple-600 to-blue-500 hover:from-pink-500 hover:to-purple-600 transition-all duration-300"
                >
                  <span className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></span>
                  <span
                    className="relative z-10"
                    onClick={() => navigate("/login")}
                  >
                    Get Started
                  </span>
                </motion.button>
              </>
            )}
          </nav>
        </>
      )}
    </>
  );
};

export default Navbar;
