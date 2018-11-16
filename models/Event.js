const db = require('./db');

class Event {
    constructor(name, date) {
        this.name = name
        this.date = date
    }

    // Create
    static add(name, date) {
        return db.one(`insert into events (name, date) values ($1, $2) returning id`,[name, date])
        .then(event => new event(event.name, event.date))
    } 
    // Retrieve
    function getAll() {
        return db.any('select * from events');
    }
    // Update

    // Delete

}

module.exports = Event