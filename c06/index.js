const express = require("express");
var { expressjwt: jwt } = require("express-jwt");

const config = require("./pkg/config");
require("./pkg/db");
const {
  login,
  register,
  refreshToken,
  forgotPassword,
  resetPasswort,
} = require("./handlers/auth");

const api = express();

api.use(express.json());

api.use(
  jwt({
    secret: "secret",
    //config.get("service").jwt_key,
    algorithms: ["HS256"],
  }).unless({
    path: [
      "/api/v1/auth/login",
      "/api/v1/auth/register",
      "/api/v1/auth/forgot-password",
      "/api/v1/auth/reset-password",
    ],
  })
);

api.post("/api/v1/auth/login", login);
api.post("/api/v1/auth/register", register);
api.get("/api/v1/auth/refresh-token", refreshToken);
api.post("/api/v1/auth/forgot-password", forgotPassword);
api.post("/api/v1/auth/reset-password", resetPasswort);

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
