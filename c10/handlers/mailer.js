const mailer = require("../pkg/mailer");

const sendMessage = async (req, res) => {
  try {
    await mailer.sendMessage();
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};

const sendMail = async (req, res) => {
  try {
    await mailer.sendMail();
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};

module.exports = {
  sendMessage,
};
