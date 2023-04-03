"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
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
  Feedback.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phoneNumber: DataTypes.INTEGER,
      note: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Feedback",
    }
  );
  return Feedback;
};
