const express = require("express");
const { expressjwt: jwt } = require("express-jwt");

const {
  sendMessage,
  sendWelcomeMail,
  sendPasswordResetMail,
} = require("./handlers/mailer");
const config = require("./pkg/config");
const {
  login,
  register,
  refreshToken,
  forgotPassword,
  resetPassword,
} = require("./handlers/auth");
require("./pkg/db");

const api = express();

api.use(express.json());

api.use(
  jwt({
    secret: config.get("development").jwt_key,
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
api.post("/api/v1/auth/reset-password", resetPassword);

api.post("/api/v1/sendmessage", sendMessage);
api.post("/api/v1/sendmail", sendWelcomeMail);
api.post("api/v1/reset-pass", sendPasswordResetMail);

api.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedAccess") {
    res.status(401).send("Invalid token...");
  }
});

api.listen(config.get("development").port, (err) => {
  err
    ? console.log(err)
    : console.log(`Server started on port ${config.get("development").port}`);
});

//Homework
