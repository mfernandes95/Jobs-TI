module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define(
    "Job",
    {
      user_id: DataTypes.INTEGER,
      job_description: DataTypes.STRING,
    },
    {}
  );

  Job.associate = function (models) {
    Job.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
  };

  return Job;
};
