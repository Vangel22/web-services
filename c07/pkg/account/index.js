const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
  email: String,
  password: String,
  fullname: String,
});

const Account = mongoose.model("accounts", accountSchema);

const create = async (acc) => {
  const account = new Account(acc);
  return await account.save();
};

const getById = async (id) => {
  return await Account.findOne({ _id: id });
};

const getByEmail = async (email) => {
  return await Account.findOne({ email });
};

const setNewPassword = async (id, password) => {
  return await Account.updateOne({ _id: id }, password);
};

const getAll = async () => {
  return await Account.find({});
};

const update = async (id, acc) => {
  return await Account.updateOne({ _id: id }, acc);
};

const remove = async (id) => {
  return await Account.deleteOne({ _id: id });
};

module.exports = {
  create,
  getByEmail,
  getById,
  getAll,
  update,
  remove,
};
