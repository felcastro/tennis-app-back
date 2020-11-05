const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const routes = require("./routes");
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const handleErrors = require("./middlewares/handleErrors");

const app = express();

// const server = http.Server(app)
// const io = require('socket.io')(server);
// app.use((req, res, next) => {
//   req.io = io;

//   return next();
// });

app.set("port", process.env.PORT || 3001);

const corsOptions = {
  exposedHeaders: "Authorization",
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(routes);
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
  res.send({
    status: "Ok",
    message: "Server is running",
  });
});

app.use(handleErrors);

module.exports = app;
