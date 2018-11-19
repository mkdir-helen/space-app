const axios = require('axios')
const db = require('./models/db')
const Event = require('./models/Event') // required to make/update events
const Body = require('./models/Body') // required to reference body names
const User = require('./models/User') // required to check visibility
const api_key = require('./secret')

function fetchSpace() {
    // get space bodies out of database and fetch all of their names
    return Body.getAll()
    // for each body, fetch that data
    .then(bodies => Promise.all(bodies.map(fetchSpaceBody)))
}

function fetchSpaceBody(body) {
    if (body.name != 'Weather') {
        return axios.get(`http://www.strudel.org.uk/lookUP/json/?name=${body.name}`)
        .then(parseResponse)
        .then(parseObjectData)
        // body.addLocationPoint returns an object with ra and dec
        .then(parsedObjectData => body.addLocationPoint(parsedObjectData.ra.decimal, parsedObjectData.dec.decimal))
        .then(checkVisibility)
    }
}

function parseResponse(response) {
    return response.data
}

function parseObjectData(objectData) {
    return {
        ra: objectData.ra,
        dec: objectData.dec
    }
}

function checkVisibility(objectPosition) {
    // find events added previously
    // event must be on this date
    // if it is not asteroid
    if (objectPosition.body.body_type != 3) {
        return Event.getByDate(objectPosition.date)
        .then(events => {
            // event must be for this body
            return Promise.all(events.map(event => {
                if (event.body_id == objectPosition.body.id) {
                    // delete events
                    return event.delete()
                    // where we had checked the visibility before
                } else {
                    return null
                }
            }).filter(event => event != null))
        })
        .then(() => {
            const body = objectPosition.body
            const objectRa = objectPosition.ra
            const objectDec = objectPosition.dec
            const currentTime = new Date() 
            return User.getAll()
            .then(users => {
                Body.getByName('Sun')
                .then(sun => {
                    return sun.getPosition()
                    .catch(getSunPos)
                    .then(sunPosition => {
                        if (sunPosition.ra - 90 > objectPosition.ra || sunPosition.ra + 90 < objectPosition.ra) {
                            // get all users
                            // get their positions
                            return Promise.all(users.map(user => {
                                if (user.lat > 0) {
                                    if (objectDec > 90 - user.lat) {
                                        // object is always visible at night
                                        return Event.add(`${body.name} is visible`, currentTime, body.id, user.id)
                                            .then(user.addEvent)
                                    } else if (objectDec > -90 + user.lat) {
                                        // object is sometimes visible at night
                                        return Event.add(`${body.name} is sometimes visible`, currentTime, body.id, user.id)
                                            .then(user.addEvent)
                                    }
                                } else {
                                    if (objectDec < -90 - user.lat) {
                                        // object is always visible at night
                                        return Event.add(`${body.name} is visible`, currentTime, body.id, user.id)
                                            .then(user.addEvent)
                                    } else if (objectDec < 90 + user.lat) {
                                        // object is sometimes visible at night
                                        return Event.add(`${body.name} is sometimes visible`, currentTime, body.id, user.id)
                                            .then(user.addEvent)
                                    }
                                }
                            }))
                        }
                    })
                })         
            })
        })
    } else {
        return null
    }
}

function getSunPos() {
    return axios.get(`http://www.strudel.org.uk/lookUP/json/?name=Sun`)
        .then(parseResponse)
        .then(parseObjectData)
        // body.addLocationPoint returns an object with ra and dec
        .then(parsedObjectData => {
            return Body.getByName('Sun')
            .then(sun => sun.addLocationPoint(parsedObjectData.ra.decimal, parsedObjectData.dec.decimal))
        })
}

module.exports = fetchSpace