import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      console.log("Registration Data:", data);
      const response = await axios.post(
        `http://localhost:3000/api/agmr/auth/register`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        navigate("/login");
        toast.success(response.data.message);
      }
      console.log("Registration Response:", response.data);
      reset();
    } catch (err) {
      toast.error(error.response.data.message);
      console.error("Registration Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0d0d0d] overflow-hidden px-4">
      {/* Neon Animated Blobs */}
      <motion.div
        className="absolute w-96 h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-blob top-10 left-10"
        animate={{ x: [0, 20, 0], y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-blob top-40 right-10"
        animate={{ x: [0, -20, 0], y: [0, -20, 0] }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-purple-800 rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-blob bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 30, 0] }}
        transition={{
          repeat: Infinity,
          duration: 12,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Register Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-10"
      >
        <h2 className="text-4xl font-extrabold text-center text-white mb-8 tracking-wider">
          📝 Register
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Name Input */}
          <div className="relative">
            <input
              id="name"
              placeholder="Full Name"
              {...register("name", { required: "Full name is required" })}
              className={`peer w-full bg-transparent border-2 ${
                errors.name ? "border-red-500" : "border-blue-500"
              } text-white font-bold rounded-xl px-5 pt-6 pb-2 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-white transition-all`}
            />
            <label
              htmlFor="name"
              className="absolute left-5 top-2 text-sm text-white font-semibold transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-white"
            >
              Full Name
            </label>
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email Input */}
          <div className="relative">
            <input
              id="email"
              type="email"
              placeholder="Email Address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a valid email address",
                },
              })}
              className={`peer w-full bg-transparent border-2 ${
                errors.email ? "border-red-500" : "border-blue-500"
              } text-white font-bold rounded-xl px-5 pt-6 pb-2 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-white transition-all`}
            />
            <label
              htmlFor="email"
              className="absolute left-5 top-2 text-sm text-white font-semibold transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-white"
            >
              Email Address
            </label>
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              id="password"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={`peer w-full bg-transparent border-2 ${
                errors.password ? "border-red-500" : "border-blue-500"
              } text-white font-bold rounded-xl px-5 pt-6 pb-2 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-white transition-all`}
            />
            <label
              htmlFor="password"
              className="absolute left-5 top-2 text-sm text-white font-semibold transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-white"
            >
              Password
            </label>
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              className={`peer w-full bg-transparent border-2 ${
                errors.confirmPassword ? "border-red-500" : "border-blue-500"
              } text-white font-bold rounded-xl px-5 pt-6 pb-2 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-white transition-all`}
            />
            <label
              htmlFor="confirmPassword"
              className="absolute left-5 top-2 text-sm text-white font-semibold transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-white"
            >
              Confirm Password
            </label>
            {errors.confirmPassword && (
              <p className="text-red-400 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Register Button with Loader */}
          <motion.button
            whileHover={{ scale: !loading ? 1.03 : 1 }}
            whileTap={{ scale: !loading ? 0.97 : 1 }}
            type="submit"
            disabled={loading}
            className={`w-full text-lg font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-3 rounded-xl shadow-lg transition-all ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Registering...
              </div>
            ) : (
              "Register"
            )}
          </motion.button>
        </form>

        {/* Sign In Link */}
        <div className="text-center mt-6 text-sm text-gray-300 font-semibold">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 underline hover:underline">
            LogIn
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
