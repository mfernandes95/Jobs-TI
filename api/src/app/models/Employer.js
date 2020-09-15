const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  const Employer = sequelize.define(
    "Employer",
    {
      user_id: DataTypes.INTEGER,
      email: DataTypes.STRING,
      cpf: DataTypes.STRING,
      employee: DataTypes.STRING,
      uf: DataTypes.STRING,
      city: DataTypes.STRING,
    },
    {}
  );

  Employer.associate = function (models) {
    Employer.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
  };

  return Employer;
};
