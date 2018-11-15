const db = require('./db');

class Event {
    constructor(name, date) {
        this.name = name
        this.date = date
    }

    // create
    static add(name, date) {
        return db.result('insert into events (name, date) values ($1, $2)', [name, date])
        .then(() => new Event(name, date))
    }
    // retrieve

    // update

    // delete

}

module.exports = Event