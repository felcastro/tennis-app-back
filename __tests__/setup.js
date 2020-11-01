const db = require("../src/models");

afterAll(async (done) => {
  db.sequelize.close();
  done();
});
