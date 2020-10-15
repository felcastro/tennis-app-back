"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      birth: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      pictureUrl: Sequelize.TEXT,
      latitude: Sequelize.DOUBLE,
      longitude: Sequelize.DOUBLE,
      placesSearchDistance: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 100,
      },
      levelId: {
        type: Sequelize.INTEGER,
        references: {
          model: "levels",
          key: "id",
          as: "levelId",
        },
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
    await queryInterface.dropTable("users");
  },
};
