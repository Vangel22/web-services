const { Validator } = require("node-input-validator");

const Post = {
  title: "required|string",
  content: "required|string",
};

const PostPartial = {
  title: "string",
  content: "string",
};

const validate = async (data, schema) => {
  const v = new Validator(data, schema);
  const e = await v.check();
  if (!e) {
    throw {
      code: 400,
      error: v.errors,
    };
  }
};

module.exports = {
  Post,
  PostPartial,
  validate,
};
