const db = require('./db');

class Event {
    constructor(id, name, date) {
        this.id = id
        this.name = name
        this.date = date
    }

    // create
    static add(name, date) {
        return db.one('insert into events (name, date) values ($1, $2) returning id', [name, date])
        .then(result => new Event(result.id, name, date))
    }
    // retrieve
    static getById(id) {
        return db.one('select * from events where id=$1', [id])
        .then(event => new Event(event.id, event.name, event.date))
    }

    static getByName(name) {
        return db.any('select * from events where name=$1', [name])
        .then(eventArray => eventArray.map(event => new Event(event.id, event.name, event.date)))
    }

    static getByDate(date) {
        return db.any('select * from events where date=$1', [date])
        .then(eventArray => eventArray.map(event => new Event(event.id, event.name, event.date)))
    }
    // update

    // delete
    delete() {
        return db.result('delete from events where id=$1', [this.id])
    }
}

module.exports = Event