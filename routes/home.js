const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home", { showHeader: true, showFooter: true });
});

module.exports = router;
