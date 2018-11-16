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

    static getAll() {
        return db.any('select * from users')
        .then(usersArray => usersArray.map(user => new User(user.id, user.name, user.lat, user.long, user.username, user.pwhash)))
    }

    addEvent(event) {
        debugger
        return db.result('insert into users_events (user_id, event_id) values ($1, $2)', [this.id, event.id])
        .then()
    }
}

module.exports = User