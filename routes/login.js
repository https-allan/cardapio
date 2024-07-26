const express = require("express");
const passport = require("passport");
const router = express.Router();

const { ensureAuthenticated } = require("../middleware/auth");

router.get("/login", (req, res) => {
  res.render("users/login");
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
});

module.exports = router;
