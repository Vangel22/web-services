const { Validator } = require("node-input-validator");

const Account = {
  email: "required|string",
  password: "required|string",
  full_name: "required|string",
};

const AccountLogin = {
  email: "required|string",
  password: "required|string",
};

const validate = async (data, schema) => {
  let v = new Validator(data, schema);
  let e = await v.check();
  if (!e) {
    throw {
      code: 400,
      error: v.errors,
    };
  }
};

module.exports = {
  Account,
  AccountLogin,
  validate,
};
