module.exports = (sequelize, DataTypes) => {
  const game = sequelize.define(
    "game",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      console_name: DataTypes.STRING,
      qtd_jogos: DataTypes.INTEGER,
    },
    {
      tableName: "games",
      timestamps: false,
    }
  );
  return game;
};
