const db = require('./db');

class Body {
    constructor(id, name, body_type) {
        this.id = id
        this.name = name
        this.body_type = body_type
    }

    
    
    
    
    addLocationPoint(ra, dec) {
        return db.one('insert into body_locations (ra, dec, date, body_id) values ($1, $2, $3, $4) returning ra, dec, date', [ra, dec, new Date(), this.id])
        .then(result => {
            return { body: this, ra: result.ra, dec: result.dec, date: result.date }
        })
    }

    getPosition() {
        // returns last known position
        return db.one(`select * from body_locations join bodies on body_id=bodies.id where bodies.id=$1 order by bodies.id desc limit 1`,[this.id])
        .then(result => {
            return { ra: result.ra, dec: result.dec }
        })
    }
    
    
    static getAll() {
        return db.any('select * from bodies')
        .then(bodies => bodies.map(body => new Body(body.id, body.name, body.body_type)))
    }



static getByName(name) {
    return db.any('select * from bodies where name=$1', [name])
    .then(bodyArray => bodyArray.map(body => new Body(body.id, body.name, body.body_type)))
}

// update

// delete
delete() {
    return db.result('delete from bodies where id=$1', [this.id])
}

}
 

module.exports = Body