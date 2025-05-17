const Leave = require("../models/leave.model");
const Auth = require("../models/auth.model");
const Department = require("../models/department.model");
const transporter = require("../services/emailServices");
const leaveReuqestModel = require("../models/leaveReuqest.model");

module.exports.applyLeave = async (req, res) => {
  try {
    const { leaveType, fromDate, toDate, details } = req.body;
    const userId = req.user._id;

    if (!userId) {
      console.log("User not found");
    }

    if (!leaveType || !fromDate || !toDate || !details) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if user exists and is an employee
    const employee = await Auth.findOne({ _id: userId, role: "Employee" });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Create leave record
    const leave = new Leave({
      userId,
      leaveType,
      fromDate,
      toDate,
      details,
    });
    await leave.save();

    // Find department by employee.department (string)
    const department = await Department.findOne({
      dname: employee.department,
    }).populate("dHead");
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    if (!department.dHead) {
      return res.status(404).json({ message: "Department head not assigned" });
    }

    // Fetch manager info from Auth collection
    const manager = await Auth.findById(department.dHead);
    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }

    // Prepare and send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: manager.email,
      subject: `New Leave Application from ${employee.name}`,
      text: `
Hello ${manager.name},

Employee ${employee.name} has applied for leave.

Leave Details:
- Type: ${leaveType}
- From: ${new Date(fromDate).toDateString()}
- To: ${new Date(toDate).toDateString()}
- Details: ${details}

Please review the application.

Regards,
HR System
      `,
    };

    await transporter.sendMail(mailOptions);

    const request = await leaveReuqestModel.create({
      mgrId: manager._id,
      empId: employee._id,
      status: "Pending",
    });

    if (!request) {
      return res
        .status(500)
        .json({ message: "Error while creating leave request." });
    }

    return res.status(201).json({
      message: "Leave applied and notification sent successfully.",
      success: true,
      leave: leave,
    });
  } catch (error) {
    console.error("Error in applyLeave:", error);
    return res
      .status(500)
      .json({ message: "Server error while applying leave." });
  }
};
