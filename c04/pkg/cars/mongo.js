const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  model: String,
  manufacturer: String,
  year: Number,
  color: String,
  dealership: String,
});

const Car = mongoose.model("cars", carSchema);

const addCar = async (car) => {
  try {
    const newCar = new Car(car);
    return await newCar.save();
    //ObjectId => unique id
  } catch (err) {
    throw err;
  }
};

//remove car
const removeCar = async (id) => {
  return await Car.deleteOne({ _id: id });
};

//update car
const updateCar = async (id, car) => {
  return await Car.updateOne({ _id: id, car });
};

//get all cars
const getAllCars = async () => {
  return await Car.find({});
};

//get one car
const getOneCar = async (id) => {
  return await Car.findOne({ _id: id });
};

module.exports = {
  addCar,
  removeCar,
  updateCar,
  getAllCars,
  getOneCar,
};
