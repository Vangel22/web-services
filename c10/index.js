const express = require("express");

const { sendMessage } = require("./handlers/mailer");
const config = require("./pkg/config");

const api = express();

api.post("/api/v1/sendmessage", sendMessage);

api.listen(config.get("development").port, (err) => {
  err
    ? console.log(err)
    : console.log(`Server started on port ${config.get("development").port}`);
});
