const db = require('./db');

class Body {
    constructor(id, name) {
        this.id = id
        this.name = name
    }

    static getAll() {
        return db.any('select * from bodies')
        .then(bodies => bodies.map(body => new Body(body.id, body.name)))
    }

    addLocationPoint(body_id, ra, dec) {
        return db.one('insert into body_locations (ra, dec, date, body_id) values ($1, $2, $3, $4) returning ra, dec, date', [ra, dec, new Date(), body_id])
        .then(result => {
            return { body: this, ra: result.ra, dec: result.dec, date: result.date }
        })
    }
}

module.exports = Body