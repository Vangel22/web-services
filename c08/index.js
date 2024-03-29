const express = require("express");
var { expressjwt: jwt } = require("express-jwt");
const fileUpload = require("express-fileupload");

const {
  upload,
  download,
  removeFile,
  listFiles,
} = require("./handlers/storage");
const config = require("./pkg/config");
require("./pkg/db");
const {
  login,
  register,
  refreshToken,
  forgotPassword,
  resetPassword,
} = require("./handlers/auth");

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

api.use(fileUpload());

// api.use(fileUpload({
//   limits: { fileSize: 50 * 1024 * 1024 },
// }));

api.post("/api/v1/auth/login", login);
api.post("/api/v1/auth/register", register);
api.get("/api/v1/auth/refresh-token", refreshToken);
api.post("/api/v1/auth/forgot-password", forgotPassword);
api.post("/api/v1/auth/reset-password", resetPassword);

api.post("/api/v1/storage", upload);
api.get("/api/v1/storage/:filename", download);
api.get("/api/v1/storage", listFiles); // list the files of the user
api.delete("/api/v1/storage/:filename", removeFile);
// remove a file from the user
// Bonus: check if the file is the last one in the folder
// if it is also delete the directory

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

//HOMEWORK
// 1. api.get("/api/v1/storage", listFiles)
// 2. api.delete("/api/v1/storage/:filename", removeFile)
