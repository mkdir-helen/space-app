require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const db = require('./models/db');



//Connect to stylesheets
// app.use(express.static('public'));

//Configure body-parser to read data sent by HTML form tags
app.use(bodyParser.urlencoded({ extended: false }));

// Configure body-parser to read JSON bodies
app.use(bodyParser.json());


app.listen(3000, () => {
    console.log('You express app is ready!');
});