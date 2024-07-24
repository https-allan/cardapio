const express = require("express");
const router = express.Router();

const User = require("../model/User");

router.get("/register", (req, res) => {
  res.render("login/register", { isRegisterRoute: false });
});

module.exports = router;
