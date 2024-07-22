const express = require("express");
const router = express.Router();

const adminMiddleware = require("../middlewares/adminMiddleware");

router.use(adminMiddleware);

router.get("/admin", adminMiddleware, (req, res) => {
  res.render("panel/admin");
});

// router.get('/admin', () => {});
// router.get('/admin', () => {});

module.exports = router;
