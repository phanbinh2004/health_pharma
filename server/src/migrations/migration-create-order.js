"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("order", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.STRING,
      },
      fullName: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      phoneNumber: {
        type: Sequelize.INTEGER,
      },
      address: {
        type: Sequelize.STRING,
      },
      note: {
        type: Sequelize.STRING,
      },
      orderDate: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.STRING,
      },
      total: {
        type: Sequelize.INTEGER,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("order");
  },
};
