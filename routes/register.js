const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  const { email, username, password } = req.body;

  const existingUser = await User.findOne({ where: { username } });

  if (existingUser) {
    return res.render("register", {
      errorMessage:
        "Esse nome de usuário não está disponível. Tente outro nome.",
    });
  }

  try {
    await User.create({ email, username, password });
    res.redirect("/");
  } catch (e) {
    console.log(e);
    res.status(500).send("Erro ao registrar usuário");
  }
});

module.exports = router;
