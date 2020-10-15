"use strict";

module.exports = (sequelize, DataTypes) => {
  const UserPlace = sequelize.define(
    "UserPlace",
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
      },
      placeId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Place",
          key: "id",
        },
      },
    },
    {
      freezeTableName: true,
      tableName: "usersPlaces",
      validate: true,
      timestamps: false,
    }
  );

  return UserPlace;
};
