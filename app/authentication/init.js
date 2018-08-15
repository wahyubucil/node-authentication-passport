const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy

const authenticationMiddleware = require('./middleware')

// Generate password
const saltRounds = 10
const myPlainTextPassword = 'my-password'
const salt = bcrypt.genSaltSync(saltRounds)
const passwordHash = bcrypt.hashSync(myPlainTextPassword, salt)

const user = {
    username: 'test-user',
    passwordHash,
    id: 1
}

function findUser(username, callback) {
    if (username === user.username) {
        return callback(null, user)
    }
    return callback(null)
}

passport.serializeUser((user, done) => {
    done(null, user.username)
})

passport.deserializeUser((username, done) => {
    findUser(username, done)
})

function initPassport() {
    passport.use(new LocalStrategy(
        (username, password, done) => {
            findUser(username, (err, user) => {
                if (err) {
                    return done(err)
                }

                // User not found
                if (!user) {
                    return done(null, false)
                }

                // Always use hashed passwords and fixed time comparison
                bcrypt.compare(password, user.passwordHash, (err, isValid) => {
                    if (err) {
                        return done(err)
                    }

                    if (!isValid) {
                        return done(null, false)
                    }

                    return done(null, user)
                })
            })
        }
    ))

    passport.authenticationMiddleware = authenticationMiddleware
}

module.exports = initPassport