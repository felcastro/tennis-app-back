"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("timeSlots", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      scheaduleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "scheadules",
          key: "id",
          as: "scheaduleId",
        },
      },
      weekDay: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      time: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("timeSlots");
  },
};
