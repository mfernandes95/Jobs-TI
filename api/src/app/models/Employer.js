const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  const Employer = sequelize.define(
    "Employer",
    {
      user_id: DataTypes.INTEGER,
      employee_name: DataTypes.STRING,
      email: DataTypes.STRING,
      cpf: DataTypes.STRING,
      uf: DataTypes.STRING,
      city: DataTypes.STRING,
    },
    {}
  );

  Employer.associate = function (models) {
    Employer.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
  };

  Employer.associate = function (models) {
    Employer.hasMany(models.Job, { foreignKey: "user_id", as: "jobs" });
  };

  return Employer;
};
