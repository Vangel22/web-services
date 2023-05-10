const { Validator } = require("node-input-validator");

const MailgunFields = {
  to: "required|string",
  message: "required|object",
};

const validate = async (data, schema) => {
  let v = new Validator(data, schema);
  let e = await v.check();
  if (!e) {
    throw v.errors;
  }
};

module.exports = {
  MailgunFields,
  validate,
};
