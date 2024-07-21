const express = require("express");
const router = express.Router();

router.get("/promontions", (req, res) => {
  res.render("promotions");
});

module.exports = router;
