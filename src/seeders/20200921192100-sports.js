"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "sports",
      [
        {
          name: "Tênis",
        },
        {
          name: "Beach Tennis",
        },
      ],
      { fields: ["id", "name"], logging: console.log }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("sports", null, {});
  },
};
