"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Trip.belongsTo(models.Station, {
        foreignKey: "fromStation",
        as: "from",
      });
      Trip.belongsTo(models.Station, {
        foreignKey: "toStation",
        as: "to",
      });
      Trip.hasMany(models.Ticket, { foreignKey: "tripId" });
      Trip.hasMany(models.PassengerCarCompanie, { foreignKey: "tripId" });
      // define association here
    }
  }
  Trip.init(
    {
      startTime: DataTypes.DATE,
      price: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Trip",
    }
  );
  return Trip;
};
