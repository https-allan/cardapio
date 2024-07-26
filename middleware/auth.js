const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new localStrategy(
      { usernameField: "username" },
      async (username, password, done) => {
        try {
          const usuario = await User.findOne({ where: { username } });
          if (!usuario) {
            return done(null, false, { message: "Essa conta não existe" });
          }

          const isMatch = await bcrypt.compare(password, usuario.password);
          if (isMatch) {
            return done(null, usuario);
          } else {
            return done(null, false, { message: "Senha incorreta" });
          }
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((usuario, done) => {
    done(null, usuario.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const usuario = await User.findOne({ where: { id } });
      done(null, usuario);
    } catch (err) {
      done(err, null);
    }
  });
};
