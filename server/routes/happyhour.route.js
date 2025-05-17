const express = require("express");
const router = express.Router();
const { getLeaveBalance, makeContribution } = require("../controllers/happyHourController");
const authenticate = require("../middleware/auth"); // middleware to extract req.user
const isAuthenticated = require("../middleware/isAuthenticated");

// @route   GET /api/happyhour/leave-balance
router.get("/leave-balance", isAuthenticated, getLeaveBalance);

// @route   POST /api/happyhour/contribute
router.post("/contribute", isAuthenticated, makeContribution);

module.exports = router;
