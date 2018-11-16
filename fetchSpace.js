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
        .then(parsedObjectData => body.addLocationPoint(body.id, parsedObjectData.ra.decimal, parsedObjectData.dec.decimal))
        // .then(checkVisibility)
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
    // get all users
    User.getAll()
    .then(users => {
        users.forEach(user => {
            // get their positions
            // compare it to the position of this object
            axios.get(`https://maps.googleapis.com/maps/api/timezone/json?location=${user.lat},${user.long}&timestamp=${currentTime.getDate()}&key=AIzaSyCKK9cCfam4qhtNI2RwHTcf5220rV7HlIY`)
            .then(parseResponse)
            .then(response => {
                const timeZoneOffset = response.rawOffset / 60 / 60
                currentTime.setHours(currentTime.getHours() + timeZoneOffset)
                const currentTimeOffset = currentTime.getHours() * 15
                console.log('currentimeoffest')
                console.log(currentTime)
                const maxUserDec = 90 + user.lat
                const minUserDec = -90 + user.lat
                const maxUserRa = 180 + user.long - currentTimeOffset
                const minUserRa = 180 - user.long - currentTimeOffset
                // if it's not visible
                // if the user is at 33 degrees north
                // he can see dec 90 + 33 degrees
                // if the user is at 
                // if it was visible, add setting space event
                // if it's visible (else)
                if (objectDec < maxUserDec && objectDec > minUserDec && objectRa < maxUserRa && objectRa > minUserRa) {
                    // add a space event, if it does not already exist
                    debugger
                    Event.add(`${body.name} is visible`, currentTime)
                    .then(user.addEvent)
                }
            })
        })
    })
}

module.exports = fetchSpace