const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  model: String,
  manufacturer: {
    type: String,
    minLength: 10,
  },
  year: {
    type: Number,
    validate: {
      validator: (v) => v > 2020,
      message: (props) => `Cars of ${props.value} year aren't allowed!`,
    },
  },
  //vehicle: mongoose.SchemaTypes.ObjectId -> reference to another object
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  carWeight: {
    type: Number,
    min: 1200,
    max: 3000,
  },
});

const Car = mongoose.model("cars", carSchema);

const addCar = async (car) => {
  let c = new Car(car);
  return await c.save();
};

const removeCar = async (id) => {
  return await Car.deleteOne({ _id: id });
};

const updateCar = async (id, car) => {
  return await Car.updateOne({ _id: id, car });
};

const getAllCars = async () => {
  return await Car.find({});
};

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
