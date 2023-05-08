const express = require("express");
const { send } = require("./handlers/mailer");
const config = require("./pkg/config");

const app = express();

app.use(express.json());

app.post("/api/v1/sendmail", send);

app.listen(config.get("service").port, (err) => {
  if (err) return console.log(err);
  return console.log("Service started on port", config.get("service").port);
});
