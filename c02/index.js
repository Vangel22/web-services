const fs = require("fs");
const http = require("http");

const readData = (source) => {
  return new Promise((success, fail) => {
    fs.readFile(`${source}.json`, "utf8", (err, data) => {
      if (err) return fail(err);
      const out = JSON.parse(data);
      return success(out);
    });
  });
};

// const test = async () => {
//   try {
//     const res = await readData("./data");

//     console.log("res", res);
//   } catch (err) {
//     throw err;
//   }
// };

// test();

const writeData = (data, destination) => {
  return new Promise((success, fail) => {
    const out = JSON.parse(data);
    fs.writeFile(`${destination}.json`, out, (err) => {
      if (err) return fail(err);
      return success();
    });
  });
};

const express = require("express");
const api = express();

api.use(express.json());

api.get("/users", async (req, res) => {
  try {
    const data = await readData("./data");
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

const PORT = 10000;

api.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log(`Server successfully started on port ${PORT}`);
});

//Homework
// 1. Install dotenv
// 2. Create .env file in root directory
// 3. process.env
// Link to docs: https://www.npmjs.com/package/dotenv
