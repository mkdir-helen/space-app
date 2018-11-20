
const schedule = require('node-schedule')
const fetchClouds = require('./fetchClouds')
const fetchSpace = require('./fetchSpace')
const fetchDoomsday = require('./fetchDoomsday')

// create job scheduled to run at midnight every day
const j = schedule.scheduleJob('* 0 0 * * *', updateEvents) 

// will use user location
// currently using coordinates for los angeles
function updateEvents() {
    // User.getLocation()
    // .then(fetchClouds)
    // get weather forecast
    return Promise.all([
        fetchClouds(),
        fetchSpace(),
        fetchDoomsday()
    ])
}

module.exports = updateEvents;