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
    debugger
    const currentTime = new Date()
    // get all users
    User.getAll()
    .then(users => {
        users.forEach(user => {
            // get their positions
            // // compare it to the position of this object
            // axios.get(`https://maps.googleapis.com/maps/api/timezone/json?location=${user.lat},${user.lon}&timestamp=${currentTime.getDate()}&key=AIzaSyCKK9cCfam4qhtNI2RwHTcf5220rV7HlIY`)
            // .then(parseResponse)
            // .then(response => {
            //     // const timeZoneOffset = response.rawOffset / 60 / 60
            //     const timeZoneOffset = 5
            //     debugger
            //     currentTime.setHours(currentTime.getHours() + timeZoneOffset)
                // get object position at 10 PM
                currentTime.setHours(22)
                // offset 15 degrees per hour past midnight
                const currentTimeOffset = currentTime.getHours() * 15
                console.log('currentimeoffest')
                console.log(currentTime)

                // -90 + lat to 90 + lat
                // if I am at +33 lat
                // I can see anything above (90 - 33) dec at anytime
                // and anything above (-90 + 33) dec 
                // if I am at -84 lon
                // when it's r.a. is 0 + 15 * hr (currentTimeOffset)
                // I can see anything +- 90 degrees from my on
                // offset the objects RA for the current time
                let apparentRa = objectRa + currentTimeOffset
                // wrap it back around to 360 degrees
                apparentRa = apparentRa > 360 ? apparentRa - 360 : apparentRa
                // convert the user's lon to ra values
                // const userRa = user.lon > 0 ? user.lon : 360 + user.lon
                if (user.lat > 0) {
                    if (objectDec > 90 - user.lat) {
                        // object is always visible
                        return Event.add(`${body.name} is visible`, currentTime, body.id, user.id)
                               .then(user.addEvent)
                    } else if (objectDec > -90 + user.lat) {
                        // object is sometimes visible
                        return Event.add(`${body.name} is sometimes visible`, currentTime, body.id, user.id)
                               .then(user.addEvent)
                    }
                } else {
                    if (objectDec < -90 - user.lat) {
                        // object is always visible
                        return Event.add(`${body.name} is visible`, currentTime, body.id, user.id)
                               .then(user.addEvent)
                    } else if (objectDec < 90 + user.lat) {
                        // object is sometimes visible
                        return Event.add(`${body.name} is sometimes visible`, currentTime, body.id, user.id)
                               .then(user.addEvent)
                    }
                }
                // if it's not visible
                // if the user is at 33 degrees north
                // he can see dec 90 + 33 degrees
                // if the user is at 
                // if it was visible, add setting space event
                // if it's visible (else)
                // if (objectDec < maxUserDec && objectDec > minUserDec && objectRa < maxUserRa && objectRa > minUserRa) {
                //     // add a space event, if it does not already exist
                //     debugger
                // }
            // })
        })
    })
}

module.exports = fetchSpace