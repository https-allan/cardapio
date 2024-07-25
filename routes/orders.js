const express = require("express");
const router = express.Router();

router.get("/orders", (req, res) => {
  res.render("orders", {
    showBackgroundColor: true,
    showHeader: true,
    showFooter: true,
  });
});

module.exports = router;
