
// require('dotenv').config();
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

const updateEvents = require('./updateEvents');

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



// updateEvents(); 


//making sure users are logged in to do anything
const ensureAuthenticated = (req, res, next) => {
    console.log(req.session);
    if (req.session.passport || req.isAuthenticated()) {
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
    // res.send(mainPage())
    res.redirect('/login')
    // const thePage = page('hey there');
    // res.send(thePage);
});

app.get('/about', (req, res) => {
    res.send(aboutPage());
});

app.get('/profile', ensureAuthenticated, (req, res) => {
    console.log(req.session)
    let isRegular = typeof req.session.passport.user !== 'string';
    let get = isRegular ? User.getById : User.getUsersGI;

    get(req.session.passport.user)
        .then(theUser => {
            theUser.getFriends()
                .then(friends => {
                    theUser.getFavBody()
                        .then(bodies => {
                            res.send(profilePage.profile(
                                profilePage.myFavsDiv(bodies), profilePage.myFriendsDiv(friends), profilePage.myLocation
                                    ([theUser.lat, theUser.long])))
                        })
                })
        })

    // profilePage.myFavsDiv
});



app.post('/favorite', ensureAuthenticated, (req, res) => {
    const bodyname = req.body.bodyname
    User.getById(req.session.passport.user)
        .then(theUser => {
            Body.getByName(bodyname)
                .then(spaceBody => {
                    theUser.addFavBody(spaceBody)
                        .then(() => {
                            res.redirect('/profile')
                        })
                })
        })
})


app.post('/friend', ensureAuthenticated, (req, res) => {
    const username = req.body.username
    User.getById(req.session.passport.user)
        .then(theUser => {
            User.getByUsername(username)
                .then(friend => {
                    theUser.addFriend(friend)
                        .then(() => {
                            res.redirect('/profile')
                        })
                })
        })
})




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
    // give users atlanta's coordinates by default
    User.add(newUsername, 33, -84, newUsername, newPassword, '', '')
        .then(newUser => {
            updateEvents()
                .then(() => {
                    req.session.passport = {
                        user: newUser.id
                    };
                    req.session.save(() => {
                        console.log(req.session);
                        console.log('this is req session ');
                        res.redirect(`/profile`);
                    })
                })
        }).catch(err => {
            console.log("There is a huge error: " + err);

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
            console.log('this is supposedly theUser');
            // const didMatch = bcrypt.compareSync(loginPassword, theUser.pwhash);
            if (theUser.passwordDoesMatch(loginPassword)) {
                req.session.passport = {
                    user: theUser.id
                };
                console.log('it worked or it exists');
                req.session.save(() => {
                    res.redirect(`/profile`);
                })
            } else {
                res.redirect('/login');
                console.log('boohoo');
            }
        })
});




app.get('/events', ensureAuthenticated, (req, res) => {
    // user's main page
    // get all of user's events
    // and build page
    User.getById(req.session.passport.user)
        .then(user => {
            Event.getByUser(user.id)
                .then(events => {
                    events.sort((event_a, event_b) => event_a.date.getTime() < event_b.date.getTime() ? 1 : -1)
                    const eventElements = []
                    const dayElements = []
                    const monthElements = []
                    const yearElements = []
                    let previousEvent = new Event(99999999, 'random', new Date('1000-12-12'), 1, null)
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
