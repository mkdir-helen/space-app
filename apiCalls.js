const axios = require('axios')

function fetchClouds(location) {
    axios.get(`https://api.darksky.net/forecast/4f6c922b9b20ecf763ece25f86c994d0/${location[0]},${location[1]}?exclude=[currently, minutely, hourly]`)
      .then(function (response) {
        // handle success
        const dailyWeatherArray = response.data.daily.data
        console.log(dailyWeatherArray);
        console.log(dailyWeatherArray.map(day => {
          return { 
            time: day.time,
            cloudCover: day.cloudCover,
            visibility: day.visibility
          }
        }));

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
}

function fetchSpaceBody(bodyName) {
  axios.get(`http://www.strudel.org.uk/lookUP/json/?name=${bodyName}`)
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
}

module.exports = {
    fetchWeather,
    fetchSpaceBody
}