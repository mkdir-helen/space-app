const db = require('./db');

class User {
    constructor(name, location, username, pwhash) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.username = username;        
        this.pwhash = pwhash;
    }
 // CREATE
 static add(name, location, username, password) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return db.one(`
        insert into users 
            (name, location, username, pwhash)
        values
            ($1, $2, $3, $4)
        returning id`, [name, location, username, hash])
        .then(data => {
            const u = new User(data.id, name, location, username);
            return u;
        });

}
// RETRIEVE
static getAll() {
    return db.any(`
        select * from users order by id
    `).then(userArray => {
        // transform array of objects
        // into array of User instances
        const instanceArray = userArray.map(userObj => {
            const u = new User(userObj.id, userObj.name);
            return u;
        });
        return instanceArray;
    })
}
static getById(id) {
    return db.one('select * from users where id = $1', [id])
        .then(result => {
            const u = new User(result.id, result.name);
            return u;
        })
        // .catch(err => {
        //     return err;
        // })
}

static getByUsername(username) {
    return db.one(`
        select * from users
        where username ilike '%$1:raw%'          
    `, [username]).then(result => {
        return new User(result.id, result.location, result.name, result.username,result.pwhash);
    })
}

static searchByName(name) {
    return db.any(`
        select * from users
            where name ilike '%$1:raw%'
    `, [name])
}

static serachByLocation(location) {
    return db.any(`
        select * from users
            where location ilike '%1:raw%'`
            ,[location])
}



 // UPDATE
 updateName(name) {
    this.name = name;
    return db.result(`
        update users
            set name=$2
        where id=$1
    `, [this.id, name])
    .then(result => {
        return result.rowCount === 1;

    })
}   

updateLocation(location) {
    this.location = location;
    return db.result(`
        update users 
            set location=$2
        where id=$1`,
        [this.id, location])
        .then(result => {
            return result.rowCount === 1;
        })
}
// DELETE
delete(){
    return db.result(`
    delete from users
    where id = $1
    `, [this.id]);        
}

static deleteById(id) {
    return db.result(`
    delete from users
    where id = $1
    `, [id]);
    }

}


module.exports = User;