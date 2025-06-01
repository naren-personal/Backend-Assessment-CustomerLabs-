const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false,
});

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Account = require("./accounts")(sequelize, Sequelize);
db.Destination = require("./destinations")(sequelize, Sequelize);

// Relations
db.Account.hasMany(db.Destination, {
  foreignKey: "accountid",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.Destination.belongsTo(db.Account, {
  foreignKey: "accountid",
});

module.exports = db;
