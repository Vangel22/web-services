const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const { validate, Account, AccountLogin } = require("../pkg/account/validate");
const account = require("../pkg/account");
const config = require("../pkg/config");

//login, register, refreshToken, forgotPassword, resetPassword

const login = async (req, res) => {
  try {
    await validate(req.body, AccountLogin);
    const acc = await account.getByEmail(req.body.email);
    if (!acc) {
      throw {
        code: 400,
        error: "Account not found!",
      };
    }
    if (!bcrypt.compareSync(req.body.password, acc.password)) {
      throw {
        code: 400,
        error: "Wrong password",
      };
    }
    const payload = {
      fullname: acc.fullname,
      email: acc.email,
      id: acc._id,
      exp: new Date().getTime() / 1000 + 7 * 24 * 60 * 60,
    };
    const token = jwt.sign(payload, config.get("development").jwt_key);
    return res.status(200).send({ token });
  } catch (err) {
    console.log(err);
    return res.status(err.status).send(err);
  }
};
