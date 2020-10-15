"use strict";

module.exports = (sequelize, DataTypes) => {
  const PlaceAdmin = sequelize.define(
    "PlaceAdmin",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
      },
      placeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Place",
          key: "id",
        },
      },
    },
    {
      freezeTableName: true,
      tableName: "placesAdmins",
      validate: true,
      timestamps: false,
    }
  );

  return PlaceAdmin;
};
