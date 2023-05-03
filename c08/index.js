const express = require("express");
var { expressjwt: jwt } = require("express-jwt");
const fileUpload = require("express-fileupload");

const {
  listFiles,
  removeFile,
  upload,
  download,
} = require("./handlers/storage");
const config = require("./pkg/config");
require("./pkg/db");

const api = express();

api.use(express.json());

api.use(
  jwt({
    secret: config.get("service").jwt_key,
    algorithms: ["HS256"],
  })
);

api.use(fileUpload());
// app.use(fileUpload({
//   limits: { fileSize: 50 * 1024 * 1024 },
// }));

api.post("/api/v1/storage", upload);
api.get("/api/v1/storage/:filename", download);

// homework
api.get("/api/v1/storage", listFiles);
api.delete("/api/v1/storage/:filename", removeFile);

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
