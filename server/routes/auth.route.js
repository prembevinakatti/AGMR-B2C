const express = require("express");
const { register, login, logout, getUser, updateUser } = require("../controllers/auth.controller");
const isAuthenticated = require("../middleware/isAuthenticated");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/getUser").get(isAuthenticated, getUser)
router.route("/updateUser").put(isAuthenticated, updateUser)

module.exports = router;
