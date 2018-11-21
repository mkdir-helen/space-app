#Space App
### Idea Origin
We love space, and one of our favorite things to do is go outside at night and look at the stars and wonder what is out there. So we designed an app to tell us what is out there and when we can see it.
Using just a user's location, we request space and weather data from various APIs to create and display events for the user.

### Demo
* Sign Up
* Login
* Add Friends
* Add Space Objects
* View Space Events


### Backend
* User objects
* Space objects
* Events

### API Requests
##### Dark Sky API
(http://www.api.darksky.net)
##### lookUP API
(http://www.strudel.org.uk/lookUP)
##### NASA CAD API
(https://ssd-api.jpl.nasa.gov/cad.api)

### Libraries
##### Axios
* makes network requests from the backend
* essentially works like fetch from frontend
* used to get space data and add events to database

##### Node-schedule
* uses cron-like interface to schedule tasks
* create job with callback function

##### Passport

##### Express, pg-promise, connect-pg-simple, bodyparser, bcrypt, dotenv

### Styling
* created the html and css in front-end folder
* view templates used to serve pages from backend
* NASA APOD archive used for webpage backgrounds
* flex box
* overflow hidden/scroll events
* position sticky for month headers

### Challenges
* calculating visibility of space objects
* 

### Future Plans
* Come up with better name
* Chat with users 
* Share pictures
* Notify users of events
* Add more space data


[Collin Argo](https://github.com/scollina)
[Will Harris](https://github.com/harriswill22)