const { Sport } = require("../models");

const list = (req, res) => {
  const list = Sport.findAll()
    .then((sports) => {
      res.status(200).json(sports);
    })
    .catch((error) => {
      res.status(500).json("Erro");
    });

  return list;
}

module.exports = {
  list,
};
