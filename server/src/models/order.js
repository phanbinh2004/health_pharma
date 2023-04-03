"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Order.belongsTo(models.Allcode, {
      //   foreignKey: "positionId",
      //   targetKey: "keyMap",
      //   as: "positionData",
      // });
      // Order.belongsTo(models.Allcode, {
      //   foreignKey: "gender",
      //   targetKey: "keyMap",
      //   as: "genderData",
      // });
    }
  }
  Order.init(
    {
      userId: DataTypes.INTEGER,
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      phoneNumber: DataTypes.INTEGER,
      address: DataTypes.STRING,
      note: DataTypes.STRING,
      orderDate: DataTypes.DATE,
      status: DataTypes.STRING,
      total: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
