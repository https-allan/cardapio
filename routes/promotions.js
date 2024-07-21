const express = require("express");
const router = express.Router();

router.get("/promotions", (req, res) => {
  res.render("promotions");
});

module.exports = router;
