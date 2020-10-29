const { Place } = require("../models");
const { NotFound, Forbidden } = require("../helpers/errors");
const uploadFile = require("../helpers/storage");

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

async function update(req, res, next) {
  try {
    const place = await Place.findOne({
      include: [{ association: "admins" }],
      where: { id: req.params.id },
    });

    if (!place) throw new NotFound("Local não encontrado");

    if (!place.admins.some((u) => u.id === req.user.id))
      throw new Forbidden("Requisição não autorizada");

    req.body.email = req.body.email || null;
    await place.update(req.body);

    const updatedPlace = await Place.findOne({
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

    res.status(200).json(updatedPlace);

    return updatedPlace;
  } catch (error) {
    next(error);
  }
}

async function updatePicture(req, res, next) {
  try {
    if (!req.file) throw new BadRequest("Imagem não encontrada");

    const place = await Place.findOne({
      include: [{ association: "admins" }],
      where: { id: req.params.id },
    });

    if (!place) throw new NotFound("Local não encontrado");

    if (!place.admins.some((u) => u.id === req.user.id))
      throw new Forbidden("Requisição não autorizada");

    const publicUrl = await uploadFile(
      req.params.id,
      req.file,
      "places",
      (publicUrl) => {
        publicUrl = `${publicUrl}?t=${Date.now()}`;
        place.update({ pictureUrl: publicUrl });
        
        res.status(200).json({ url: publicUrl });
      }
    );

    return publicUrl;
  } catch (error) {
    next(error);
  }
}

module.exports = {
  list,
  get,
  update,
  updatePicture,
};
