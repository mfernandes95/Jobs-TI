module.exports = (sequelize, DataTypes) => {
  const Car = sequelize.define(
    "Car",
    {
      brand: DataTypes.STRING,
      model: DataTypes.STRING,
      year: DataTypes.INTEGER,
      fuel: DataTypes.STRING,
      color: DataTypes.STRING,
      price: DataTypes.DOUBLE,
      user_id: DataTypes.INTEGER,
    },
    {}
  );

  Car.associate = function (models) {
    Car.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
  };

  return Car;
};
