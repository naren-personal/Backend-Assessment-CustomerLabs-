module.exports = (sequelize, DataTypes) => {
  const Destination = sequelize.define("Destination", {
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    http_method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    headers: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    accountid: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Accounts", // table name (not model name)
        key: "id",
      },
      onDelete: "CASCADE",
    },
  });

  return Destination;
};
