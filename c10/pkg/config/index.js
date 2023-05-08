const fs = require("fs");

const CONFIG_SOURCE = `${__dirname}/../../config.json`;

let config = null;

const get = (section) => {
  if (config === null) {
    const file = fs.readFileSync(CONFIG_SOURCE, "utf-8");
    config = JSON.parse(file);
  }
  if (!config[section]) {
    throw `Configuration section ${section} doesn't exist!`;
  }

  return config[section];
};

module.exports = {
  get,
};
