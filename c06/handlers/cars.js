const {
  addCar,
  removeCar,
  updateCar,
  getAllCars,
  getOneCar,
} = require("../pkg/cars/mongo");

const { Car, CarPartial, validate } = require("../pkg/cars/validate");

//source of data => cars manupulation => handlers for cars =>  /api/cars

const getAll = async (req, res) => {
  try {
    const cars = await getAllCars();
    return res.status(200).send(cars);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

//cars/:id?month=10
const getOne = async (req, res) => {
  try {
    const car = await getOneCar(req.params.id);
    return res.status(200).send(car);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

const create = async (req, res) => {
  try {
    await validate(req.body, Car);
    await addCar(req.body);
    return res.status(201).send(req.body); //Success and created resource
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

const update = async (req, res) => {
  try {
    await validate(req.body, Car);
    await updateCar(req.params.id, req.body);
    return res.status(204).send(""); //Success but no entity-body - updating existing car
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

const updatePartial = async (req, res) => {
  try {
    await validate(req.body, CarPartial);
    await updateCar(req.params.id, req.body);
    return res.status(204).send("");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

const remove = async (req, res) => {
  try {
    await removeCar(req.params.id);
    return res.status(204).send("");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  updatePartial,
  remove,
};
