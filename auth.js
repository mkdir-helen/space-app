require('dotenv').config();
const express = require('express');
const app = express();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const User = require('./models/User');

// app.use(cookieSession({
//     maxAge:24*60*60*1000,
//     keys: [process.env.cookieKey]
// }));

//set up session middleware
app.use(session({
    secret: 'random1234',
    resave: true,
    saveUninitialized: true,
}));

passport.serializeUser((user,done)=> {
    console.log(user.google_id);
    console.log('this is serializeUser');
    done(null, user.id); 
})

passport.deserializeUser((id, done)=>{
    User.getUsers(id).then((user)=> {
        done(null, user);
    })
})  
//set up passport strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google"
  },
  function(accessToken, refreshToken, profile, done) {
    User.getUsers(profile.id).then((currentUser) => {
        if(currentUser){
            //already have the user
            done(null, currentUser);
            console.log('Currently logged in?');
        }else {
            //if not, create user in our db
            User.oAdd(
                profile.displayName,
                profile.id,
                profile._json.image.url
            ).then((newUser) => {
                console.log(newUser);
                console.log('this is the newUser');
                done(null, newUser);
            });
        }
    })
    }
    ));
    

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req,res) =>{
    res.send('home');
})

app.get('/login', passport.authenticate('google', {
    scope:
    ['https://www.googleapis.com/auth/userinfo.profile', ],
    accessType: 'offline',
    prompt: 'consent',
    successRedirect: '/profile',
    failureRedirect: '/login'
    }));

    

app.get('/logout', (req,res)=> {
    req.logout();
    res.redirect('/');
})


// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/profile');
  });

app.get('/profile', (req, res)=>{
    res.send('profile');
});  


module.exports = app;