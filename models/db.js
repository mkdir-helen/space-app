const initOptions = {
    // global event notification;
    error(error, e) {
        if (e.cn) {
            // A connection-related error;
            //
            // Connections are reported back with the password hashed,
            // for safe errors logging, without exposing passwords.
            console.log('CN:', e.cn);
            console.log('EVENT:', error.message || error);
        }
    }
};
// ============================================
// Database Connection
const pgp = require('pg-promise')({
    query: e => {
        console.log('QUERY: ', e.query);
        if (e.params) {
            console.log('PARAMS:', e.params);
        }
    }
});
// Testing Connection
const pgpTwo = require('pg-promise')(initOptions);



const db = pgp({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
});
// ============================================
console.log("Are my enviorments loading?")
console.log(process.env.DB_HOST)
console.log(process.env.DB_PORT)
console.log(process.env.DB_NAME)
// using an invalid connection string:
const dbOne = pgpTwo('postgresql://ubuntu@' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME);

dbOne.connect()
    .then(obj => {
        obj.done(); // success, release the connection;
    })
    .catch(error => {
        console.log('ERROR:', error.message || error);
    });

module.exports = db;