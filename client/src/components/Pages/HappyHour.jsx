import React, { useState } from "react";
import toast from "react-hot-toast";

const employees = [
  { id: "2", name: "Alice", requestedHours: 4 },
  { id: "3", name: "Bob", requestedHours: 6 },
];

// Simulated current user ID (replace with auth context/user session in real app)
const currentUserId = "1";

const HappyHour = () => {
  const [leaveBalances, setLeaveBalances] = useState({
    CL: 21,
    ML: 12,
    EL: 7,
    SL: 15,
  });

  const [contributions, setContributions] = useState({});
  const [leaveTypes, setLeaveTypes] = useState({});

  const handleChange = (id, value) => {
    setContributions({ ...contributions, [id]: parseInt(value) || 0 });
  };

  const handleLeaveTypeChange = (id, type) => {
    setLeaveTypes({ ...leaveTypes, [id]: type });
  };

  const getTotalContributionsByType = () => {
    const totals = { CL: 0, ML: 0, EL: 0, SL: 0 };
    for (const empId in contributions) {
      const leaveType = leaveTypes[empId];
      if (leaveType) {
        totals[leaveType] += contributions[empId] || 0;
      }
    }
    return totals;
  };

  const handleSubmit = async () => {
    const totals = getTotalContributionsByType();

    // Validate against available leave balances
    for (const type in totals) {
      if (totals[type] > leaveBalances[type]) {
        toast.error(
          `You cannot donate more ${type} than your available balance!`
        );
        return;
      }
    }

    // Submit contributions
    for (const empId in contributions) {
      const hours = contributions[empId];
      const leaveType = leaveTypes[empId];

      if (!leaveType || hours <= 0) {
        toast.error(
          "Please fill out all contributions with valid leave types and amounts."
        );
        return;
      }

      try {
        await fetch("/api/contribute", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fromUserId: currentUserId,
            toUserId: empId,
            hours,
            leaveType,
          }),
        });
      } catch (err) {
        toast.error("Failed to submit contribution.");
        return;
      }
    }

    // Update leave balances locally
    const newBalances = { ...leaveBalances };
    for (const type in totals) {
      newBalances[type] -= totals[type];
    }

    setLeaveBalances(newBalances);
    setContributions({});
    setLeaveTypes({});
    toast.success("Contributions submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-500 animate-pulse">
        Happy Hours to Help
      </h1>

      <div className="text-center mb-4">
        <p className="text-lg font-semibold text-gray-300 mb-2">
          Your Current Leave Balances:
        </p>
        <div className="flex justify-center gap-4 text-yellow-400 font-semibold">
          {Object.entries(leaveBalances).map(([type, value]) => (
            <span key={type}>
              {type}: {value}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-black bg-opacity-30 border border-gray-700 rounded-lg p-6 shadow-lg">
        <table className="w-full text-sm text-left text-gray-300">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="p-3">Employee</th>
              <th className="p-3">Requested Hours</th>
              <th className="p-3">Your Contribution</th>
              <th className="p-3">Leave Type</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="border-b border-gray-700">
                <td className="p-3">{emp.name}</td>
                <td className="p-3">{emp.requestedHours}</td>
                <td className="p-3">
                  <input
                    type="number"
                    min="0"
                    className="w-20 px-2 py-1 bg-gray-800 text-white rounded-md border border-gray-600"
                    value={contributions[emp.id] || ""}
                    onChange={(e) => handleChange(emp.id, e.target.value)}
                  />
                </td>
                <td className="p-3">
                  <select
                    value={leaveTypes[emp.id] || ""}
                    onChange={(e) =>
                      handleLeaveTypeChange(emp.id, e.target.value)
                    }
                    className="px-2 py-1 bg-gray-800 text-white border border-gray-600 rounded"
                  >
                    <option value="">Select Leave</option>
                    <option value="CL">CL</option>
                    <option value="ML">ML</option>
                    <option value="EL">EL</option>
                    <option value="SL">SL</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white font-semibold shadow-md hover:scale-105 transition"
          >
            Submit Contribution
          </button>
        </div>
      </div>
    </div>
  );
};

export default HappyHour;
