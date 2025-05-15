const mongoose = require("mongoose");

const connectDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log("Connected to MONGODB");
    });
  } catch (error) {
    console.log("Error Connecting to MONGODB : ", error.message);
  }
};

module.exports = connectDB;
