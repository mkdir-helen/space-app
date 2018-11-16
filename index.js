require('dotenv').config();
const express = require('express');
// const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const User = require('./models/User');
const Body = require('./models/Body');
const Event = require('./models/Event');
const app = require('./auth');
const schedule = require('node-schedule')
const fetchClouds = require('./fetchClouds')
const fetchSpace = require('./fetchSpace')

const eventElement = require('./views/event')
const dayElement = require('./views/day')
const monthElement = require('./views/month')
const yearElement = require('./views/year')
const contentElement = require('./views/content')
const bodyElement = require('./views/body')
const pageElement = require('./views/page')

// create job scheduled to run at midnight every day
const j = schedule.scheduleJob('* 0 0 * * *', updateEvents)

// will use user location
// currently using coordinates for los angeles
function updateEvents() {
    // User.getLocation()
    // .then(fetchClouds)
    // get weather forecast
    // fetchClouds([37.8267, -122.4233])
    fetchSpace()
}

updateEvents()

//Connect to stylesheets
app.use(express.static('public'));

//Configure body-parser to read data sent by HTML form tags
app.use(bodyParser.urlencoded({ extended: false }));

// Configure body-parser to read JSON bodies
app.use(bodyParser.json());

app.get('/:username([A-Z]+)', (req, res) => {
    // user's main page
    // get all of user's events
    // and build page
    User.getByUsername(req.params.username)
    .then(user => {
        Event.getByUser(user.id)
        .then(events => {
            events.sort((event_a, event_b) => event_a.date.getDate() > event_b.date.getDate())
            const eventElements = []
            const dayElements = []
            const monthElements = []
            const yearElements = []
            let previousEvent
            while (events.length > 0) {
                const currentEvent = events.pop()
                // if it's for the same day or the first event
                debugger
                if (eventElements.length == 0 || previousEvent.date.getDate() == currentEvent.date.getDate()) {
                    eventElements.push(eventElement(currentEvent.name))
                // if it is for a new day in same month
                } else if (previousEvent.date.getMonth() == currentEvent.date.getMonth()) {
                    dayElements.push(dayElement(previousEvent.date.getDay(), eventElements.join('')))
                    // reset eventElements array
                    eventElements.length = 0
                    eventElements.push(eventElement(currentEvent.name))
                    // if it is for a new month in same year
                } else if (previousEvent.date.getYear() == currentEvent.date.getYear()) {
                    monthElements.push(monthElement(dayElements.join('')))
                    // lock id dayElements and reset
                    dayElements.length = 0
                    eventElements.length = 0
                    eventElements.push(eventElement(currentEvent.name))
                    // if it is a new year
                } else {
                    yearElements.push(yearElement(monthElements.join('')))
                    // reset month, day, and events
                    monthElements.length = 0
                    dayElements.length = 0
                    eventElements.length = 0
                    eventElements.push(eventElement(currentEvent.name))
                }
                previousEvent = currentEvent
            }
            dayElements.push(dayElement(eventElements.join('')))
            monthElements.push(monthElement(dayElements.join('')))
            yearElements.push(yearElement(monthElements.join('')))
            res.send(pageElement(bodyElement(contentElement(yearElements.join('')))))
        })
    })
})

app.listen(3000, () => {
    console.log('You express app is ready!');
});