const departmentModel = require("../models/department.model");

module.exports.getDepartmentName = async (req, res) => {
  try {
    const departments = await departmentModel.find().select("dname");

    if (!departments || departments.length === 0) {
      return res.status(400).json({ message: "No departments found" });
    }

    return res.status(200).json({
      message: "Departments found",
      success: true,
      departments,
    });
  } catch (error) {
    console.error("Error in getDepartmentName", error.message);
    return res.status(500).json({ message: "Server error", success: false });
  }
};
