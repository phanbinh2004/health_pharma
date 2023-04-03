"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("galery", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      productId: {
        type: Sequelize.INTEGER,
      },
      thumbnail: {
        type: Sequelize.JSON,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("galery");
  },
};
