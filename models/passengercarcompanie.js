"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PassengerCarCompanie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PassengerCarCompanie.belongsTo(models.Trip, { foreignKey: "tripId" });
      PassengerCarCompanie.hasMany(models.Vehicle, {
        foreignKey: "passegerCarId",
      });
      // define association here
    }
  }
  PassengerCarCompanie.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descrpition: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "PassengerCarCompanie",
    }
  );
  return PassengerCarCompanie;
};
