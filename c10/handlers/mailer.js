const { sendMail } = require("../pkg/mailer");

const send = async (req, res) => {
  try {
    await sendMail(req.body.to, "WELCOME", req.body.message);
    return res.status(201).send("");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};

module.exports = {
  send,
};
