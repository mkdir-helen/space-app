const axios = require('axios')
const Body = require('./models/Body')
const Event = require('./models/Event')
const User = require('./models/User')

function fetchDoomsday() {
    return axios.get('https://ssd-api.jpl.nasa.gov/cad.api?body=ALL')
    .then(parseResponse)
    .then(parseResponse)
    .then(formatDoomsdata)
    .then(updateDoomsday)
}

function parseResponse(response) {
    return response.data
}

function formatDoomsdata(response) {
    return response.map(object => {
        return {
            name: object[0],
            date: object[3],
            dist_min: object[5],
            body: object[10]
        }
    }).filter(object => object.body == 'Earth') //|| object.body == 'Moon')
}

function updateDoomsday(data) {
    return Promise.all(data.map(object => {
        return Body.getByName(object.name)
        .catch(err => {
            // if object does not exist yet, add it to db
            return Body.add(object.name, 3)
        })
        .then(body => {
            // if it does exist remove all of it's events
            return Event.getByBody(body.id)
            .then(events => Promise.all(events.map(event => event.delete())))
            .then(() => {
                return body
            })
        })
        .then(body => {
            // convert AU to miles
            const approachMiles = object.dist_min * 929600000
            // add new event on date in object for all users
            return body.getBodyType()
            .then(body_type => {
                return User.getAll()
                .then(users => {
                    return Promise.all(users.map(user => Event.add(`${body_type.name} ${object.name} approaches to ${approachMiles} miles`, object.date, body.id, user.id)))
                })
            })
        })
    }))
}

module.exports = fetchDoomsday