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
const apiCalls = require('./apiCalls');
const app = require('./auth');


// function updateWeatherEvents() {
//     // get weather forecast
//     apiCalls.fetchClouds([37.8267, -122.4233])
//     .then(cloudForecast => {
//         // check forecast for clear skies and make events
//         const clearSkies = cloudForecast.filter(day => day.cloudCover < 0.2)
//                                   .map(day => Event.add('clear sky', new Date(day.time)))
//         Promise.all(clearSkies)
//         .then(console.log)
//     })
// }

// updateWeatherEvents()
// apiCalls.fetchSpaceBody('moon')

//Connect to stylesheets
// app.use(express.static('public'));

//Configure body-parser to read data sent by HTML form tags
app.use(bodyParser.urlencoded({ extended: false }));

// Configure body-parser to read JSON bodies
app.use(bodyParser.json());


app.listen(3000, () => {
    console.log('You express app is ready!');
});