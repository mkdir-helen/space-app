require('dotenv').config();
const express = require('express');
const app = express();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');


app.use(session({
    secret: 'random1234',
    resave: true,
    saveUninitialized: true,
}));


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google"
  },
  function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    console.log(profile);
  }
));

// app.use(cookieSession({
//     maxAge:24*60*60*1000,
//     keys: [process.env.cookieKey]
// }));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req,res) =>{

})

app.get('/logout', (req,res)=> {

})

app.get('/login', passport.authenticate('google', { scope: ['profile'] }));

// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

// passport.serializeUser((user,done)=> {
//     // done(null, user.id); 
// })

// passport.deserializeUser((id, done)=>{
//     User.findById(id).then((user)=> {
//         // done(null, user);
//     })
// })  

module.exports = app;