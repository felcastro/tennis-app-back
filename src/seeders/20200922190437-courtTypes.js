"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "courtTypes",
      [
        {
          sportId: 1,
          name: "Rápida",
          description: "Quadra com superfície dura de cimento.",
        },
        {
          sportId: 1,
          name: "Saibro",
          description: "Quadra com superfície macia de saibro.",
        },
        {
          sportId: 2,
          name: "Areia",
          description: "Quadra com superfície de areia.",
        },
      ],
      { fields: ["sportId", "name", "description"], logging: console.log }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("courtTypes", null, {});
  },
};
