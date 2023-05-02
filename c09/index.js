const express = require("express");
const config = require("./pkg/config");
require("./pkg/db");

const api = express();

api.use(express.json());

api.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send("invalid token...");
  }
});

api.listen(config.get("service").port, (err) => {
  err
    ? console.log(err)
    : console.log(`Server started on port ${config.get("service").port}`);
});
