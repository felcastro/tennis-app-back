"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("sets", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      matchId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: "matches",
          key: "id",
          as: "matchId",
        },
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      firstTeamPoints: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      secondTeamPoints: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      hasTiebreak: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      firstTeamTiebreakPoints: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      secondTeamTiebreakPoints: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("sets");
  },
};
