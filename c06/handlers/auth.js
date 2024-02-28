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
    return res.status(err.status).send(err.error);
  }
};

const register = async (req, res) => {
  try {
    await validate(req.body, Account);
    const exists = await account.getByEmail(req.body.email);
    if (exists) {
      throw {
        code: 400,
        error: "Account with this email already exists!",
      };
    }
    req.body.password = bcrypt.hashSync(req.body.password);
    const acc = await account.create(req.body);
    return res.status(201).send(acc);
  } catch (err) {
    console.log(err);
    return res.status(err.status).send(err.error);
  }
};

const refreshToken = async (req, res) => {
  const payload = {
    ...req.user,
    exp: new Date().getTime() / 1000 + 7 * 24 * 60 * 60,
  };
  const token = jwt.sign(payload, config.get("development").jwt_key);
  return res.send({ token });
};

const forgotPassword = async (req, res) => {
  const exists = await account.getByEmail(req.body.email);
  if (!exists) {
    throw {
      code: 400,
      error: "Account with this email already exists!",
    };
  }
  //here we need to generate new jwt token when user clicks on mail confirmation
  //see mailgun for more -> https://www.npmjs.com/package/mailgun

  //user requests new token to create a new password
  //old password is forgoten
  return res.send("OK");
};

const resetPassword = async (req, res) => {
  await validate(req.body, AccountReset);
  const { new_password, old_password, email } = req.body;

  //testsemos@test.com
  const userAccount = await accounts.getByEmail(email);

  //plain: new123
  //hashed: abc123cba
  if (!bcrypt.compareSync(old_password, userAccount.password)) {
    return res.status(400).send("Incorrect old password!");
  }

  const newPasswordHashed = bcrypt.hashSync(new_password);

  if (old_password === new_password) {
    return res.status(400).send("New password cannot be old password");
  }

  const userPassChanged = await accounts.setNewPassword(
    userAccount._id.toString(),
    newPasswordHashed
  );

  // return res.status(200).send(userPassChanged);

  //create a new function to change the user password
  // const userPassChanged = await account.setNewPassword(
  //   userAccount._id,
  //   newPasswordHashed
  // );

  return res.status(200).send(userPassChanged);
};

module.exports = {
  login,
  register,
  refreshToken,
  forgotPassword,
  resetPassword,
};
