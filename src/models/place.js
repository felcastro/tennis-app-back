"use strict";

module.exports = (sequelize, DataTypes) => {
  const Place = sequelize.define(
    "Place",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Nome não pode ser nulo",
          },
          len: {
            args: [4, 100],
            msg: "Nome deve conter entre 4 e 100 caracteres.",
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "E-mail não pode ser nulo.",
          },
          notEmpty: {
            msg: "E-mail não pode estar vazio.",
          },
          isEmail: {
            msg: "Deve ser um email válido.",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            msg: "Deve ser um email válido.",
          },
        },
      },
      phone: DataTypes.STRING,
      website: {
        type: DataTypes.STRING,
        validate: {
          isUrl: {
            msg: "Deve ser uma URL válida.",
          },
        },
      },
      pictureUrl: {
        type: DataTypes.STRING,
        validate: {
          isUrl: {
            msg: "Deve ser uma URL válida.",
          },
        },
      },
      latitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          min: {
            args: -90,
            msg: "Deve ser no mínimo -90.",
          },
          max: {
            args: 90,
            msg: "Deve ser no máximo 90.",
          },
        },
      },
      longitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          min: {
            args: -180,
            msg: "Deve ser no mínimo -180.",
          },
          max: {
            args: 180,
            msg: "Deve ser no máximo 180.",
          },
        },
      },
      opensAt: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      closesAt: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      rentTime: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      tableName: "places",
      validate: true,
      timestamps: false,
    }
  );

  Place.associate = function (models) {
    Place.belongsToMany(models.User, {
      through: models.UserPlace,
      foreignKey: "placeId",
      as: "users",
    });

    Place.belongsToMany(models.User, {
      through: models.PlaceAdmin,
      foreignKey: "placeId",
      as: "admins",
    });

    Place.hasMany(models.Court, {
      foreignKey: "placeId",
      as: "courts",
    });
  };

  return Place;
};
