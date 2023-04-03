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

const writeData = (data, destination, typeOfData) => {
  return new Promise((success, fail) => {
    const out =
      typeOfData === "object" ? JSON.stringify(data) : JSON.parse(data);
    fs.writeFile(`${destination}.json`, out, (err) => {
      if (err) return fail(err);
      return success();
    });
  });
};

const addPerson = async (id, firstname, lastname) => {
  try {
    const person = {
      id: id,
      first_name: firstname,
      last_name: lastname,
    };
    let data = await readData("./data");
    data.push(person);
    await writeData(data, "./data", typeof person);
  } catch (err) {
    throw err;
  }
};

const removePerson = async (index) => {
  try {
    let data = await readData("./data");
    let out = data.filter((user) => user.id !== index);
    await writeData(out, "./data");
  } catch (err) {
    throw err;
  }
};

//Object => JSON.stringify(obj)
//String => JSON.parse(string)

//IIFE
(async () => {
  await addPerson(4, "TestName", "TestSurname");
  await removePerson(4);
})();

const express = require("express");
const { parse } = require("path");
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

// call users route
// get a single user
// filter the user with id 2 --- this can be done multiple ways
// show data in browser
// display error otherwise

const PORT = 10000;

// api.listen(PORT, (err) => {
//   if (err) return console.log(err);
//   console.log(`Server successfully started on port ${PORT}`);
// });

//Homework
// 1. Install dotenv
// 2. Create .env file in root directory
// 3. process.env
// Link to docs: https://www.npmjs.com/package/dotenv
//Extend addPerson function to throw error if there is already user with the entered ID
