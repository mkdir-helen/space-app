const axios = require('axios')
const Event = require('./models/Event')

function fetchClouds(location) {
    return axios.get(`https://api.darksky.net/forecast/4f6c922b9b20ecf763ece25f86c994d0/${location[0]},${location[1]}?exclude=[currently, minutely, hourly]`)
    .then(parseResponse)
    .then(parseForecast)
    .then(updateForecast)
}

function parseResponse(response) {
  const dailyWeatherArray = response.data.daily.data
  return dailyWeatherArray
}

function parseForecast(dailyWeatherArray) {
  // handle success
  const cloudForecast = dailyWeatherArray.map(day => {
      return { 
        // convert UNIX time to JD
      time: new Date(day.time * 1000),
      cloudCover: day.cloudCover,
      visibility: day.visibility
      }
  })
 
  return cloudForecast
}

function updateForecast(cloudForecast) {
  // check each date of forecast
  cloudForecast.forEach(day => {
    // get any events on the days of the forecast
    Event.getByDate(day.time)
    .then(findClearSkies)
    .then(deleteClearSkies)
    .then(() => {
      addClearSky(day)
    })
  })
}

function findClearSkies(eventArray) {
  // delete any clear sky events in database on these days
  return eventArray.filter(event => event.name == 'clear sky')
}

// return promise that all clear skies will be deleted
function deleteClearSkies(clearSkyEventArray) {
  return Promise.all(clearSkyEventArray.map(clearSkyEvent => clearSkyEvent.delete()))
}

function addClearSky(day) {
  // and add any event days that are forecasted clear
  if (day.cloudCover < 0.2) {
    Event.add('clear sky', day.time)
  }
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
    fetchClouds,
    fetchSpaceBody
}