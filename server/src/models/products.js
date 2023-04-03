"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Products.belongsTo(models.Category, {
      //   foreignKey: "categoryId",
      //   targetKey: "keyMap",
      //   as: "categoryData",
      // });
      // Product.belongsTo(models.Allcode, {
      //   foreignKey: "gender",
      //   targetKey: "keyMap",
      //   as: "genderData",
      // });
    }
  }
  Products.init(
    {
      categoryId: DataTypes.STRING,
      title: DataTypes.STRING,
      price: DataTypes.INTEGER,
      discount: DataTypes.STRING,
      thumbnail: DataTypes.JSON,
      description: DataTypes.TEXT("long"),
      brand: DataTypes.STRING,
      keyProduct: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Products;
};
