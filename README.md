#Space App
### Idea Origin
We love space, and one of our favorite things to do is go outside at night and look at the stars and wonder what is out there. So we designed an app to tell us what is out there and when we can see it.
Using just a user's location as coordinates, we request information from the Dark Sky API for weather and moon phases and information from the lookUP API for a space object's location.

### Demo


### Backend
* User objects
* Space objects
* Events

### API Requests

### Libraries
##### Axios
* makes network requests from the backend
* 

##### Node-schedule
* uses cron-like interface to schedule tasks

##### Passport
* used OAuth 2.0 to authorize users to login with Google+
* also created a normal login/register option
* challenges: 
..1. Using OAuth with PostgreSQL (and not MongoDB). The arguments and parameters were needed to be the same length as in the schema and in the models. Empty arguments we entered null or ''.
..2. Having both normal login and google login to work. Fixed by taking from both user ids and authenticating them.  


##### Express, pg-promise, connect-pg-simple, bodyparser, bcrypt, dotenv

### Styling
created the html and css in front-end folder
used the NASA APOD archive for the webpage backgrounds
using flex box
overflow hidden and height = 100%
position sticky
* view templates

### Future Plans
* Come up with better name
* Chat with users 
* Share pictures
* Notify users of events


[Collin Argo](https://github.com/scollina)
[Will Harris](https://github.com/harriswill22)
[Helen Hasegawa](https://github.com/mkdir-helen)