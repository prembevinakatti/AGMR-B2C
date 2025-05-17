const User = require("../models/User");
const Contribution = require("../models/Contribution");

// GET /api/happyhour/leave-balance
exports.getLeaveBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("CL ML EL SL");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// POST /api/happyhour/contribute
exports.makeContribution = async (req, res) => {
  const fromUserId = req.user._id;
  const { toUserId, hours, leaveType } = req.body;

  if (!toUserId || !hours || !leaveType) {
    return res.status(400).json({ message: "Missing fields in request body" });
  }

  if (!["CL", "ML", "EL", "SL"].includes(leaveType)) {
    return res.status(400).json({ message: "Invalid leave type" });
  }

  try {
    const fromUser = await User.findById(fromUserId);
    const toUser = await User.findById(toUserId);

    if (!fromUser || !toUser) {
      return res.status(404).json({ message: "Invalid user(s)" });
    }

    if (fromUser[leaveType] < hours) {
      return res.status(400).json({ message: `Insufficient ${leaveType} balance` });
    }

    // Update donor's leave balance
    fromUser[leaveType] -= hours;
    await fromUser.save();

    // Record the contribution
    const contribution = new Contribution({
      fromUser: fromUserId,
      toUser: toUserId,
      hours,
      leaveType,
    });
    await contribution.save();

    res.status(200).json({ message: "Contribution successful", contribution });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
    