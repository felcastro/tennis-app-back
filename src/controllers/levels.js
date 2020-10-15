const { Level } = require("../models");

async function list(req, res, next) {
  try {
    const levels = await Level.findAll();
    res.json(levels);

    return levels;
  } catch (error) {
    next(error);
  }
}

module.exports = {
  list,
};
