const express = require("express");
const { getDepartmentName } = require("../controllers/department.controller");

const router = express.Router();

router.route("/getDepartNames").get(getDepartmentName);

module.exports = router;
