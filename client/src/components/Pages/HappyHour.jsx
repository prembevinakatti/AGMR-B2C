import React, { useState } from 'react';

const employees = [
  { id: 2, name: 'Alice', requestedHours: 4 },
  { id: 3, name: 'Bob', requestedHours: 6 },
];

const HappyHour = () => {
  const [yourBalance, setYourBalance] = useState(10); // assume user has 10 hours
  const [contributions, setContributions] = useState({});

  const handleChange = (id, value) => {
    setContributions({ ...contributions, [id]: parseInt(value) || 0 });
  };

  const handleSubmit = () => {
    const total = Object.values(contributions).reduce((a, b) => a + b, 0);
    if (total > yourBalance) {
      alert('You cannot donate more than your available hours!');
      return;
    }
    alert('Contribution request submitted for approval!');
    // Here, send to backend
    setYourBalance((prev) => prev - total);
    setContributions({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-500 animate-pulse">
        Happy Hours to Help
      </h1>
      <p className="text-center mb-4 text-gray-300">
        Your Current Leave Balance: <span className="text-yellow-400 font-semibold">{yourBalance} hours</span>
      </p>

      <div className="max-w-3xl mx-auto bg-black bg-opacity-30 border border-gray-700 rounded-lg p-6 shadow-lg">
        <table className="w-full text-sm text-left text-gray-300">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="p-3">Employee</th>
              <th className="p-3">Requested Hours</th>
              <th className="p-3">Your Contribution</th>
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
                    max={yourBalance}
                    className="w-20 px-2 py-1 bg-gray-800 text-white rounded-md border border-gray-600"
                    value={contributions[emp.id] || ''}
                    onChange={(e) => handleChange(emp.id, e.target.value)}
                  />
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
