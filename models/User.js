const db = require('./db');

class User {
    constructor(id, name, google_ID, thumbnail, location, username, pwhash) {
        // define properties that
        // are also the names
        // of the database columns
        this.id = id;
        this.name = name;
        this.location = location;
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

        // RETRIEVE
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

}

module.exports = User