const { CourtType } = require("../models");

const list = (req, res) => {
  const list = CourtType.findAll({ include: 'sport' })
    .then((courtType) => {
      res.status(200).json(courtType);
    })
    .catch((error) => {
      res.status(500).json("Erro");
    });

  return list;
}

module.exports = {
  list,
};
