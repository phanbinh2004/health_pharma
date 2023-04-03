"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Carts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Carts.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
        as: "cartData",
      });
    }
  }
  Carts.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.STRING,
      discount: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      thumbnail: DataTypes.TEXT("long"),
      keyProduct: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Carts;
};
