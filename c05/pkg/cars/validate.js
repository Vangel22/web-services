const { Validator } = require("node-input-validator");

const Car = {
  model: "required|string",
  manufacturer: "required|string",
  year: "required|integer",
};

const CarPartial = {
  model: "string",
  manufacturer: "string",
  year: "integer",
};

const validate = async (data, schema) => {
  let v = new Validator(data, schema);
  let e = await v.check();
  if (!e) {
    throw v.errors;
  }
};

module.exports = {
  Car,
  CarPartial,
  validate,
};
