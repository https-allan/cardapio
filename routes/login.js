const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  res.send("rota cadastrar funcionando");
});

module.exports = router;
