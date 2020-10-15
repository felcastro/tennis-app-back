"use strict";

module.exports = (sequelize, DataTypes) => {
  const Sport = sequelize.define(
    "Sport",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        validate: {
          notNull: {
            msg: "Não pode ser nulo.",
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Não pode ser nulo.",
          },
          notEmpty: {
            msg: "Não pode estar vazio.",
          },
        },
      },
      description: DataTypes.TEXT,
    },
    {
      freezeTableName: true,
      tableName: "sports",
      validate: true,
      timestamps: false,
    }
  );

  Sport.associate = function (models) {
    Sport.hasMany(models.CourtType, {
      as: "courtTypes",
      foreignKey: "sportId",
    });
  };

  return Sport;
};
