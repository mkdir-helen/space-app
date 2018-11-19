const axios = require('axios')
const db = require('./models/db')
const Event = require('./models/Event') // required to make/update events
const Body = require('./models/Body') // required to reference body names
const User = require('./models/User') // required to check visibility
const api_key = require('./secret')

function fetchSpace() {
    // get space bodies out of database and fetch all of their names
    Body.getAll()
    // for each body, fetch that data
    .then(bodies => bodies.forEach(fetchSpaceBody))
}

function fetchSpaceBody(body) {
    if (body.name != 'Weather') {
        axios.get(`http://www.strudel.org.uk/lookUP/json/?name=${body.name}`)
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
    const body = objectPosition.body
    const objectRa = objectPosition.ra
    const objectDec = objectPosition.dec
    const currentTime = new Date()
    Body.getByName('Sun')
    .then(sun => {
        sun[0].getPosition()
        .then(sunPosition => {
            console.log(sunPosition.ra, objectPosition.ra)
            debugger
            if (sunPosition.ra - 90 > objectPosition.ra || sunPosition.ra + 90 < objectPosition.ra) {
                // get all users
                User.getAll()
                .then(users => {
                    users.forEach(user => {
                        // get their positions
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
                    })
                })
            }   
        })
    })
}

module.exports = fetchSpace