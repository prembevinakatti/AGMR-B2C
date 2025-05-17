const cookieParser = require("cookie-parser");
const express = require("express");
const connectDB = require("./config/database.config");
const authRoute = require("./routes/auth.route");
const departmentRoute = require("./routes/department.route");
const leaveRoute = require("./routes/leave.route");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOption));

app.use("/api/agmr/auth", authRoute);
app.use("/api/agmr/departments", departmentRoute);
app.use("/api/agmr/emp/leave", leaveRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
