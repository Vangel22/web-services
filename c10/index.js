const express = require("express");

const {
  sendMessage,
  sendWelcomeMail,
  sendPasswordResetMail,
} = require("./handlers/mailer");
const config = require("./pkg/config");

const api = express();

api.use(express.json());

api.post("/api/v1/sendmessage", sendMessage);
api.post("/api/v1/sendmail", sendWelcomeMail);
api.post("api/v1/reset-pass", sendPasswordResetMail);

api.listen(config.get("development").port, (err) => {
  err
    ? console.log(err)
    : console.log(`Server started on port ${config.get("development").port}`);
});

//Homework
//1. What is callback, promise, async/await
//2. const, let, var differences
//3. types of functions
//4. explain crud functionalities
