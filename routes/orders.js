const express = require("express");
const router = express.Router();

router.get("/orders", (req, res) => {
  res.render("orders", { isBackGroundPage: true });
});

module.exports = router;
