const axios = require('axios')
const Event = require('./models/Event')
const User = require('./models/User')

function fetchClouds() {
  return User.getAll()
  .then(users => {
    return Promise.all(users.map(user => {
      // debugger
      return axios.get(`https://api.darksky.net/forecast/${process.env.WEATHER_KEY}/${user.lat},${user.long}?exclude=[currently, minutely, hourly]`)
      .then(parseResponse)
      .then(parseForecast)
      .then(cloudForecast => updateForecast(cloudForecast, user))
    }))
  })
}

function parseResponse(response) {
  return response.data
}

function parseForecast(weatherData) {
  const dailyWeatherArray = weatherData.daily.data
  const cloudForecast = dailyWeatherArray.map(day => {
      return { 
        // convert UNIX time to JD
      time: new Date(day.time * 1000),
      cloudCover: day.cloudCover,
      visibility: day.visibility,
      moonPhase: day.moonPhase
      }
  })
 
  return cloudForecast
}

function updateForecast(cloudForecast, user) {
  // check each date of forecast
  return Promise.all(cloudForecast.map(day => {
    // get any events on the days of the forecast
    return Event.getByDate(day.time)
    .then(eventArray => {
      return Promise.all([deleteClearSkies(findClearSkies(eventArray, user.id)),
                          deleteMoonSlivers(findMoonSlivers(eventArray, user.id))])
    })
    .then(() => {
      return Promise.all([
        addClearSky(day, user.id),
        addMoonSliver(day, user.id)
    ])
  })
  // .then(() => {
    // })
  }))
}
  
function findClearSkies(eventArray, user_id) {
  // delete any clear sky events in database on these days for this user
  return eventArray.filter(event => event.name == 'clear sky' && event.user_id == user_id)
}

// return promise that all clear skies will be deleted
function deleteClearSkies(clearSkyEventArray) {
  return Promise.all(clearSkyEventArray.map(clearSkyEvent => clearSkyEvent.delete()))
}

function addClearSky(day, user_id) {
  // and add any event days that are forecasted clear
  if (day.cloudCover < 0.2) {
    return Event.add('clear sky', day.time, 1, user_id)
  }
}

function findMoonSlivers(eventArray, user_id) {
  // delete any clear sky events in database on these days
  return eventArray.filter(event => (event.name == 'Low moonlight' || event.name.includes('Moonphase')) && event.user_id == user_id)
}

// return promise that all clear skies will be deleted
function deleteMoonSlivers(moonSliverEventArray) {
  return Promise.all(moonSliverEventArray.map(moonSliverEvent => moonSliverEvent.delete()))
}

function addMoonSliver(day, user_id) {
  // and add any event days that are forecasted clear
  if (day.moonPhase < 0.2) {
    return Event.add('Low moonlight', day.time, 7, user_id)
  } else if (day.moonPhase > 0.23 && day.moonPhase < 0.27) {
    return Event.add(`Moonphase: First quarter moon`, day.time, 7, user_id)
  } else if (day.moonPhase > 0.48 && day.moonPhase < 0.52) {
    return Event.add(`Moonphase: Half moon`, day.time, 7, user_id)
  } else if (day.moonPhase > 0.73 && day.moonPhase < 0.77) {
    return Event.add(`Moonphase: Three quarter moon`, day.time, 7, user_id)
  } else if (day.moonPhase > 0.98) {
    return Event.add(`Moonphase: Full moon`, day.time, 7, user_id)
  }
}

module.exports = fetchClouds