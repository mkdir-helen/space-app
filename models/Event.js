const db = require('./db');

class Event {
    constructor(id, name, date, body_id, user_id) {
        this.id = id
        this.name = name
        this.date = date
        this.body_id = body_id
        this.user_id = user_id
    }

    // Create
    static add(name, date, body_id, user_id) {
        return db.one('insert into events (name, date, body_id, user_id) values ($1, $2, $3, $4) returning id', [name, date, body_id, user_id])
        .then(result => new Event(result.id, name, date, body_id, user_id))
    }
    // retrieve
    static getById(id) {
        return db.one('select * from events where id=$1', [id])
        .then(event => new Event(event.id, event.name, event.date, event.body_id, event.user_id))
    }

    static getByName(name) {
        return db.any('select * from events where name=$1', [name])
        .then(eventArray => eventArray.map(event => new Event(event.id, event.name, event.date, event.body_id, event.user_id)))
    }

    static getByDate(date) {
        return db.any('select * from events where date=$1', [date])
        .then(eventArray => eventArray.map(event => new Event(event.id, event.name, event.date, event.body_id, event.user_id)))
    }

    static getByUser(user_id) {
        return db.any('select * from events where user_id=$1', [user_id])
        .then(eventArray => eventArray.map(event => new Event(event.id, event.name, event.date, event.body_id, event.user_id)))
    }
    // update

    // delete
    delete() {
        return db.result('delete from events where id=$1', [this.id])
    }
}

module.exports = Event