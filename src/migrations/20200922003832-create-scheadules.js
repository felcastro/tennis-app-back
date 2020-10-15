"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("scheadules", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      placeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "places",
          key: "id",
          as: "placeId",
        },
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: Sequelize.TEXT,
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
    await queryInterface.dropTable("scheadules");
  },
};
