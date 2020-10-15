const { Place } = require("../models");
const { NotFound } = require("../helpers/errors");

async function list(req, res, next) {
  try {
    const places = await Place.findAll({
      include: [
        {
          association: "courts",
          include: [
            {
              association: "type",
              include: ["sport"],
            },
          ],
        },
      ],
      where: req.query,
    });
    res.json(places);

    return places;
  } catch (error) {
    next(error);
  }
}

async function get(req, res, next) {
  try {
    const place = await Place.findOne({
      include: [
        { association: "admins" },
        {
          association: "courts",
          include: [
            {
              association: "type",
              include: ["sport"],
            },
          ],
        },
      ],
      where: { id: req.params.id },
    });

    if (place) {
      res.status(200).json(place);
    } else {
      throw new NotFound("Local não encontrado");
    }

    return place;
  } catch (error) {
    next(error);
  }
}

module.exports = {
  list,
  get,
};
