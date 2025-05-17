const express = require("express");
const { applyLeave } = require("../controllers/leave.controller");
const isAuthenticated = require("../middleware/isAuthenticated");
const {
  getPendingRequests,
  acceptORrejectRequest,
} = require("../controllers/leaveRequest.controller");

const router = express.Router();

router.route("/applyLeave").post(isAuthenticated, applyLeave);
router.route("/getPendingRequests").get(isAuthenticated, getPendingRequests);
router.route("/acceptOrrejectRequest").post(isAuthenticated, acceptORrejectRequest);

module.exports = router;
