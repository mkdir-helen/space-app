const db = require('./db');

class Body {
    constructor(id, name, type = null) {
        this.id = id;
        this.name = name;
        this.type = type;
    }

    // Create
    static add(name){
        return db.one(`insert into bodies(name)
        values($1) returning id`, [name])
        .then(result => new body(result.id, name, type))
    }

// retrieve
static getById(id) {
    return db.one('select * from bodies where id=$1', [id])
    .then(body => new body(body.id, body.name,))
}

static getByName(name) {
    return db.any('select * from events where name=$1', [name])
    .then(bodyArray => bodyArray.map(body => new body(body.id, body.name,)))
}

// update

// delete
delete() {
    return db.result('delete from bodies where id=$1', [this.id])
}
}

 

module.exports = Body