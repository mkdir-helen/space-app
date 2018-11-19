const db = require('./db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class User {

    constructor(id, name, google_ID, thumbnail, lat, lon, username, pwhash) {
        // define properties that
        // are also the names
        // of the database columns
        this.id = id;
        this.name = name;
        this.lat = lat;
        this.lon = lon;
        this.google_ID = google_ID;
        this.username = username;
        this.thumbnail = thumbnail;
        this.pwhash = pwhash;
    }

    // CREATE
    

    static oAdd(name, google_ID, thumbnail) {
        return db.one(`
            insert into users 
                (name, google_ID, thumbnail)
            values
                ($1, $2, $3)
            returning id    
            `, [name, google_ID, thumbnail])
            .then(data => {
                const u = new User(data.id, name, google_ID, thumbnail);
                return u;
            });
    }
 
 static add(username, password) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return db.one(`
        insert into users 
            (username, pwhash)
        values
            ($1, $2)
        returning id`, [username, hash])
        .then(data => {
            const u = new User(data.id, username);
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
            const u = new User(userObj.id, userObj.name, null, null, userObj.lat, userObj.lon, userObj.username, userObj.pwhash);
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
        return new User(result.id, result.name, null, null, result.lat, result.lon,  result.username,result.pwhash);
    })
}

static searchByName(name) {
    return db.any(`
        select * from users
            where name ilike '%$1:raw%'
    `, [name])
}

static searchByLocation(location) {
    return db.any(`
        select * from users
            where location ilike '%1:raw%'`
            ,[location])
}


        
static getUsersGI(gid) {
    return db.one(`
        select * from users where google_ID=$1
    `,[gid]).then(userObj => {
        // transform array of objects
        // into array of User instances
        console.log(userObj);
        console.log('userObj in getUsers');
            const u = new User(userObj.id, userObj.name, userObj.google_ID, userObj.thumbnail);
            return u;
    }).catch(
        () => {
            return false;
        }
    )
}

getFavBody() {
    return db.any(`
        select * from favorites
            where user_id = $1
    `, [this.id]);
}



passwordDoesMatch(thePassword){
    const didMatch = bcrypt.compareSync(thePassword, this.pwhash);
    return didMatch;
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


updateLocation(lat, lon) {
    this.lat = lat
    this.lon = lon
    return db.result(`
        update users 
            set lat=$2, lon=$3
        where id=$1`,
        [this.id, lat, lon])
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