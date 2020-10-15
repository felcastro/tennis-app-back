"use strict";

module.exports = (sequelize, DataTypes) => {
  const CourtType = sequelize.define(
    "CourtType",
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
      tableName: "courtTypes",
      validate: true,
      timestamps: false,
    }
  );

  CourtType.associate = function (models) {
    CourtType.belongsTo(models.Sport, {
      as: "sport",
      foreignKey: "sportId",
    });

    CourtType.hasMany(models.Court, {
      foreignKey: "courtTypeId",
      as: "courts",
    });
  };

  return CourtType;
};
