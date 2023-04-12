const express = require("express");
// require("dotenv").config();
const config = require("./pkg/config");

require("./pkg/db");
const {
  getAll,
  getOne,
  create,
  update,
  updatePartial,
  remove,
} = require("./handlers/cars");

const api = express();

api.use(express.json());

api.get("/api/cars", getAll);
api.get("/api/cars/:id", getOne);
api.post("/api/cars", create);
api.put("/api/cars/:id", update);
api.patch("/api/cars/:id", updatePartial);
api.delete("/api/cars/:id", remove);

api.listen(config.get("service").port, (err) => {
  err
    ? console.log(err)
    : console.log(`Server started on port ${config.get("service").port}`);
});
