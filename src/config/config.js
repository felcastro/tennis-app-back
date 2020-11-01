require("dotenv").config();

module.exports =
  process.env.NODE_ENV === "test"
    ? {
        username: process.env.DB_TEST_USER,
        password: process.env.DB_TEST_PW,
        database: process.env.DB_TEST_NAME,
        host: process.env.DB_TEST_HOST,
        dialect: process.env.DB_TEST_DIALECT,
        logging: false,
      }
    : {
        username: process.env.DB_USER,
        password: process.env.DB_PW,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
      };
