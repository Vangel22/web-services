const express = require("express");
const { getAll, getOne, create, update, remove } = require("./handlers/cars");

const api = express();

api.use(express.json());

//GET, POST, PUT, PATCH, DELETE

api.get("/api/cars", getAll);

api.get("/api/cars/:id", getOne);

api.post("/api/cars", create);

api.put("/api/cars/:id", update);

api.delete("/api/cars/:id", remove);

api.listen(10000, (err) => {
  err ? console.log(err) : console.log("Server started on port 10000");
});

//Homework
//Imlement a PATCH method
//Add in pkg/cars/index updatePartial
//Add in handlers/cars.js add updatePartial
