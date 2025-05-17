const leaveRequestModel = require("../models/leaveReuqest.model");
const transporter = require("../services/emailServices");

module.exports.getPendingRequests = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    console.log("userId : ", userId);

    const pendingRequests = await leaveRequestModel
      .find({
        mgrId: userId,
        status: "Pending",
      })
      .populate("empId");

    if (!pendingRequests || pendingRequests.length === 0) {
      return res.status(404).json({ message: "No Pending Requests Found" });
    }

    return res.status(200).json({
      message: "Pending Requests Found",
      success: true,
      pendingRequests,
    });
  } catch (error) {
    console.error("Error Getting Pending Requests:", error.message);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};


module.exports.acceptORrejectRequest = async (req, res) => {
  try {
    const userId = req.user._id;
    const { requestId, status } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!requestId || !status) {
      return res
        .status(400)
        .json({ message: "Bad Request: requestId and status required" });
    }

    // Find leave request by ID and populate employee info
    const leaveRequest = await leaveRequestModel
      .findById(requestId)
      .populate("empId");
    if (!leaveRequest) {
      return res.status(404).json({ message: "Leave Request Not Found" });
    }

    // Validate and normalize status input
    const newStatus =
      status.toLowerCase() === "approved"
        ? "Approved"
        : status.toLowerCase() === "rejected"
        ? "Rejected"
        : null;

    if (!newStatus) {
      return res
        .status(400)
        .json({
          message: "Invalid status value. Use 'approved' or 'rejected'.",
        });
    }

    leaveRequest.status = newStatus;
    await leaveRequest.save();

    // Prepare email notification to employee
    const employeeEmail = leaveRequest.empId.email;
    const employeeName = leaveRequest.empId.name || "Employee";

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: employeeEmail,
      subject: `Your leave request has been ${newStatus}`,
      text: `Hello ${employeeName},\n\nYour leave request has been ${newStatus.toLowerCase()} by your manager.\n\nRegards,\nHR Team`,
    };

    // Send email with await and catch errors separately
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent:", info.response);
    } catch (emailError) {
      console.error("Error sending email notification:", emailError);
    }

    return res.status(200).json({ message: `Leave Request ${newStatus}` });
  } catch (error) {
    console.error("Error accepting or rejecting request:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
