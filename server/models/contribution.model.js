const mongoose = require("mongoose");

const contributionSchema = new mongoose.Schema({
  fromUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  toUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  hours: Number,
  leaveType: { type: String, enum: ["CL", "ML", "EL", "SL"] },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Contribution", contributionSchema);
