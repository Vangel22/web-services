const {
  getAllCars,
  getOneCar,
  addCar,
  updateCar,
  removeCar,
} = require("../pkg/cars/mongo");

const validator = require("../pkg/cars/validate");

const getAll = async (req, res) => {
  try {
    const cars = await getAllCars();
    return res.status(200).send(cars);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

const getOne = async (req, res) => {
  try {
    const car = await getOneCar(Number(req.params.id));
    return res.status(200).send(car);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

const create = async (req, res) => {
  try {
    await validator.validate(req.body, validator.Car);
    await addCar(req.body);
    return res.status(201).send(req.body); //Success and created resource
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

const update = async (req, res) => {
  try {
    await validator.validate(req.body, validator.Car);
    await updateCar(Number(req.params.id), req.body);
    return res.status(204).send(""); //Success but no entity-body
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

const updatePartial = async (req, res) => {
  try {
    await validator.validate(req.body, validator.CarPartial);
    await cars.updateCar(req.params.id, req.body);
    return res.status(204).send("");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

const remove = async (req, res) => {
  try {
    await removeCar(Number(req.params.id));
    return res.status(204).send(""); //Success but no entity-body
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
