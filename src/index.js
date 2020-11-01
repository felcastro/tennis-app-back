const app = require("./app");

app.listen(app.get("port"), () => {
  console.log("server started at port " + app.get("port"));
});
