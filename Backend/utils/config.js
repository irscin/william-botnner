require('dotenv').config()

let PORT=process.env.PORT
let MONGOURL=process.env.MONGOURL
let PIN=process.env.PIN
let FACEBOOK_KEY=process.env.FACEBOOK_KEY

module.exports = {
    PORT,
    MONGOURL,
    PIN,
    FACEBOOK_KEY
}