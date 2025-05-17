import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ApplyLeavePage = () => {
  const [formData, setFormData] = useState({
    leaveType: "",
    fromDate: "",
    toDate: "",
    details: "",
  });

  const [loading, setLoading] = useState(false); // ⬅️ Loader state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ⬅️ Start loader

    try {
      const response = await axios.post(
        `http://localhost:3000/api/agmr/emp/leave/applyLeave`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        navigate("/home");
        toast.success(response.data.message);
      }
      console.log("Leave Application Response:", response.data);
    } catch (error) {
      console.log("Error In Submitting Leave : ", error);
    }

    setLoading(false); // ⬅️ Stop loader
    console.log("Submitting Leave Application:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4 py-12 flex items-center justify-center text-white">
      <motion.div
        className="w-full my-20 max-w-xl bg-gray-800 rounded-2xl shadow-2xl p-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-center text-cyan-400 mb-6">
          Apply for Leave
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ...form fields... */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Leave Type
            </label>
            <select
              name="leaveType"
              value={formData.leaveType}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="">Select a type</option>
              <option value="Casual">CL</option>
              <option value="Sick">SL</option>
              <option value="Maternity">ML</option>
              <option value="Earned">EL</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Start Date
            </label>
            <input
              type="date"
              name="fromDate"
              value={formData.fromDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              End Date
            </label>
            <input
              type="date"
              name="toDate"
              value={formData.toDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Details
            </label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              rows={4}
              placeholder="Explain briefly..."
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
              required
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: !loading ? 1.05 : 1 }}
            whileTap={{ scale: !loading ? 0.95 : 1 }}
            disabled={loading}
            className={`w-full font-bold py-3 rounded-xl shadow-lg transition-all ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit Application"
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ApplyLeavePage;
