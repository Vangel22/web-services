const express = require("express");
var { expressjwt: jwt } = require("express-jwt");

const config = require("./pkg/config");
require("./pkg/db");
const {
  login,
  register,
  refreshToken,
  forgotPassword,
  resetPassword,
} = require("./handlers/auth");
const {
  getAll,
  getSingle,
  create,
  update,
  updatePartial,
  remove,
} = require("./handlers/post");

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

api.get("/api/v1/blog", getAll);
api.get("/api/v1/blog/:id", getSingle);
api.post("/api/v1/blog", create);
api.put("/api/v1/blog/:id", update);
api.patch("/api/v1/blog/:id", updatePartial);
api.delete("/api/v1/blog/:id", remove);

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

// async function test() {
//   const data = await fetch("/accounts", {
//     headers: {
//       "Authorization": `Bearer ${token}`
//     }
//   })
// }

// Homework
// 1. Create two users
// 2. Create new schema for bankAccount
// 3. Implement handlers
// 4. Call the handlers inside index.js
