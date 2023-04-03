"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User.belongsTo(models.Role, {
      //   foreignKey: "roleId",
      //   targetKey: "keyMap",
      //   as: "roleData",
      // });
      // User.belongsTo(models.Role, {
      //   foreignKey: "gender",
      //   targetKey: "keyMap",
      //   as: "genderData",
      // });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      fullName: DataTypes.STRING,
      address: DataTypes.STRING,
      gender: DataTypes.BOOLEAN,
      roleId: DataTypes.STRING,
      phoneNumber: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
