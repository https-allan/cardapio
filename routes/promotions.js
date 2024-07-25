const express = require("express");
const router = express.Router();

router.get("/promotions", (req, res) => {
  res.render("promotions", {
    showBackground: true,
    showHeader: true,
    showFooter: true,
  });
});

module.exports = router;
