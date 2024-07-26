const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const User = require("../models/User");

router.get("/register", (req, res) => {
  res.render("users/register");
});

router.post("/register", async (req, res) => {
  const { email, username, password } = req.body;

  const existingUser = await User.findOne({ where: { username } });

  if (existingUser) {
    return res.render("users/register", {
      errorMessage:
        "Esse nome de usuário não está disponível. Tente outro nome.",
    });
  }

  if (password.length < 4) {
    return res.render("users/register", {
      shortPasswordAlert: "Senha muito curta.",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ email, username, password: hashedPassword });
    res.redirect("/");
  } catch (e) {
    console.log(e);
    res.status(500).send("Erro ao registrar usuário");
  }
});

module.exports = router;
