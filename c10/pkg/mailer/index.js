const fs = require("fs");
const formData = require("form-data");
const config = require("../config");
const Mailgun = require("mailgun").Mailgun;

const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY || "key-yourkeyhere",
});

mg.messages
  .create("sandbox-123.mailgun.org", {
    from: "Excited User <mailgun@sandbox-123.mailgun.org>",
    to: ["test@example.com"],
    subject: "Hello",
    text: "Testing some Mailgun awesomeness!",
    html: "<h1>Testing some Mailgun awesomeness!</h1>",
  })
  .then((msg) => console.log(msg)) // logs response data
  .catch((err) => console.log(err)); // logs any error

const mailTemplates = {
  PASSWORD_RESET: {
    title: "Your password reset link has been generated",
    template: "reset_password.html",
  },
  WELCOME: {
    title: "Welcome to our website",
    template: "welcome.html",
  },
};

const sendMail = async (to, type, data) => {
  const mailgun = new Mailgun(config.get("service").api_key);
  console.log("mailgun", mailgun);

  let title = mailTemplates[type].title;
  let templatePath = `${__dirname}/../../email_templates/${mailTemplates[type].template}`;
  let content = await readTemplate(templatePath);

  //   for (let i in data) {
  //     let regex = new RegExp(`\{\{${i}\}\}`, "g"); // {{first_name}} // {{last_name}} // {{email}}
  //     content = content.replace(regex, data[i]); // Bojan // Gavrovski // bojan@gmail.com
  //   }

  let options = {
    from: config.get("service").sender_email,
    to: to,
    subject: title,
    text: "Testing",
    html: content,
  };

  console.log("options", options);

  try {
    // let res =
    // await mg.messages.create(config.get("service").domain, options);
    // return res;
    mailgun.sendText(
      "example@example.com",
      ["Recipient 1 <rec1@example.com>", "rec2@example.com"],
      "This is the subject",
      "This is the text",
      "noreply@example.com",
      {},
      function (err) {
        if (err) console.log("Oh noes: " + err);
        else console.log("Success");
      }
    );
    // return test;
  } catch (err) {
    throw err;
  }
};

const readTemplate = async (file) => {
  return new Promise((succes, fail) => {
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) return fail(err);
      return succes(data);
    });
  });
};

module.exports = {
  sendMail,
};
