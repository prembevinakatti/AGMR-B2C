const express = require("express");
const { applyLeave } = require("../controllers/leave.controller");
const isAuthenticated = require("../middleware/isAuthenticated");

const router = express.Router();

router.route("/applyLeave").post(isAuthenticated,applyLeave)

module.exports = router;
