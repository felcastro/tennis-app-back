"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("events", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      creatorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
          as: "creatorId",
        },
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pictureUrl: Sequelize.STRING,
      private: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
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
    await queryInterface.dropTable("events");
  },
};
