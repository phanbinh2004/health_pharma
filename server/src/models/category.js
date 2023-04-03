"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Categorys extends Model {
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
  Categorys.init(
    {
      name: DataTypes.STRING,
      keyMap: DataTypes.STRING,
      thumbnail: DataTypes.TEXT("long"),
    },
    {
      sequelize: sequelize,
      modelName: "Category",
    }
  );
  return Categorys;
};
