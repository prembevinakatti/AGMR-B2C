const mongoose = require("mongoose");

const empSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  leaveType: {
    type: String,
    required: true,
    enum: ["Casual", "Bereavement", "Sick", "Marriage","Maternity", "Study"],
  },
  fromDate: {
    type: Date,
    required: true,
  },
  toDate: {
    type: Date,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Leave", empSchema);
