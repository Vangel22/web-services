const readData = (source) => {
  return new Promise((success, fail) => {
    fs.readFile(`${source}.json`, "utf8", (err, data) => {
      if (err) return fail(err);
      const out = JSON.parse(data);
      return success(out);
    });
  });
};

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

module.exports = {
  readData,
  writeData,
};
