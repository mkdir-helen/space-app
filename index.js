require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const User = require('./models/User');
const Body = require('./models/Body');
const Event = require('./models/Event');
const apiCalls = require('./apiCalls')

function updateWeatherEvents() {
    const cloudForecast = apiCalls.fetchWeather([37.8267, -122.4233])
    cloudForecast.forEach(day => {
        if (day.cloudCover < 0.2) {
            Event.add('clear sky', day.time)
        }
    }); 
}

apiCalls.fetchSpaceBody('moon')

//Connect to stylesheets
// app.use(express.static('public'));

//Configure body-parser to read data sent by HTML form tags
app.use(bodyParser.urlencoded({ extended: false }));

// Configure body-parser to read JSON bodies
app.use(bodyParser.json());


app.listen(3000, () => {
    console.log('You express app is ready!');
});