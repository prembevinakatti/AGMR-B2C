const authModel = require("../models/auth.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Department = require("../models/department.model");

module.exports.register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      confirmPassword,
      role,
      department,
      empNo,
      mgrNo,
      profession,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !role ||
      !department
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    if (role === "Manager" && !mgrNo) {
      return res.status(400).json({
        success: false,
        message: "Manager Number is required for Manager role",
      });
    }

    if (role === "Employee") {
      if (!empNo) {
        return res.status(400).json({
          success: false,
          message: "Employee Number is required for Employee role",
        });
      }

      if (!profession) {
        return res.status(400).json({
          success: false,
          message: "Profession is required for Employee role",
        });
      }

      const allowedProfessions = ["Developer", "Testing", "HR", "Other"];
      if (!allowedProfessions.includes(profession)) {
        return res.status(400).json({
          success: false,
          message: `Profession must be one of: ${allowedProfessions.join(
            ", "
          )}`,
        });
      }
    }

    const existingUser = await authModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // 🧩 Check if department exists for Employee
    let existingDepartment = null;
    if (role === "Employee") {
      existingDepartment = await Department.findOne({ dname: department });
      if (!existingDepartment) {
        return res.status(400).json({
          success: false,
          message: "Department does not exist. Please contact your manager.",
        });
      }
    }

    // Create user
    const newUser = await authModel.create({
      name,
      email,
      password,
      role,
      department,
      empNo: role === "Employee" ? empNo : undefined,
      mgrNo: role === "Manager" ? mgrNo : undefined,
      profession: role === "Employee" ? profession : undefined,
    });

    // 🧑‍💼 If Manager, create new department
    if (role === "Manager") {
      await Department.create({
        dname: department,
        dHead: newUser._id,
        Demployee: [],
      });
    }

    // 👨‍💻 If Employee, add to existing department
    if (role === "Employee" && existingDepartment) {
      existingDepartment.Demployee.push(newUser._id);
      await existingDepartment.save();
    }

    // JWT Token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_TOKEN, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        profession: newUser.profession || null,
      },
    });
  } catch (error) {
    console.error("Error registering user in server:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await authModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ user: user }, process.env.JWT_TOKEN, {
      expiresIn: "7d",
    });

    res.cookie("token", token);

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user,
    });
  } catch (error) {
    console.error("Error logging user in server:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports.logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error("Error Logging out user in server:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports.getUser = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res
        .status(400)
        .json({ message: "User Id Required", success: false });
    }

    const user = await authModel.findById(userId);

    if (!user) {
      return res
        .status(400)
        .json({ message: "User Not Found", success: false });
    }

    return res
      .status(200)
      .json({ message: "User Found Successfully", success: true, user: user });
  } catch (error) {
    console.error("Error Getting User in server:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      newName,
      newEmail,
      currentPassword,
      newPassword,
      confirmNewPassword,
    } = req.body;

    if (
      !newName ||
      !newEmail ||
      !newPassword ||
      !confirmNewPassword ||
      !currentPassword
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    if (newPassword !== confirmNewPassword) {
      return res
        .status(400)
        .json({ message: "Passwords do not match", success: false });
    }

    const existingUser = await authModel.findById(userId);

    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "User Not Found", success: false });
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Invalid current password", success: false });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await authModel.findByIdAndUpdate(
      userId,
      {
        name: newName,
        email: newEmail,
        password: hashedNewPassword,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "User Updated Successfully",
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error Updating User in server:", error.message);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
