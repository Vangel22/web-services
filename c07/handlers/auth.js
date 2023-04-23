const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const config = require("../pkg/config");
const account = require("../pkg/account");
const { validate, Account, AccountLogin } = require("../pkg/account/validate");

//login, register, refreshToken, forgotPassword, resetPassword

const login = async (req, res) => {
  try {
    await validate(req.body, AccountLogin);
    const acc = await account.getByEmail(req.body.email);
    if (!acc) {
      throw {
        code: 400,
        error: "Acount not found!",
      };
    }
    if (!bcrypt.compareSync(req.body.password, acc.password)) {
      throw {
        code: 400,
        error: "Wrong password!",
      };
    }
    const payload = {
      full_name: acc.full_name,
      email: acc.email,
      id: acc._id,
      exp: new Date().getTime() / 1000 + 7 * 24 * 60 * 60,
    };
    const token = jwt.sign(payload, config.get("service").jwt_key);
    return res.status(200).send({ token });
  } catch (err) {
    console.log(err);
    return res.status(err.code).send(err.error);
  }
};

const register = async (req, res) => {
  try {
    await validate(req.body, Account);
    const exists = await account.getByEmail(req.body.email);
    if (exists) {
      throw {
        code: 400,
        error: "Account exists!",
      };
    }
    req.body.password = bcrypt.hashSync(req.body.password);
    const acc = await account.create(req.body);
    return res.status(201).send(acc);
  } catch (err) {
    console.log(err);
    return res.status(err.code).send(err.error);
  }
};

const refreshToken = async (req, res) => {
  const payload = {
    ...req.user,
    exp: new Date().getTime() / 1000 + 7 * 24 * 60 * 60,
  };
  const token = jwt.sign(payload, config.get("service").jwt_key);
  return res.send({ token });
};

const forgotPassword = async (req, res) => {
  return res.send("OK");
};

const resetPasswort = async (req, res) => {
  return res.send("OK");
};

module.exports = {
  login,
  register,
  refreshToken,
  forgotPassword,
  resetPasswort,
};
