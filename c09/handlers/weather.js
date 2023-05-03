const { getCityWeather } = require("../pkg/openweathermap");

const getForCity = async (req, res) => {
  try {
    const weather = await getCityWeather(req.params.city);
    res.send(weather);
  } catch (err) {
    return res.status(500).send("Internal server error");
  }
};

module.exports = { getForCity };
