const { readData, writeData } = require("../files");
const DATA_SOURCE = `${__dirname}/../../data`;

//add car
const addCar = async (car) => {
  try {
    const data = await readData(DATA_SOURCE);
    data.push(car);
    await writeData(data, DATA_SOURCE);
  } catch (err) {
    throw err;
  }
};

//remove car
const removeCar = async (index) => {
  try {
    const data = await readData(DATA_SOURCE);
    const out = data.filter((_, carIndex) => carIndex !== index);
    await writeData(out, DATA_SOURCE);
  } catch (err) {
    throw err;
  }
};

//update car
const updateCar = async (index, car) => {
  try {
    const data = await readData(DATA_SOURCE);
    const out = data.map((c, i) => {
      if (index === i) c = car;
      return c;
    });
    await writeData(out, DATA_SOURCE);
  } catch (err) {
    throw err;
  }
};

//get all cars
const getAllCars = async () => {
  try {
    const data = await readData(DATA_SOURCE);
    return data;
  } catch (err) {
    throw err;
  }
};

//get car by index
const getCarByIndex = async (index) => {
  try {
    const data = await readData(DATA_SOURCE);
    if (index > data.length - 1) console.log("Index does not exist in data");
    return data[index];
  } catch (err) {
    throw err;
  }
};

module.exports = {
  addCar,
  removeCar,
  updateCar,
  getAllCars,
  getCarByIndex,
};
