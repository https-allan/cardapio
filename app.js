const handlebars = require("express-handlebars");
const express = require("express");
const path = require("path");
const app = express();

const port = 3000;

const home = require("./routes/home");

app.engine("handlebars", handlebars.engine("handlebars"));
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "/public")));

app.use("/", home);

app.listen(port, () => {
  console.log(`Server running in http://localhost:${port}`);
});
