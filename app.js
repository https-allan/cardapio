const handlebars = require("express-handlebars");

const session = require("express-session");
const express = require("express");
const path = require("path");
const app = express();

const port = process.env.PORT || 3000;

const promocao = require("./routes/promotions");
const register = require("./routes/register");
const profile = require("./routes/profile");
const pedidos = require("./routes/orders");
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
app.use(express.static(path.join(__dirname, "/public")));

app.use("/", promocao);
app.use("/", register);
app.use("/", profile);
app.use("/", pedidos);
app.use("/", admin);
app.use("/", home);

app.listen(port, () => {
  console.log(`Server running in http://localhost:${port}`);
});
