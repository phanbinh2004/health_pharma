"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      brand: {
        type: Sequelize.STRING,
      },
      keyProduct: {
        type: Sequelize.STRING,
      },
      categoryId: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      discount: {
        type: Sequelize.STRING,
      },
      thumbnail: {
        type: Sequelize.JSON,
      },
      description: {
        type: Sequelize.TEXT("long"),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("products");
  },
};
