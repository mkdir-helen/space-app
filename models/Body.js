const db = require('./db');

class Body {
    constructor(id, name) {
        this.id = id
        this.name = name
        this.visible = this.visible
    }

    static getAll() {
        return db.any('select * from bodies')
        .then(bodies => bodies.map(body => new Body(body.id, body.name, body.visible)))
    }

    addLocationPoint(body_id, ra, dec) {
        return db.one('insert into body_locations (ra, dec, date, body_id) values ($1, $2, $3, $4) returning ra, dec, date', [ra, dec, new Date(), body_id])
        .then(result => {
            return { body: this, ra: result.ra, dec: result.dec, date: result.date }
        })
    }

    setVisible(visible) {
        return db.result('update bodies set visible=$1 where id=$2', [visible, this.id])
        .then(console.log)
    }
}

module.exports = Body