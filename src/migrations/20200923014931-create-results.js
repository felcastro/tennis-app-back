"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("results", {
      matchId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        onDelete: 'CASCADE',
        references: {
          model: "matches",
          key: "id",
          as: "matchId",
        },
      },
      isFirstTeamWinner: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("results");
  },
};
