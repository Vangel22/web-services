const express = require("express");
var { expressjwt: jwt } = require("express-jwt");

const { send } = require("./handlers/mailer");
const config = require("./pkg/config");
require("./pkg/db");
const {
  login,
  register,
  refreshToken,
  forgotPassword,
  resetPassword,
  resetPassTemplate,
} = require("./handlers/auth");

const api = express();

api.use(express.json());
api.use(express.urlencoded({ extended: false }));
api.set("view engine", "ejs");

api.use(
  "/api",
  jwt({
    secret: config.get("service").jwt_key,
    algorithms: ["HS256"],
  }).unless({
    path: [
      "/api/v1/auth/login",
      "/api/v1/auth/register",
      "/forgot-password",
      "/api/v1/auth/forgot-password",
      "/reset-password/:id/:token",
    ],
  })
);

api.post("/api/v1/auth/login", login);
api.post("/api/v1/auth/register", register);
api.get("/api/v1/auth/refresh-token", refreshToken);
api.post("/api/v1/auth/forgot-password", forgotPassword);
api.post("/reset-password/:id/:token", resetPassword);

api.get("/forgot-password", (req, res) => {
  res.render("forgot-password");
});

api.get("/reset-password/:id/:token", (req, res) => {
  res.render("reset-password", { email: "vangel@test.com" });
});

api.post("/api/v1/sendmail", send);

api.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send("invalid token...");
  }
});

api.listen(config.get("service").port, (err) => {
  if (err) return console.log(err);
  return console.log("Service started on port", config.get("service").port);
});
