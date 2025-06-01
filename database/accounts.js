const { CommonUtils } = require("../utils");

module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define("Account", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => CommonUtils.generateUUID(),
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    account_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    app_secret_token: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: () => CommonUtils.generateUUID(),
    },
    website: {
      type: DataTypes.STRING,
    },
  });

  return Account;
};
