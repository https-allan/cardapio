const handlebars = require("express-handlebars");
const session = require("express-session");
const passport = require("passport");
const express = require("express");
const flash = require("connect-flash");
const path = require("path");
const app = express();

require("./middleware/auth")(passport);

const port = process.env.PORT || 3000;

const promocao = require("./routes/promotions");
const register = require("./routes/register");
const profile = require("./routes/profile");
const pedidos = require("./routes/orders");
const login = require("./routes/login");
const admin = require("./routes/admin");
const home = require("./routes/home");

app.engine(
  "handlebars",
  handlebars.engine({
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);
app.set("view engine", "handlebars");
app.use(
  session({
    secret: "$2y$10$e3qNS/DWx.JtcWKj2oMplOZ6mqsUSc2miEcJ2oOiP2/7pyiDbCx9.",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.error = req.flash("error");
  next();
});

app.use(express.json());
app.use(passport.session());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

app.use("/", promocao);
app.use("/", register);
app.use("/", profile);
app.use("/", pedidos);
app.use("/", login);
app.use("/", admin);
app.use("/", home);

app.listen(port, () => {
  console.log(`Server running in http://localhost:${port}`);
});
