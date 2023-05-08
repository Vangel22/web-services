const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);

const config = require("../config");

// const mg = mailgun.client({
//   username: "api",
//   key:
//     config.get("development").api_key || "key-08845b24f1f301c0858e3817a184507e",
// });

// const sendMessage = () => {
//   console.log("send message");
//   const test = mg.messages
//     .create("sandbox-123.mailgun.org", {
//       from: "Excited User <mailgun@sandbox-123.mailgun.org>",
//       to: ["test@example.com"],
//       subject: "Hello",
//       text: "Testing some Mailgun awesomeness!",
//       html: "<h1>Testing some Mailgun awesomeness!</h1>",
//     })
//     .then((msg) => console.log(msg)) // logs response data
//     .catch((err) => console.log(err)); // logs any error

//   return test;
// };

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
  //to -> to whom the mail is sent
  //type -> it will refer to the template
  //data -> data sent from the user
  const mg = mailgun.client({
    username: "api",
    key:
      config.get("development").api_key ||
      "key-08845b24f1f301c0858e3817a184507e",
  });

  let title = mailTemplates[type].title;
  let templatePath = `${__dirname}/../../email_templates/${mailTemplates[type].template}`;
  let content = await readTemplate(templatePath);
};

//this function should read a file and display its content
const readTemplate = () => {};

module.exports = {
  sendMessage,
  sendMail,
};
