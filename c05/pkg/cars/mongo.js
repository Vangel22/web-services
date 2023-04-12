const mongoose = require("mongoose");

//Person
// firstname, lastname, age, dateOfBirth, address, vehicles [ObjectIds]
// Owner -> Car, Van, Truck

const carSchema = new mongoose.Schema({
  model: {
    type: String,
    required: true,
    minLength: 2,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
    validate: {
      validator: (fieldParam) => fieldParam > 2020,
      message: (props) => `Input car is older than 2020!`,
    },
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    //uppercase: false
  },
  //person id: 12345
  person: ["12345"],
  //[mongoose.SchemaTypes.ObjectId], // reference to another object
  color: String,
  dealership: String,
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
