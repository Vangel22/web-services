const express = require("express");
var { expressjwt: jwt } = require("express-jwt");

const config = require("./pkg/config");
require("./pkg/db");
const {
  getAll,
  getSingle,
  create,
  update,
  updatePartial,
  remove,
} = require("./handlers/post");
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
    secret: config.get("service").jwt_key,
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

api.get("/api/v1/blog", getAll);
api.get("/api/v1/blog/:id", getSingle);
api.post("/api/v1/blog", create);
api.put("/api/v1/blog/:id", update);
api.patch("/api/v1/blog/:id", updatePartial);
api.delete("/api/v1/blog/:id", remove);

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

// ********************************** //
// ********************************** //
// !!!FRONT-END CODE!!! //
// try {
//     let sendData = {
//         some_thing: 'something'
//     };

//     let res = await fetch(
//         'http://localhoslt:10000/api/v1/some-endpoint',
//         {
//             method: 'POST',
//             body: JSON.stringify(sendData),
//             headers: {
//                 'Authorization': `Bearer ${jwt_token}`,
//                 'Content-Type': 'application/json'
//             }
//         }
//     );

//     let data = await res.json();
//     console.log(data);
// } catch(err) {
//     console.log(err);
// }
// ********************************** //
// ********************************** //
