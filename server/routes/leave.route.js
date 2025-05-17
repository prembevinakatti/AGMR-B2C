const express = require("express");
const { applyLeave } = require("../controllers/leave.controller");
const isAuthenticated = require("../middleware/isAuthenticated");
const {
  getPendingRequests,
  acceptORrejectRequest,
  getApprovedRequests,
  getRejectedRequests,
  getAllRequests,
  getUserRequests,
} = require("../controllers/leaveRequest.controller");

const router = express.Router();

router.route("/applyLeave").post(isAuthenticated, applyLeave);
router.route("/getPendingRequests").get(isAuthenticated, getPendingRequests);
router.route("/getApprovedRequests").get(isAuthenticated, getApprovedRequests);
router.route("/getAllRequests").get(isAuthenticated, getAllRequests);
router.route("/getUserRequests").get(isAuthenticated, getUserRequests);
router.route("/getRejectedRequests").get(isAuthenticated, getRejectedRequests);
router.route("/acceptOrrejectRequest").post(isAuthenticated, acceptORrejectRequest);

module.exports = router;
