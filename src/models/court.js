"use strict";

module.exports = (sequelize, DataTypes) => {
  const Court = sequelize.define(
    "Court",
    {
      placeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      courtTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Nome não pode ser nulo",
          },
          len: {
            args: [1, 20],
            msg: "Nome deve conter entre 1 e 20 caracteres.",
          },
        },
      },
      description: DataTypes.TEXT,
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      isCovered: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      hasLighting: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      freezeTableName: true,
      tableName: "courts",
      validate: true,
      timestamps: false,
    }
  );

  Court.associate = function (models) {
    Court.belongsTo(models.Place, {
      foreignKey: "placeId",
      as: "place",
    });

    Court.belongsTo(models.CourtType, {
        foreignKey: "courtTypeId",
        as: "type",
      });
  };

  return Court;
};
