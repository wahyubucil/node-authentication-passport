const path = require('path')

const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const app = express()

app.use(bodyParser.urlencoded({
    extended: false
}))

module.exports = app