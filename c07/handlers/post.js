const post = require("../pkg/blog");
const { validate, Post, PostPartial } = require("../pkg/blog/validation");

const getAll = async (req, res) => {
  try {
    const data = await post.getAll(req.auth.id);
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};

const getSingle = async (req, res) => {
  try {
    const data = await post.getSingle(req.auth.id, req.params.id);
    if (!data) {
      throw {
        code: 400,
        error: "Post not found",
      };
    }
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};

const create = async (req, res) => {
  try {
    await validate(req.body, Post);

    console.log("req", req.auth);

    const data = {
      ...req.body,
      user_id: req.auth.id,
    };
    const newPost = await post.create(data);
    return res.status(201).send(newPost);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};

const update = async (req, res) => {
  try {
    await validate(req.body, PostPartial);
    const data = {
      ...req.body,
      user_id: req.auth.id,
    };
    //check if the user_id is same as the one in the post
    await post.update(req.params.id, data);
    return res.status(204).send("");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};

const updatePartial = async (req, res) => {
  try {
    await validate(req.body, PostPartial);
    const data = {
      ...req.body,
      user_id: req.auth.id,
    };
    await post.update(req.params.id, data);
    return res.status(204).send("");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};

const remove = async (req, res) => {
  try {
    await post.remove(req.params.id);
    return res.status(204).send("");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};

module.exports = {
  getAll,
  getSingle,
  create,
  update,
  updatePartial,
  remove,
};
