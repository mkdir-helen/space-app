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


const mainPage = require('./views/mainpage');
const loginForm = require('./views/loginform');
const registerForm = require('./views/registerform');
const profilePage = require('./views/profile');
const eventPage = require('./views/eventpage');
const aboutPage = require('./views/about');

const schedule = require('node-schedule')
const fetchClouds = require('./fetchClouds')
const fetchSpace = require('./fetchSpace')
const fetchDoomsday = require('./fetchDoomsday')

const eventElement = require('./views/event')
const dayElement = require('./views/day')
const monthElement = require('./views/month')
const monthNameArray = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
]
const yearElement = require('./views/year')
const contentElement = require('./views/content')
const bodyElement = require('./views/body')
const pageElement = require('./views/page')

// create job scheduled to run at midnight every day
// const j = schedule.scheduleJob('* 0 0 * * *', updateEvents) :)

// will use user location
// currently using coordinates for los angeles
function updateEvents() {
    // User.getLocation()
    // .then(fetchClouds)
    // get weather forecast
    fetchClouds([37.8267, -122.4233])
    fetchSpace()
    fetchDoomsday()
}

// updateEvents() :)

//making sure users are logged in to do anything
const ensureAuthenticated = (req, res, next) => {

    if (req.session.user || req.isAuthenticated()) {
        // req.user is available for use here
        console.log('we are all good');
        return next();
    }

    console.log('clearly, they are not authenticated');
    // denied. redirect to login
    res.redirect('/login');
}


//Connect to stylesheets
app.use(express.static('public'));

//Configure body-parser to read data sent by HTML form tags
app.use(bodyParser.urlencoded({ extended: false }));

// Configure body-parser to read JSON bodies
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send(mainPage());
    // const thePage = page('hey there');
    // res.send(thePage);
});

app.get('/about', (req,res)=>{
    res.send(aboutPage());
});

app.get('/events', (req,res)=>{
    res.send(eventPage());
});

app.get('/profile', ensureAuthenticated, (req, res) => {
    // console.log('This is the /new route');
    res.send(profilePage());
});

app.get('/favorites', ensureAuthenticated, (req, res) => {
    // console.log('This is the /new route');
    res.send('favorites');
});



app.get('/register', (req, res) => {
    //Send them the signup form
    // res.send(page(registrationForm()));
    res.send(registerForm());
});

app.post('/register', (req, res) => {
    //Process the signup form
    //1.grab the values out of req.body
    const newUsername = req.body.username;
    const newPassword = req.body.password;
    //2. call user.add
    // console.log(newUsername);
    // console.log(newPassword);
    User.add('', null, null, newUsername, newPassword, '', '')
        .then(newUser => {
            req.session.user = newUser;
            res.redirect('/profile');
        })

})


app.get('/login', (req, res) => {
    // res.send(page(login()));
    res.send(loginForm());
})

app.post('/login', (req, res) => {
    const loginUsername = req.body.username;
    const loginPassword = req.body.password;
    //2. Find a user whose name matches 'theUsername'
    User.getByUsername(loginUsername)
        .catch(err => {
            console.log(err);
            res.redirect('/login');
        })
        .then(theUser => {
            console.log(theUser);
            // const didMatch = bcrypt.compareSync(loginPassword, theUser.pwhash);
            if (theUser.passwordDoesMatch(loginPassword)) {
                req.session.user = theUser;
                console.log('it worked or it exists');
                res.redirect('/profile');
            } else {
                res.redirect('/login');
                console.log('boohoo');
            }
        })
});




app.get('/profile/:username([A-Z]+)', (req, res) => {
    // user's main page
    // get all of user's events
    // and build page
    User.getByUsername(req.params.username)
    .then(user => {
        Event.getByUser(user.id)
        .then(events => {
            events.sort((event_a, event_b) => event_a.date.getTime() < event_b.date.getTime() ? 1 : -1)
            const eventElements = []
            const dayElements = []
            const monthElements = []
            const yearElements = []
            let previousEvent
            while (events.length > 0) {
                const currentEvent = events.pop()
                // if it's for the same day or the first event
                if (eventElements.length == 0 || previousEvent.date.getDate() == currentEvent.date.getDate()) {
                    eventElements.push(eventElement(currentEvent.name))
                // if it is for a new day in same month
                } else if (previousEvent.date.getMonth() == currentEvent.date.getMonth()) {
                    dayElements.push(dayElement(previousEvent.date.getDate(), eventElements.join('')))
                    // reset eventElements array
                    eventElements.length = 0
                    eventElements.push(eventElement(currentEvent.name))
                    // if it is for a new month in same year
                } else if (previousEvent.date.getFullYear() == currentEvent.date.getFullYear()) {
                    dayElements.push(dayElement(previousEvent.date.getDate(), eventElements.join('')))
                    monthElements.push(monthElement(monthNameArray[previousEvent.date.getMonth()], dayElements.join('')))
                    // lock id dayElements and reset
                    dayElements.length = 0
                    eventElements.length = 0
                    eventElements.push(eventElement(currentEvent.name))
                    // if it is a new year
                } else {
                    dayElements.push(dayElement(previousEvent.date.getDate(), eventElements.join('')))
                    monthElements.push(monthElement(monthNameArray[previousEvent.date.getMonth()], dayElements.join('')))
                    yearElements.push(yearElement(previousEvent.date.getFullYear(), monthElements.join('')))
                    // reset month, day, and events
                    monthElements.length = 0
                    dayElements.length = 0
                    eventElements.length = 0
                    eventElements.push(eventElement(currentEvent.name))
                }
                previousEvent = currentEvent
            }
            dayElements.push(dayElement(previousEvent.date.getDate(), eventElements.join('')))
            monthElements.push(monthElement(monthNameArray[previousEvent.date.getMonth()], dayElements.join('')))
            yearElements.push(yearElement(previousEvent.date.getFullYear(), monthElements.join('')))
            res.send(pageElement(bodyElement(contentElement(yearElements.join('')))))
        })
    })
})

app.listen(3000, () => {
    console.log('You express app is ready!');
});