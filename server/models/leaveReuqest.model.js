const mongoose = require("mongoose");

const leaveRequestSchema = new mongoose.Schema({
  mgrId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auth",
  },
  empId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auth",
  },
  leaveId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Leave",
  },
  status: {
    type: String,
    required: true,
    enum: ["Pending", "Approved", "Rejected"],
  },
});

module.exports = mongoose.model("LeaveRequest", leaveRequestSchema);
