const config = require("../config");

//api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=63ff6c719581618dc79c14c2a85bf27e

const CACHE = {};

const getCityWeather = async (city) => {
  let now = new Date().getTime() / 1000; // 10 < 5 + 4 // тековно време во секунди < време на креирање на кеш + траење на кеш

  if (
    CACHE[city] &&
    now < CACHE[city].timestamp + config.get("weather").cache_expiery
  )
    return CACHE[city];

  const URL = `${
    config.get("weather").API_URL
  }/weather?q=${city}&units=metric&appid=${config.get("weather").api_key}`;
  try {
    const res = await fetch(URL);
    const data = await res.json();

    CACHE[city] = {
      timestamp: new Date().getTime() / 1000,
      data,
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getCityWeather,
};
