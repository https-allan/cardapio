const express = require("express");
const router = express.Router();

router.get("/orders", (req, res) => {
  res.render("orders", { isOrdersPage: true });
});

module.exports = router;
