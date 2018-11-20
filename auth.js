require('dotenv').config();
const express = require('express');
const app = express();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const User = require('./models/User');
const updateEvents = require('./updateEvents');

// app.use(cookieSession({
//     maxAge:24*60*60*1000,
//     keys: [process.env.cookieKey]
// }));

//set up session middleware
app.use(session({
    secret: 'random1234',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 30*24*60*60*1000
    }
}));

passport.serializeUser((user,done)=> {
    console.log(user);
    // console.log('this is serializeUser');
    done(null, user); 
})

passport.deserializeUser((id, done)=>{
    User.getById(id).then((user)=> {
        done(null, user);
    })
})  
//set up passport strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://ec2-18-222-251-247.us-east-2.compute.amazonaws.com/auth/google"
  },
  function(accessToken, refreshToken, profile, done) {
    User.getUsersGI(profile.id).then((currentUser) => {
        if(currentUser){
            //already have the user
            done(null, currentUser);
            console.log('Currently logged in?');
        }else {
            //if not, create user in our db
            User.oAdd(
                profile.displayName,
                33,
                -84,
                null,
                null,
                profile.id,
                profile._json.image.url
            ).then((newUser) => {
                updateEvents();
                // console.log(newUser);
                // console.log('this is the newUser');
                done(null, 
                newUser.id
                );
            });
        }
    })
    }
    ));
    

//initialize passport
app.use(passport.initialize());
app.use(passport.session());



app.get('/google/login', passport.authenticate('google', {
    scope:
    ['https://www.googleapis.com/auth/userinfo.profile', ],
    accessType: 'offline',
    prompt: 'consent',
    successRedirect: '/user',
    failureRedirect: '/login'
    }));

    

app.get('/logout', (req,res)=> {
    req.logout();
    req.session.destroy();
    res.redirect('/login');
})


// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/profile');
  });
 


module.exports = app;