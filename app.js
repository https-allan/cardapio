const handlebars = require("express-handlebars");

const express = require("express");
const path = require("path");
const app = express();

const port = 3000;

const promocao = require("./routes/promotions");
const pedidos = require("./routes/orders");
const home = require("./routes/home");

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "/public")));

app.use(promocao);
app.use(pedidos);
app.use(home);

app.listen(port, () => {
  console.log(`Server running in http://localhost:${port}`);
});
