const dbConfig = require("../config/db.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, { host: dbConfig.host, dialect: dbConfig.dialect });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./User.js")(sequelize, Sequelize);
db.Game = require("./Game.js")(sequelize, Sequelize);

db.User.hasMany(db.Game, { foreignKey: "id_user" });
db.Game.belongsTo(db.User, { foreignKey: "id_user" });

module.exports = db;
