import React, { useState } from 'react';
import { motion } from 'framer-motion';

const initialRequests = [
  { id: 1, name: 'Alice', status: 'Pending', date: '2025-05-10', reason: 'Medical' },
  { id: 2, name: 'Bob', status: 'Pending', date: '2025-05-12', reason: 'Vacation' },
  { id: 3, name: 'Charlie', status: 'Pending', date: '2025-05-13', reason: 'Personal' },
];

const AcceptReject = () => {
  const [requests, setRequests] = useState(initialRequests);

  const handleAction = (id, action) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: action } : req
      )
    );
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
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Date</th>
              <th className="p-3">Reason</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              requests.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-gray-700 hover:bg-gray-800 transition"
                >
                  <td className="p-3">{item.id}</td>
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.date}</td>
                  <td className="p-3">{item.reason}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold shadow-md ${
                        item.status === 'Approved'
                          ? 'bg-green-500 text-black'
                          : item.status === 'Rejected'
                          ? 'bg-red-500 text-black'
                          : 'bg-yellow-400 text-black'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="p-3 text-center space-x-2">
                    <button
                      onClick={() => handleAction(item.id, 'Approved')}
                      className="bg-green-500 hover:bg-green-600 text-black px-3 py-1 text-xs rounded-full font-semibold transition"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleAction(item.id, 'Rejected')}
                      className="bg-red-500 hover:bg-red-600 text-black px-3 py-1 text-xs rounded-full font-semibold transition"
                    >
                      Reject
                    </button>
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
