const config = require("../config");

//api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=63ff6c719581618dc79c14c2a85bf27e

const CACHE = {
  skopje: {
    timestamp: 1800, //21:00 -> 5 minutes passed
    data: {},
  },
};

// console.log('cache skopje', CACHE.skopje);
// const { skopje } = CACHE;
//  CACHE["skopje"]

//I have data in cache that is older than 30min

const getCityWeather = async (city) => {
  //21:00 Skopje-> next call in 21:05 Skopje
  let now = new Date().getTime() / 1000; //time in seconds fron 1 Jan 1970 -> 21:00 -> next call 21:05
  //current time < time of caching + time of cache expiery
  if (
    CACHE[city] &&
    now < CACHE[city].timestamp + config.get("weather").cache_expiery
  )
    return CACHE[city];

  const URL = `${config.get("weather").API_URL}&units=metric&appid=${
    config.get("weather").api_key
  }`;

  try {
    const res = await fetch(URL);
    const data = await res.json();

    CACHE[city] = {
      timestamp: new Date().getDate() / 1000, //21:01
      data,
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getCityWeather,
};
