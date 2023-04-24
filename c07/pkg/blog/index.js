const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  user_id: String,
  title: String,
  content: String,
});

const Posts = mongoose.model("posts", postSchema);

const getAll = async (user_id) => {
  return await Posts.find({ user_id });
};

const getSingle = async (user_id, id) => {
  return await Posts.findOne({ user_id: user_id, _id: id });
};

const create = async (data) => {
  const post = new Posts(data);
  return await post.save();
};

const update = async (id, data) => {
  return await Posts.updateOne({ _id: id }, data);
};

const remove = async (id) => {
  return await Posts.deleteOne({ _id: id });
};

module.exports = {
  getAll,
  getSingle,
  create,
  update,
  remove,
};
