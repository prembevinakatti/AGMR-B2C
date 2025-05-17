import React, { useState } from "react";
import { motion } from "framer-motion";
import useGetAllRequests from "@/hooks/useGetAllRequests";

const tabs = ["All", "Pending", "Approved", "Rejected"];

const StatusPage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const allRequests = useGetAllRequests();

  // Simulated manager details (replace with real source)
  const manager = {
    department: "HR",
  };

  console.log("All Requests : ", allRequests);

  // Filter requests where employee's department matches manager's department
  const sameDeptRequests = allRequests.filter(
    (item) => item.empId.department === manager.department
  );

  const filteredData =
    activeTab === "All"
      ? sameDeptRequests
      : sameDeptRequests.filter((item) => item.status === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 animate-pulse">
        Leave Application Status
      </h1>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full font-semibold text-sm transition-all shadow-md border ${
              activeTab === tab
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-pink-400"
                : "bg-black text-gray-300 hover:bg-gray-800 border-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-x-auto max-w-4xl mx-auto"
      >
        <table className="w-full bg-black bg-opacity-30 backdrop-blur-md border border-gray-700 rounded-lg shadow-lg">
          <thead>
            <tr className="text-left text-sm text-gray-300 border-b border-gray-600">
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr
                  key={item._id}
                  className="border-t border-gray-700 hover:bg-gray-800 transition"
                >
                  <td className="p-3">{item.empId.empNo}</td>
                  <td className="p-3">{item.empId.name}</td>
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
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default StatusPage;
