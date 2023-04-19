const fs = require("fs");

const readData = (source) => {
  return new Promise((success, fail) => {
    fs.readFile(`${source}.json`, "utf8", (err, data) => {
      if (err) return fail(err);
      const out = JSON.parse(data);
      return success(out);
    });
  });
};

const writeData = (data, destination) => {
  return new Promise((success, fail) => {
    const out = JSON.stringify(data);
    fs.writeFile(`${destination}.json`, out, (err) => {
      if (err) fail(err);
      return success();
    });
  });
};

module.exports = {
  readData,
  writeData,
};
