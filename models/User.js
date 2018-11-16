const db = require('./db');

class User {
    constructor(id, name, lat, long, username, pwhash) {
        this.id = id
        this.name = name
        this.lat = lat
        this.long = long
        this.username = username
        this.pwhash = pwhash
    }


}

module.exports = User