module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      position: DataTypes.STRING,
    },
    {
      tableName: "users",
      timestamps: false,
    }
  );
  return user;
};
