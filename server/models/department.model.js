const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  dname: {
    type: String,
    required: true,
  },
  dHead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auth",
    required: true,
  },

  Demployee: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
  ],
});

module.exports = mongoose.model("Department", departmentSchema);
