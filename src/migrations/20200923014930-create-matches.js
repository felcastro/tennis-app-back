"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("matches", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      creatorId: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
          as: "creatorId",
        },
      },
      eventCategoryRoundId: {
        type: Sequelize.INTEGER,
        references: {
          model: "eventCategoryRounds",
          key: "id",
          as: "eventCategoryRoundId",
        },
      },
      private: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      isSingles: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      courtId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "courts",
          key: "id",
          as: "courtId",
        },
      },
      date: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("matches");
  },
};
