const {
  addCar,
  removeCar,
  updateCar,
  getAllCars,
  getCarByIndex,
} = require("../pkg/cars");

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
    const car = await getCarByIndex(Number(req.params.id));
    return res.status(200).send(car);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

const create = async (req, res) => {
  try {
    console.log("req.body", req.body);
    await addCar(req.body);
    return res.status(201).send(req.body); //Success and created resource
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

const update = async (req, res) => {
  try {
    await updateCar(Number(req.params.id), req.body);
    return res.status(204).send(""); //Success but no entity-body
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

const updatePartial = async (req, res) => {
  //change brand name

  //   const data = await updatePartial();

  //   const { id } = req.params;
  //   const { model } = req.body;

  return res.status(200).send("");
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
