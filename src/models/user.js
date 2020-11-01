"use strict";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
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
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Este e-mail já está em uso",
        },
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
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Senha não pode ser nulo.",
          },
        },
      },
      birth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: {
            msg: "Data de nascimento deve ser uma data válida.",
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
      placesSearchDistance: {
        type: DataTypes.INTEGER,
        defaultValue: 100,
        validate: {
          min: {
            args: 5,
            msg: "Deve ser no mínimo 5.",
          },
          max: {
            args: 100,
            msg: "Deve ser no máximo 100.",
          },
        },
      },
      levelId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      freezeTableName: true,
      tableName: "users",
      validate: true,
      timestamps: false,
      hooks: {
        beforeSave: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
      },
      defaultScope: {
        attributes: {
          exclude: [
            "email",
            "password",
            "latitude",
            "longitude",
            "placesSearchDistance",
          ],
        },
      },
      scopes: {
        withPrivate: {
          attributes: {
            exclude: ["password", "latitude", "longitude"],
          },
        },
        withSensitive: {
          attributes: {},
        },
      },
    }
  );

  User.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
  };

  User.prototype.generateToken = function () {
    return jwt.sign({ id: this.id }, process.env.TOKEN_SECRET);
  };

  User.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());

    delete values.password;
    delete values.latitude;
    delete values.longitude;
    return values;
  };

  User.associate = function (models) {
    User.belongsTo(models.Level, {
      as: "level",
      foreignKey: "levelId",
    });

    User.belongsToMany(models.Place, {
      through: models.UserPlace,
      foreignKey: "userId",
      as: "places",
    });

    User.belongsToMany(models.Place, {
      through: models.PlaceAdmin,
      foreignKey: "userId",
      as: "adminPlaces",
    });
  };

  return User;
};
