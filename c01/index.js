const https = require("https");
const url = require("url");

//types of functions

//arrow function
// const arrow = () => console.log("robin hood");

//Reference - refering to a memory location
//Call - calls the function with content

// const result = arrow;

// result();

//just function
// function justFunction() {
//   console.log("just function");
// }

// justFunction();

// const test = function () {
//   console.log("test");
// };

// test();

//calculate two numbers and return their product with the three function types mentioned above

// const test = "123";
// console.log(Number(test));

// const server = http.createServer((req, res) => {
//   res.writeHead(200, { "Content-Type": "text/html" });
//   const query = url.parse(req.url, true).query;
//   const text = query.year + " " + query.month;
//   res.end(text);
// });

// server.listen(10000);

const getUsers = https.get(
  "https://jsonplaceholder.typicode.com/users",
  (res) => {
    let data = [];
    const headerDate =
      res.headers && res.headers.date ? res.headers.date : "no response date";

    console.log("Date in response code", headerDate);
    console.log("Status code", res.statusCode);

    res.on("data", (chunk) => {
      data.push(chunk);
    });

    res.on("end", () => {
      console.log("Response ended");
      const users = JSON.parse(Buffer.concat(data).toString());

      for (let user of users) {
        console.log(`User with id: ${user.id}, name: ${user.name}`);
      }
    });
  }
);

getUsers.on("error", (err) => {
  console.error(err.message);
});

//Homework
// Ternary nested operations
//
