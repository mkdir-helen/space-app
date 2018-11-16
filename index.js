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

app.get('/', (req, res) => {
    res.send('Home');
    // const thePage = page('hey there');
    // res.send(thePage);
})

app.get('/about', (req,res)=>{
    res.send('about');
})


app.get('/profile', ensureAuthenticated, (req, res) => {
    // console.log('This is the /new route');
    res.send('profile');
});

app.get('/favorites', ensureAuthenticated, (req, res) => {
    // console.log('This is the /new route');
    res.send('favorites');
});



app.get('/register', (req, res) => {
    //Send them the signup form
    // res.send(page(registrationForm()));
    res.send('register form');
})

app.post('/register', (req, res) => {
    //Process the signup form
    //1.grab the values out of req.body
    const newUsername = req.body.username;
    const newPassword = req.body.password;
    //2. call user.add
    User.add(newUsername, newPassword)
        .then(newUser => {
            req.session.user = newUser;
            res.redirect('/profile');
        })

})


app.get('/login', (req, res) => {
    // res.send(page(login()));
    res.send('login');
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
            // const didMatch = bcrypt.compareSync(loginPassword, theUser.pwhash);
            if(theUser.passwordDoesMatch(loginPassword)){
                req.session.user = theUser;
                res.redirect('/profile');
            }else{
                res.redirect('/login');
            }
        })
});



//Connect to stylesheets
app.use(express.static('public'));

//Configure body-parser to read data sent by HTML form tags
app.use(bodyParser.urlencoded({ extended: false }));

// Configure body-parser to read JSON bodies
app.use(bodyParser.json());


app.listen(3000, () => {
    console.log('You express app is ready!');
});