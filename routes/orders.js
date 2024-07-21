const express = require("express");
const router = express.Router();

router.get("/orders", (req, res) => {
  res.send("pagina de pedidos");
});

module.exports = router;
