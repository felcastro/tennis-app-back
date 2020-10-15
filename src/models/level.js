"use strict";

module.exports = (sequelize, DataTypes) => {
  const Level = sequelize.define(
    "Level",
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
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "Não pode ser nulo.",
          },
          min: {
            args: 0,
            msg: "Deve ser no mínimo 0.",
          },
        },
      },
    },
    {
      freezeTableName: true,
      tableName: "levels",
      validate: true,
      timestamps: false,
    }
  );

  Level.associate = function (models) {
    Level.hasMany(models.User, {
      as: "users",
      foreignKey: "levelId",
    });
  };

  return Level;
};
