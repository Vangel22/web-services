const mailer = require("../pkg/mailer");

const sendMessage = async (req, res) => {
  try {
    //to, firstname, lastname, email
    await mailer.sendMessage();
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};

const sendWelcomeMail = async (req, res) => {
  try {
    //to, firstname, lastname, email
    const result = await mailer.sendMail(
      req.body.to,
      "WELCOME",
      req.body.message
    );
    return res.status(201).send(result);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};

const sendPasswordResetMail = async (req, res) => {
  try {
    //to, firstname, lastname, email
    const result = await mailer.sendMail(
      req.body.to,
      "PASSWORD_RESET",
      req.body.message
    );
    return res.status(201).send(result);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};

module.exports = {
  sendMessage,
  sendWelcomeMail,
  sendPasswordResetMail,
};
