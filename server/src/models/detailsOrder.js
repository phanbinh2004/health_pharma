"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DetailsOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User.belongsTo(models.Allcode, {
      //   foreignKey: "positionId",
      //   targetKey: "keyMap",
      //   as: "positionData",
      // });
      // User.belongsTo(models.Allcode, {
      //   foreignKey: "gender",
      //   targetKey: "keyMap",
      //   as: "genderData",
      // });
    }
  }
  DetailsOrder.init(
    {
      orderId: DataTypes.STRING,
      productId: DataTypes.STRING,
      price: DataTypes.INTEGER,
      num: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
    },
    {
      sequelize: sequelize,
      modelName: "DetailsOrder",
    }
  );
  return DetailsOrder;
};
