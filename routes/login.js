const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  req.res("rota cadastrar funcionando");
});

module.exports = router;
