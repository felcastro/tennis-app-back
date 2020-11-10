const { Unauthorized, Forbidden, NotFound, BadRequest } = require("../helpers/errors");
const { User } = require("../models");
const uploadFile = require("../helpers/storage");

async function list(req, res, next) {
  try {
    const users = await User.findAll({
      include: { association: "level" },
      where: req.query,
    });
    res.json(users);

    return users;
  } catch (error) {
    next(error);
  }
}

async function get(req, res, next) {
  try {
    const user = await User.findOne({
      include: { association: "level" },
      where: { id: req.params.id },
    });

    if (user) {
      res.status(200).json(user);
    } else {
      throw new NotFound("Usuário não encontrado");
    }

    return user;
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  try {
    const user = await User.create(req.body);

    const createdUser = await User.findOne({
      include: [{ association: "level" }, { association: "adminPlaces" }],
      where: { id: user.id },
    });

    const token = createdUser.generateToken();
    res.header("Authorization", token).status(200).json(createdUser);

    return user;
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    if (req.params.id != req.user.id)
      throw new Forbidden("Requisição não autorizada");

    const user = await User.findOne({
      where: { id: req.user.id },
    });
    if (!user) throw new NotFound("Usuário não encontrado");

    await user.update(req.body);

    const updatedUser = await User.scope("withPrivate").findOne({
      include: [{ association: "level" }, { association: "adminPlaces" }],
      where: { id: req.user.id },
    });

    res.status(200).json(updatedUser);

    return user;
  } catch (error) {
    next(error);
  }
}

async function destroy(req, res, next) {
  try {
    if (req.params.id != req.user.id)
      throw new Forbidden("Requisição não autorizada");

    const user = await User.findOne({
      where: { id: req.user.id },
    });
    if (!user) throw new NotFound("Usuário não encontrado");

    await user.destroy();
    res.status(204).send();

    return user;
  } catch (error) {
    next(error);
  }
}

async function getSelf(req, res, next) {
  try {
    const user = await User.scope("withPrivate").findOne({
      include: [{ association: "level" }, { association: "adminPlaces" }],
      where: { id: req.user.id },
    });

    if (user) {
      res.status(200).json(user);
    } else {
      throw new NotFound("Usuário não encontrado");
    }

    return user;
  } catch (error) {
    next(error);
  }
}

async function signIn(req, res, next) {
  try {
    const user = await User.scope("withSensitive").findOne({
      include: [{ association: "level" }, { association: "adminPlaces" }],
      where: { email: req.body.email },
    });

    if (user) {
      const isValid = await user.checkPassword(req.body.password);
      if (isValid) {
        const token = user.generateToken();
        res.header("Authorization", token).status(200).json(user);
      } else {
        throw new Unauthorized("E-mail ou senha incorretos");
      }
    } else {
      throw new Unauthorized("E-mail ou senha incorretos");
    }

    return user;
  } catch (error) {
    next(error);
  }
}

async function updatePicture(req, res, next) {
  try {
    if (req.params.id != req.user.id)
      throw new Forbidden("Requisição não autorizada");

    if (!req.file) throw new BadRequest("Imagem não encontrada");

    const user = await User.findOne({
      where: { id: req.user.id },
    });
    if (!user) throw new NotFound("Usuário não encontrado");

    const publicUrl = await uploadFile(
      req.user.id,
      req.file,
      "users",
      (publicUrl) => {
        user.update({ pictureUrl: publicUrl });

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
  create,
  update,
  destroy,
  getSelf,
  signIn,
  updatePicture,
};
