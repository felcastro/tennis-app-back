"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("courts", {
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
      scheaduleId: {
        type: Sequelize.INTEGER,
        references: {
          model: "scheadules",
          key: "id",
          as: "scheaduleId",
        },
      },
      courtTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "courtTypes",
          key: "id",
          as: "courtTypeId",
        },
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: Sequelize.TEXT,
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      isCovered: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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
    await queryInterface.dropTable("courts");
  },
};
