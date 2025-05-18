import React, { useState } from "react";
import { motion } from "framer-motion";
import useGetPendingRequests from "@/hooks/useGetPendingRequests";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AcceptReject = () => {
  const pendingRequests = useGetPendingRequests();
  const navigate = useNavigate();
  const [loadingId, setLoadingId] = useState(null); // ← loader state

  const handleAction = async (id, action) => {
    setLoadingId(id); // ← start loader
    try {
      const response = await axios.post(
        `http://localhost:3000/api/agmr/emp/leave/acceptOrrejectRequest`,
        { requestId: id, status: action },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/status");
      }
      console.log("Action successful:", response.data);
    } catch (error) {
      console.error("Action failed:", error);
      toast.error("Action failed. Please try again.");
    } finally {
      setLoadingId(null); // ← stop loader
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500 animate-pulse">
        Manage Leave Requests
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-x-auto max-w-4xl mx-auto"
      >
        <table className="w-full bg-black bg-opacity-30 backdrop-blur-md border border-gray-700 rounded-lg shadow-lg">
          <thead>
            <tr className="text-left text-sm text-gray-300 border-b border-gray-600">
              <th className="p-3">Emp No</th>
              <th className="p-3">Name</th>
              <th className="p-3">From Date</th>
              <th className="p-3">To Date</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingRequests.length > 0 ? (
              pendingRequests.map((item) => (
                <tr
                  key={item._id}
                  className="border-t border-gray-700 hover:bg-gray-800 transition"
                >
                  <td className="p-3">{item.empId?.empNo}</td>
                  <td className="p-3">{item.empId?.name || "No Name"}</td>
                  <td className="p-3">
                    {new Date(item.leaveId.fromDate).toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </td>
                  <td className="p-3">
                    {new Date(item.leaveId.toDate).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold shadow-md ${
                        item.status === "Approved"
                          ? "bg-green-500 text-black"
                          : item.status === "Rejected"
                          ? "bg-red-500 text-black"
                          : "bg-yellow-400 text-black"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="p-3 text-center space-x-2">
                    {loadingId === item._id ? (
                      <div className="text-sm text-purple-400 animate-pulse">
                        Processing...
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => handleAction(item._id, "Approved")}
                          className="bg-green-500 hover:bg-green-600 text-black px-3 py-1 text-xs rounded-full font-semibold transition"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleAction(item._id, "Rejected")}
                          className="bg-red-500 hover:bg-red-600 text-black px-3 py-1 text-xs rounded-full font-semibold transition"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No pending requests.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default AcceptReject;
