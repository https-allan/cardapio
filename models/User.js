const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
  "Usuario",
  {
    email: {
      type: DataTypes.STRING(100),
      allowNull: false, // Define que o email não pode ser nulo
      unique: true, // Define que o email deve ser único
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "usuarios",
    timestamps: true,
  }
);

module.exports = User;
