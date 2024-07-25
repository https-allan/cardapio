const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "root",
  database: "database",
  port: 5432,
});

module.exports = sequelize;
