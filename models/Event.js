const db = require('./db');

class Event {
    constructor(name, date) {
        this.name = name
        this.date = date
    }

    // create
    static add(name, date) {
        db.result('insert into events (name, date) values ($1, $2)', [name, date])
        .then(event => new Event(event.name, event.date))
    }
    // retrieve

    // update

    // delete

}

module.exports = Event