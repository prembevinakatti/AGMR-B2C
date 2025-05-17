const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const authSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    empNo: {
      type: String,
    },
    role: {
      type: String,
      enum: ["Manager", "Employee"],
      required: true,
    },
    profession: {
      type: String,
      enum: ["Developer", "Testing", "HR", "Other"],
      required: function () {
        return this.role === "Employee";
      },
    },
    CL: {
      type: Number,
      default: 21,
    },
    ML: {
      type: Number,
      default: 12,
    },
    EL: {
      type: Number,
      default: 7,
    },
    SL: {
      type: Number,
      default: 15,
    },
    department: {
      type: String,
      required: true,
    },
    mgrNo: {
      type: String,
    },
  },
  { timestamps: true }
);

// Hash password before saving
authSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = mongoose.model("Auth", authSchema);
